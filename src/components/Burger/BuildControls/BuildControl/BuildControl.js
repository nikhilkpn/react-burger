import React from 'react';
import classes from './BuildControl.module.css'

const buildControl = (props) => (
    
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>           
        <button className={classes.Less} 
            onClick={props.substracted}
            disabled={props.disabled}>Less</button>           
        <button className={classes.More} onClick={props.added}>More</button>
        <div className={classes.Label}><strong> Rs.</strong> {props.PRICES} </div>
    </div>
);

export default buildControl
