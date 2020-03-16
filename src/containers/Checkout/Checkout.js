import React, { Component } from 'react'
import { connect } from 'react-redux'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../Checkout/ContactData/ContactData'
import { Route, Redirect } from 'react-router-dom'

class Checkout extends Component {
    // redux effect
    
    // state={
    //     ingredients:null,
    //     price:0
    // }

    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search)
    //     const ingredients = {}
    //     let price = 0
    //     for (let param of query.entries()){
    //         if (param[0] === 'price'){
    //             price = param[1]
    //         } else{

    //             ingredients[param[0]] = +param[1]
    //         }
    //     }
    //     this.setState({ingredients:ingredients,totalPrice:price});
    //     console.log(this.state)
    // }
    checkoutCancelledHandler=()=> {
        this.props.history.goBack()
    }
    checkoutContinuedHandler = ()=>{
        this.props.history.replace('/checkout/contact-data')
    }
    render() {
        let summary = <Redirect to='/'/>
        if (this.props.ings){
            summary = <div>
                <CheckoutSummary 
                            ingredients={this.props.ings}
                            checkoutCancelled={this.checkoutCancelledHandler}
                            checkoutContinued={this.checkoutContinuedHandler}/>
                            {/* <Route path={this.props.match.path + '/contact-data'} 
                            render={(props)=> <ContactData ingredients={this.state.ingredients}
                            price={this.state.totalPrice} {...props}/>}/> */}
                            
                <Route path={this.props.match.path + '/contact-data'} 
                component={ContactData}/>
            </div>
}
    return summary
}
}

const mapStatetoProps = state => {
    return {
        ings:  state.burgerBuilder.ingredients,
        // price: state.burgerBuilder.totalPrice
    }
}

export default connect(mapStatetoProps)(Checkout);
