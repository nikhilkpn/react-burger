import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'


const controls = [
    { label:'Salad', type:'salad'},
    { label:'Bacon', type:'bacon'},
    { label:'Chees', type:'cheese'},
    { label:'Meat', type:'meat'},
]

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Total Price: <strong>{props.price.toFixed(2)}</strong> </p>
            {controls.map( ctr => 
                <BuildControl 
                key={ctr.label} 
                label={ctr.label}
                added={()=>props.ingredientsAdded(ctr.type)}
                removed={()=> props.ingredientsRemoved(ctr.type)}
                disabled={props.disabled[ctr.type]}
                PRICES={props.PRICES[ctr.type]}/>
            )}
            <button 
                onClick={props.ordered} 
                className={classes.OrderButton} 
                disabled={!props.purchasable}>{props.isAuth ? 'ORDER NOW': 'SIGN UP'}</button>
        </div>
    )
}

export default buildControls
