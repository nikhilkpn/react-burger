import React, { Component } from 'react'
import { connect } from 'react-redux'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../Checkout/ContactData/ContactData'
import { Route, Redirect } from 'react-router-dom'
import * as actions from '../../store/actions/index'

const Checkout = props => {
    const checkoutCancelledHandler=()=> {
        props.history.goBack()
    }
    const checkoutContinuedHandler = ()=>{
        props.history.replace('/checkout/contact-data')
    }
        let summary = <Redirect to='/'/>
        if (props.ings){
            const purchasedRedirect = props.purchased ? <Redirect to='/'/>:null;
            summary = <div>
                {purchasedRedirect}
                <CheckoutSummary 
                            ingredients={props.ings}
                            checkoutCancelled={checkoutCancelledHandler}
                            checkoutContinued={checkoutContinuedHandler}/>
                <Route path={props.match.path + '/contact-data'} 
                component={ContactData}/>
            </div>
}
    return summary
}

const mapStatetoProps = state => {
    return {
        ings:  state.burgerBuilder.ingredients,
        purchased:state.order.purchased
        // price: state.burgerBuilder.totalPrice
    }
}

// const mapPropstoState = dispatch =>{
//     return {
//         onInitPurchase : () => dispatch(actions.purchaseInit())
//     }
// }

export default connect(mapStatetoProps)(Checkout);
//class

// class Checkout extends Component {
//     // componentWillMount(){
//     //     this.props.onInitPurchase();
//     // }
//     // redux effect
    
//     // state={
//     //     ingredients:null,
//     //     price:0
//     // }

//     // componentWillMount() {
//     //     const query = new URLSearchParams(this.props.location.search)
//     //     const ingredients = {}
//     //     let price = 0
//     //     for (let param of query.entries()){
//     //         if (param[0] === 'price'){
//     //             price = param[1]
//     //         } else{

//     //             ingredients[param[0]] = +param[1]
//     //         }
//     //     }
//     //     this.setState({ingredients:ingredients,totalPrice:price});
//     //     console.log(this.state)
//     // }
//     checkoutCancelledHandler=()=> {
//         this.props.history.goBack()
//     }
//     checkoutContinuedHandler = ()=>{
//         this.props.history.replace('/checkout/contact-data')
//     }
//     render() {
//         let summary = <Redirect to='/'/>
//         if (this.props.ings){
//             const purchasedRedirect = this.props.purchased ? <Redirect to='/'/>:null;
//             summary = <div>
//                 {purchasedRedirect}
//                 <CheckoutSummary 
//                             ingredients={this.props.ings}
//                             checkoutCancelled={this.checkoutCancelledHandler}
//                             checkoutContinued={this.checkoutContinuedHandler}/>
//                             {/* <Route path={this.props.match.path + '/contact-data'} 
//                             render={(props)=> <ContactData ingredients={this.state.ingredients}
//                             price={this.state.totalPrice} {...props}/>}/> */}
                            
//                 <Route path={this.props.match.path + '/contact-data'} 
//                 component={ContactData}/>
//             </div>
// }
//     return summary
// }
// }

// const mapStatetoProps = state => {
//     return {
//         ings:  state.burgerBuilder.ingredients,
//         purchased:state.order.purchased
//         // price: state.burgerBuilder.totalPrice
//     }
// }

// // const mapPropstoState = dispatch =>{
// //     return {
// //         onInitPurchase : () => dispatch(actions.purchaseInit())
// //     }
// // }

// export default connect(mapStatetoProps)(Checkout);
