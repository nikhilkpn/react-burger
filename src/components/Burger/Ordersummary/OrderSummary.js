import React, { Component} from 'react'
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

const OrderSummary = props => {
        const  ingredientSummary = Object.keys(props.ingredients)
        .map(igKey=>{
            return <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
        })
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>Ingredients are:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
                <p> Continue to checkout ?</p>
                <Button btnType='Danger'  clicked={props.purchaseCancelled}>CANCEL</Button>
                <Button btnType='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
            </Aux>
            )
}

export default OrderSummary;

// class OrderSummary extends Component {
//     // componentWillUpdate(){
//     //     console.log('fff');
//     // }
    
//     render(){
//         const  ingredientSummary = Object.keys(this.props.ingredients)
//         .map(igKey=>{
//             return <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
//         })
//         return (
//             <Aux>
//                 <h3>Your Order</h3>
//                 <p>Ingredients are:</p>
//                 <ul>
//                     {ingredientSummary}
//                 </ul>
//                 <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
//                 <p> Continue to checkout ?</p>
//                 <Button btnType='Danger'  clicked={this.props.purchaseCancelled}>CANCEL</Button>
//                 <Button btnType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
//             </Aux>
//             )
//     }
// }

// export default OrderSummary;
