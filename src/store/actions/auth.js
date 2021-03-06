import * as actionTypes from './actionTypes'
import axios from 'axios'


export const authStart = ()=>{
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess =(token,userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId
    }
}

export const authFail = (error)=> {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = ()=>{
    // localStorage.removeItem('token')
    // localStorage.removeItem('expirationDate')
    // localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}

export const logoutSucceed = ()=> {
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeOut = (expirationTime)=>{
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    }
}
export const auth = (email, password, isSignup)=> {
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        isSignup: isSignup
    }
    // return dispatch => {
    //     dispatch(authStart())
    //     const authData = {
    //         email:email,
    //         password: password,
    //         returnSecureToken: true
    //     }
    //     let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA_bcy3Qaxo8O3Qe-g96PNztr8Nly8Dvps'
    //     if (!isSignup){
    //         url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA_bcy3Qaxo8O3Qe-g96PNztr8Nly8Dvps'
    //     }
    //     axios.post(url, authData)
    //     .then(res=>{
    //         const expirationTime = new Date(new Date().getTime() + res.data.expiresIn *1000)
    //         localStorage.setItem('token', res.data.idToken)
    //         localStorage.setItem('expirationDate', expirationTime)
    //         localStorage.setItem('userId', res.data.localId)
    //         dispatch(authSuccess(res.data.idToken,res.data.localId))
    //         dispatch(checkAuthTimeOut(res.data.expiresIn))
    //     })
    //     .catch(error=> {
    //         dispatch(authFail(error.response.data.error))
    //     })
    // }
}

export const setAuthRedirectPath = path =>{
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}
export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE
    }
    // return dispatch => {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         dispatch(logout());
    //     } else {
    //         const expirationDate = new Date(localStorage.getItem('expirationDate'));
    //         if (expirationDate <= new Date()) {
    //             dispatch(logout());
    //         } else {
    //             const userId = localStorage.getItem('userId');
    //             dispatch(authSuccess(token, userId));
    //             dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000 ))
    //         }   
    //     }
    // };
};