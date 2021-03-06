import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import classes from './Auth.module.css'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'
import { updateObject, checkValidity } from '../../shared/utility'

const Auth = props => {
    const [controls,setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        },
    })
    const [isSignup,setIsSignup] = useState(true)
   
    const inputChangedHandler = (event, controlName) =>{
        const updateControls = updateObject(controls,{
            [controlName]: updateObject(controls[controlName],{
                value: event.target.value,
                valid: checkValidity(event.target.value,controls[controlName].validation),
                touched:true
            })
        }) 
        setControls(updateControls)
    }
    const submitHandler = (event)=>{
        event.preventDefault();
        props.onAuth(controls.email.value,controls.password.value,isSignup)
    }

    const switchAuthModeHandler = ()=>{
        setIsSignup(!isSignup)
    }
    const {buildingBurger,authRedirectPath,onSetAuthRedirectPath} = props
    useEffect(() => {
        if (!buildingBurger && authRedirectPath !=='/'){
            onSetAuthRedirectPath();
        }
    }, [buildingBurger,authRedirectPath,onSetAuthRedirectPath])
    const formElementsArray = [];
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        });
    }
    let form = formElementsArray.map(formElement => (
        <Input 
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangedHandler(event, formElement.id)} />
    ))
    if (props.loading){
        form = <Spinner/>
    }
        let errorMessage = null;
        if (props.error){
            errorMessage = (
                <p>{props.error.message}</p>
            )
        }
        let authRedirect = null
        if (props.isAuthenticated){
            authRedirect  = <Redirect to={props.authRedirectPath} />
        }
        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button 
                    btnType='Danger'
                    clicked={switchAuthModeHandler}>SWITCH TO {isSignup? "SIGN IN":"SIGH UP"}</Button>
            </div>
        )
}

const mapStateToProps = state =>{
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !==null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAuth:(email, password, isSignup)=> dispatch(actions.auth(email,password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth)
// export class Auth extends Component {
//     state = {
//         controls:{
//             email: {
//                 elementType: 'input',
//                 elementConfig: {
//                     type: 'email',
//                     placeholder: 'Mail address'
//                 },
//                 value: '',
//                 validation: {
//                     required: true,
//                     isEmail: true
//                 },
//                 valid: false,
//                 touched: false
//             },
//             password: {
//                 elementType: 'input',
//                 elementConfig: {
//                     type: 'password',
//                     placeholder: 'Password'
//                 },
//                 value: '',
//                 validation: {
//                     required: true,
//                     minLength: 6
//                 },
//                 valid: false,
//                 touched: false
//             },
//         },
//         isSignup:true
//     }
   
//     inputChangedHandler = (event, controlName) =>{
//         const updateControls = updateObject(this.state.controls,{
//             [controlName]: updateObject(this.state.controls[controlName],{
//                 value: event.target.value,
//                 valid: checkValidity(event.target.value,this.state.controls[controlName].validation),
//                 touched:true
//             })
//         }) 
//         this.setState({controls:updateControls})
//     }
//     submitHandler = (event)=>{
//         event.preventDefault();
//         this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup)
//     }

//     switchAuthModeHandler = ()=>{
//         this.setState(prevState => {
//             return {isSignup: !prevState.isSignup}
//         })
//     }
//     componentDidMount(){
//         if (!this.props.buildingBurger && this.props.authRedirectPath !=='/'){
//             this.props.onSetAuthRedirectPath();
//         }

//     }
//     render() {
//         const formElementsArray = [];
//         for (let key in this.state.controls) {
//             formElementsArray.push({
//                 id: key,
//                 config: this.state.controls[key]
//             });
//         }
//         let form = formElementsArray.map(formElement => (
//             <Input 
//                 key={formElement.id}
//                 elementType={formElement.config.elementType}
//                 elementConfig={formElement.config.elementConfig}
//                 value={formElement.config.value}
//                 invalid={!formElement.config.valid}
//                 shouldValidate={formElement.config.validation}
//                 touched={formElement.config.touched}
//                 changed={(event) => this.inputChangedHandler(event, formElement.id)} />
//         ))
//         if (this.props.loading){
//             form = <Spinner/>
//         }
//         let errorMessage = null;
//         if (this.props.error){
//             errorMessage = (
//                 <p>{this.props.error.message}</p>
//             )
//         }
//         let authRedirect = null
//         if (this.props.isAuthenticated){
//             authRedirect  = <Redirect to={this.props.authRedirectPath} />
//         }
//         return (
//             <div className={classes.Auth}>
//                 {authRedirect}
//                 {errorMessage}
//                 <form onSubmit={this.submitHandler}>
//                     {form}
//                     <Button btnType="Success">SUBMIT</Button>
//                 </form>
//                 <Button 
//                     btnType='Danger'
//                     clicked={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignup? "SIGN IN":"SIGH UP"}</Button>
//             </div>
//         )
//     }
// }

// const mapStateToProps = state =>{
//     return {
//         loading: state.auth.loading,
//         error: state.auth.error,
//         isAuthenticated: state.auth.token !==null,
//         buildingBurger: state.burgerBuilder.building,
//         authRedirectPath: state.auth.authRedirectPath
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return{
//         onAuth:(email, password, isSignup)=> dispatch(actions.auth(email,password, isSignup)),
//         onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
//     }
// }
// export default connect(mapStateToProps,mapDispatchToProps)(Auth)
