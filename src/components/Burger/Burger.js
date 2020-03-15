import React from 'react'
import Burgeringredient from './Burgeringredients/Burgeringredients'
import classes from './Burger.module.css'

const burger = (props) => {
    let trasformedIngredients = Object.keys(props.ingredients).map(igKey=>{
        return [...Array(props.ingredients[igKey])].map((_,i) => {
          return  <Burgeringredient key={igKey+i} type={igKey} />
        });
    }).reduce((arr,el)=>{
        return arr.concat(el)
    },[]);
    if (trasformedIngredients.length ===0){
        trasformedIngredients = <p>Please add ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <Burgeringredient type='bread-top'/>
            {trasformedIngredients}
            <Burgeringredient type='bread-bottom'/>
        </div>
    )
}

export default burger
