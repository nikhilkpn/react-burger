import React, { Component, useEffect } from 'react'
import { connect } from 'react-redux'
import Order from '../Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import Spinner from '../UI/Spinner/Spinner'

const Orders = props => {
    const { onFetchOrders } = props
    useEffect(() => {
        onFetchOrders(props.token, props.userId);
    }, [onFetchOrders])
    let orders = <Spinner />
    if (!props.loading){
        orders = props.orders.map(order=>(
            <Order key={order.id}
                ingredients={order.ingredients}
                price={order.price}/>
        )) 
    }
    return (
        <div>
            {orders}
        </div>
    )
}
const mapStatetoProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        onFetchOrders: (token,userId) => dispatch(actions.fetchOrders(token,userId))
    }
}
export default connect(mapStatetoProps,mapDispatchtoProps)(withErrorHandler(Orders, axios));

// class
// class Orders extends Component {

//     // state = {
//     //     orders :[],
//     //     loading:true
//     // }
//     componentDidMount(){
//         this.props.onFetchOrders(this.props.token, this.props.userId);
//         // axios.get('orders.json')
//         // .then(res =>{
//         //     const fetchOrders = []
//         //     for (let key in res.data){
//         //         fetchOrders.push({
//         //             ...res.data[key],
//         //             id:key
//         //         })
//         //     }
//         //     this.setState({loading:false, orders:fetchOrders})
//         // })
//         // .catch(error=>{

//         //     this.setState({loading:false})
//         // })
//     }
//     render() {
//         let orders = <Spinner />
//         if (!this.props.loading){
//             orders = this.props.orders.map(order=>(
//                 <Order key={order.id}
//                     ingredients={order.ingredients}
//                     price={order.price}/>
//             )) 
//         }
//         return (
//             <div>
//                 {orders}
//             </div>
//         )
//     }
// }
// const mapStatetoProps = state => {
//     return {
//         orders: state.order.orders,
//         loading: state.order.loading,
//         token: state.auth.token,
//         userId: state.auth.userId
//     }
// }

// const mapDispatchtoProps = dispatch => {
//     return {
//         onFetchOrders: (token,userId) => dispatch(actions.fetchOrders(token,userId))
//     }
// }
// export default connect(mapStatetoProps,mapDispatchtoProps)(withErrorHandler(Orders, axios));