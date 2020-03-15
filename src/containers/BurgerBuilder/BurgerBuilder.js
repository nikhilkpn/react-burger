import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import Ordersummary from '../../components/Burger/Ordersummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from  '../../hoc/withErrorHandler/withErrorHandler'



const INGREDIENT_PRICES = {
    salad:0.4,
    cheese:0.5,
    meat:1.3,
    bacon:2
}

class BurgerBuilder extends Component {

    state = {
        ingredients:null,
        totalPrice: 4,
        purchasable : false,
        purchasing:false,
        loading:false,
        error:false 
    }
    componentDidMount(){
        axios.get('/ingredients.json')
        .then(res=>{
            this.setState({ingredients:res.data})
        })
        .catch(error=>this.setState({error:true}))
    }
    updatePurchaseState = (ingredients) =>{
        const sum = Object.keys(ingredients)
        .map(igKey=>{
            return ingredients[igKey];
        }).reduce((sum,el)=>{
            return sum + el
        },0)
        this.setState({purchasable:sum>0})
    }

    purchaseHangler = () => {
        this.setState({purchasing:true})
    }
    purchaseCancelHandler = ()=> {
        this.setState({purchasing:false})
    }
    purchaseContinueHandler = () => {
        this.setState({loading:true})
       
        const queryparams = [];
        for (let i in this.state.ingredients){
            queryparams.push(encodeURIComponent(i) + '='+encodeURIComponent(this.state.ingredients[i]));
        }
        queryparams.push('price='+this.state.totalPrice)
        const queryString = queryparams.join('&')
        this.props.history.push({
            pathname:'/checkout',
            search:'?' + queryString
        })
    }
    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients})
        this.updatePurchaseState(updatedIngredients)
    }
    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type]
        let updatedCount = oldCount -1
        if (updatedCount <0) {
            return;
        }
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceSubtracted = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceSubtracted
        this.setState({totalPrice:newPrice, ingredients:updatedIngredients})
        this.updatePurchaseState(updatedIngredients)
    }
    render(){
        const disabledInfo = {
            ...this.state.ingredients,

        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }
        let orderSummary = null
        let burger = this.state.error? <p>ingredients cant be loaded...</p> :<Spinner/>
        if (this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls ingredientsAdded={this.addIngredientHandler}
                    ingredientsSubstracted={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    PRICES={INGREDIENT_PRICES}
                    purchasable= {this.state.purchasable}
                    ordered={this.purchaseHangler}/>
                </Aux>
            )
                orderSummary = <Ordersummary 
                                ingredients={this.state.ingredients}
                                purchaseCancelled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseContinueHandler}
                                price={this.state.totalPrice}/> 
        
        }
        if (this.state.loading) {
            orderSummary = <Spinner/>
        }
        return <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}</Modal>
            {burger}
        </Aux>
    }
}

export default withErrorHandler(BurgerBuilder, axios);