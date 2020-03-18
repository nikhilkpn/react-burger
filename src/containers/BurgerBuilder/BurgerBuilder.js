import React, { Component, useState, useEffect,useCallback } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux'
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
const BurgerBuilder = props=> {
    const [purchasable,setPurchasable] = useState(false)
    const [purchasing,setPurchasing] = useState(false)

    // Alternative of map state to props

    // const dispatch = useDispatch();
    // const ings = useSelector(state => state.burgerBuilder.ingredients)
    // const price = useSelector(state => state.burgerBuilder.totalPrice)
    // const error = useSelector(state => state.burgerBuilder.error)
    // const isAuthenticated = useSelector(state => state.auth.token !==null)
    
    // // Alternative of dispatch 
    // const onIngredientAdded = (ingName) => dispatch(actions.addIngredients(ingName))
    // const onIngredientRemove = (ingName) => dispatch(actions.removeIngredients(ingName))
    // // to avoid infinite requests
    // const onInitIngredients = () => useCallback((actions.initIngredients()), [dispatch])
    // const onInitPurchase = () => dispatch(actions.purchaseInit())
    // const onSetAuthRedirectPath = (path)=> dispatch(actions.setAuthRedirectPath(path))

    const {onInitIngredients} = props

    useEffect(() => {
        onInitIngredients()
    }, [onInitIngredients])
    const updatePurchaseState = (ingredients) =>{
        const sum = Object.keys(ingredients)
        .map(igKey=>{
            return ingredients[igKey];
        }).reduce((sum,el)=>{
            return sum + el
        },0)
        return sum>0
    }

    const purchaseHangler = () => {
        if (props.isAuthenticated){
            setPurchasing(true)
        } else {
            props.onSetAuthRedirectPath('/checkout')
            props.history.push('/auth')
        }
    }
    const purchaseCancelHandler = ()=> {
        setPurchasing(false)
    }
   const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout')
    }
        const disabledInfo = {
            ...props.ings,

        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }
        let orderSummary = null
        let burger = props.error? <p>ingredients cant be loaded...</p> :<Spinner/>
        if (props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={props.ings}/>
                    <BuildControls ingredientsAdded={props.onIngredientAdded}
                        ingredientsRemoved={props.onIngredientRemove}
                        disabled={disabledInfo}
                        price={props.price}
                        isAuth={props.isAuthenticated}
                        PRICES={INGREDIENT_PRICES}
                        purchasable= {updatePurchaseState(props.ings)}
                        ordered={purchaseHangler}/>
                </Aux>
            )
                orderSummary = <Ordersummary 
                                ingredients={props.ings}
                                purchaseCancelled={purchaseCancelHandler}
                                purchaseContinued={purchaseContinueHandler}
                                price={props.price}/> 
        
        }
        return <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}</Modal>
            {burger}
        </Aux>
}
const mapStatetoProps = state =>{
    return {
        ings:  state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !==null
    }
}

const mapPropstoState = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredients(ingName)),
        onIngredientRemove: (ingName) => dispatch(actions.removeIngredients(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path)=> dispatch(actions.setAuthRedirectPath(path))
    }
}
// connect can be removed by using "useSelector, useDispatch"
export default connect(mapStatetoProps,mapPropstoState)(withErrorHandler(BurgerBuilder, axios));

// class BurgerBuilder extends Component {

//     state = {
//         // totalPrice: 4,
//         purchasable : false,
//         purchasing:false,
//         // loading:false,
//         // error:false 
//     }
//     componentDidMount(){
//        this.props.onInitIngredients()
//         // axios.get('/ingredients.json')
//         // .then(res=>{
//         //     this.setState({ingredients:res.data})
//         // })
//         // .catch(error=>this.setState({error:true}))
//     }
//     updatePurchaseState = (ingredients) =>{
//         const sum = Object.keys(ingredients)
//         .map(igKey=>{
//             return ingredients[igKey];
//         }).reduce((sum,el)=>{
//             return sum + el
//         },0)
//         return sum>0
//     }

//     purchaseHangler = () => {
//         if (this.props.isAuthenticated){
//             this.setState({purchasing:true})
//         } else {
//             this.props.onSetAuthRedirectPath('/checkout')
//             this.props.history.push('/auth')
//         }
//     }
//     purchaseCancelHandler = ()=> {
//         this.setState({purchasing:false})
//     }
//     purchaseContinueHandler = () => {
//         this.props.onInitPurchase();
//        // redux effect 
//         // this.setState({loading:true})
       
//         // const queryparams = [];
//         // for (let i in this.props.ings){
//         //     queryparams.push(encodeURIComponent(i) + '='+encodeURIComponent(this.props.ings[i]));
//         // }
//         // queryparams.push('price='+this.state.totalPrice)
//         // const queryString = queryparams.join('&')
//         // this.props.history.push({
//         //     pathname:'/checkout',
//         //     search:'?' + queryString
//         // })
//         this.props.history.push('/checkout')
//     }
//     // Moved to reducer

//     // addIngredientHandler = (type) =>{
//     //     const oldCount = this.props.ings[type]
//     //     const updatedCount = oldCount + 1
//     //     const updatedIngredients = {
//     //         ...this.props.ings
//     //     }
//     //     updatedIngredients[type] = updatedCount
//     //     const priceAddition = INGREDIENT_PRICES[type]
//     //     const oldPrice = this.state.totalPrice
//     //     const newPrice = oldPrice + priceAddition;
//     //     this.setState({totalPrice:newPrice,ingredients:updatedIngredients})
//     //     this.updatePurchaseState(updatedIngredients)
//     // }
//     // removeIngredientHandler = (type) =>{
//     //     const oldCount = this.props.ings[type]
//     //     let updatedCount = oldCount -1
//     //     if (updatedCount <0) {
//     //         return;
//     //     }
//     //     const updatedIngredients = {
//     //         ...this.props.ings
//     //     }
//     //     updatedIngredients[type] = updatedCount
//     //     const priceSubtracted = INGREDIENT_PRICES[type]
//     //     const oldPrice = this.state.totalPrice
//     //     const newPrice = oldPrice - priceSubtracted
//     //     this.setState({totalPrice:newPrice, ingredients:updatedIngredients})
//     //     this.updatePurchaseState(updatedIngredients)
//     // }
//     render(){
//         const disabledInfo = {
//             ...this.props.ings,

//         }
//         for (let key in disabledInfo){
//             disabledInfo[key] = disabledInfo[key] <=0
//         }
//         let orderSummary = null
//         let burger = this.props.error? <p>ingredients cant be loaded...</p> :<Spinner/>
//         if (this.props.ings){
//             burger = (
//                 <Aux>
//                     <Burger ingredients={this.props.ings}/>
//                     <BuildControls ingredientsAdded={this.props.onIngredientAdded}
//                         ingredientsRemoved={this.props.onIngredientRemove}
//                         disabled={disabledInfo}
//                         price={this.props.price}
//                         isAuth={this.props.isAuthenticated}
//                         PRICES={INGREDIENT_PRICES}
//                         purchasable= {this.updatePurchaseState(this.props.ings)}
//                         ordered={this.purchaseHangler}/>
//                 </Aux>
//             )
//                 orderSummary = <Ordersummary 
//                                 ingredients={this.props.ings}
//                                 purchaseCancelled={this.purchaseCancelHandler}
//                                 purchaseContinued={this.purchaseContinueHandler}
//                                 price={this.props.price}/> 
        
//         }
//         // if (this.state.loading) {
//         //     orderSummary = <Spinner/>
//         // }
//         return <Aux>
//             <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
//                 {orderSummary}</Modal>
//             {burger}
//         </Aux>
//     }
// }
// const mapStatetoProps = state =>{
//     return {
//         ings:  state.burgerBuilder.ingredients,
//         price: state.burgerBuilder.totalPrice,
//         error: state.burgerBuilder.error,
//         isAuthenticated: state.auth.token !==null
//     }
// }

// const mapPropstoState = dispatch => {
//     return {
//         onIngredientAdded: (ingName) => dispatch(actions.addIngredients(ingName)),
//         onIngredientRemove: (ingName) => dispatch(actions.removeIngredients(ingName)),
//         onInitIngredients: () => dispatch(actions.initIngredients()),
//         onInitPurchase: () => dispatch(actions.purchaseInit()),
//         onSetAuthRedirectPath: (path)=> dispatch(actions.setAuthRedirectPath(path))
//     }
// }

// export default connect(mapStatetoProps,mapPropstoState)(withErrorHandler(BurgerBuilder, axios));