import React, { Component } from 'react';
import { connect } from 'react-redux'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import Ordersummary from '../../components/Burger/Ordersummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from  '../../hoc/withErrorHandler/withErrorHandler'
import *  as  actions from '../../store/actions/index'



const INGREDIENT_PRICES = {
    salad:0.4,
    cheese:0.5,
    meat:1.3,
    bacon:2
}

class BurgerBuilder extends Component {

    state = {
        // totalPrice: 4,
        purchasable : false,
        purchasing:false,
        // loading:false,
        // error:false 
    }
    componentDidMount(){
        console.log('');
       this.props.onInitIngredients()
        // axios.get('/ingredients.json')
        // .then(res=>{
        //     this.setState({ingredients:res.data})
        // })
        // .catch(error=>this.setState({error:true}))
    }
    updatePurchaseState = (ingredients) =>{
        const sum = Object.keys(ingredients)
        .map(igKey=>{
            return ingredients[igKey];
        }).reduce((sum,el)=>{
            return sum + el
        },0)
        return sum>0
    }

    purchaseHangler = () => {
        this.setState({purchasing:true})
    }
    purchaseCancelHandler = ()=> {
        this.setState({purchasing:false})
    }
    purchaseContinueHandler = () => {
       // redux effect 
        // this.setState({loading:true})
       
        // const queryparams = [];
        // for (let i in this.props.ings){
        //     queryparams.push(encodeURIComponent(i) + '='+encodeURIComponent(this.props.ings[i]));
        // }
        // queryparams.push('price='+this.state.totalPrice)
        // const queryString = queryparams.join('&')
        // this.props.history.push({
        //     pathname:'/checkout',
        //     search:'?' + queryString
        // })
        this.props.history.push('/checkout')
    }
    // Moved to reducer

    // addIngredientHandler = (type) =>{
    //     const oldCount = this.props.ings[type]
    //     const updatedCount = oldCount + 1
    //     const updatedIngredients = {
    //         ...this.props.ings
    //     }
    //     updatedIngredients[type] = updatedCount
    //     const priceAddition = INGREDIENT_PRICES[type]
    //     const oldPrice = this.state.totalPrice
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice:newPrice,ingredients:updatedIngredients})
    //     this.updatePurchaseState(updatedIngredients)
    // }
    // removeIngredientHandler = (type) =>{
    //     const oldCount = this.props.ings[type]
    //     let updatedCount = oldCount -1
    //     if (updatedCount <0) {
    //         return;
    //     }
    //     const updatedIngredients = {
    //         ...this.props.ings
    //     }
    //     updatedIngredients[type] = updatedCount
    //     const priceSubtracted = INGREDIENT_PRICES[type]
    //     const oldPrice = this.state.totalPrice
    //     const newPrice = oldPrice - priceSubtracted
    //     this.setState({totalPrice:newPrice, ingredients:updatedIngredients})
    //     this.updatePurchaseState(updatedIngredients)
    // }
    render(){
        const disabledInfo = {
            ...this.props.ings,

        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }
        let orderSummary = null
        let burger = this.props.error? <p>ingredients cant be loaded...</p> :<Spinner/>
        if (this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls ingredientsAdded={this.props.onIngredientAdded}
                    ingredientsRemoved={this.props.onIngredientRemove}
                    disabled={disabledInfo}
                    price={this.props.price}
                    PRICES={INGREDIENT_PRICES}
                    purchasable= {this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHangler}/>
                </Aux>
            )
                orderSummary = <Ordersummary 
                                ingredients={this.props.ings}
                                purchaseCancelled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseContinueHandler}
                                price={this.props.price}/> 
        
        }
        // if (this.state.loading) {
        //     orderSummary = <Spinner/>
        // }
        return <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}</Modal>
            {burger}
        </Aux>
    }
}
const mapStatetoProps = state =>{
    return {
        ings:  state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapPropstoState = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredients(ingName)),
        onIngredientRemove: (ingName) => dispatch(actions.removeIngredients(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStatetoProps,mapPropstoState)(withErrorHandler(BurgerBuilder, axios));