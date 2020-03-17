import React from 'react'
import classes from './Order.module.css'

const order = (props) => {
   const ingredients = []
   for (let ingredientName in props.ingredients){
       ingredients.push({
                name:ingredientName, 
                amount:props.ingredients[ingredientName]
            })
   }

   let ingredientOutput = ingredients.map(ig=>{
       return <span 
                style={{
                    textTransform:'capitalize',
                    display:'inline-block',
                    margin:'0 8px',
                    border:'2px solid black',
                    padding: '5px'}}
                key={ig.name}>Ingredients: {ig.name}  { ig.amount}</span>
   })

   return (
        <div className={classes.Order}>
            {ingredientOutput}
            <p>Price:{Number.parseFloat(props.price).toFixed(2)}</p>
                
        </div>
   )
}

export default order
