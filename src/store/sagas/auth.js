import { delay } from "redux-saga/effects";
import { put, call } from 'redux-saga/effects'
import axios from 'axios'

import * as actions from '../actions/index'

export function* logoutSaga(action){
    yield call([localStorage,"removeItem"], 'token')
    yield call([localStorage,"removeItem"], 'expirationDate')
    yield call([localStorage,"removeItem"], 'userId')
    yield put(actions.logoutSucceed())
}

export function* checkAuthTimeOutSaga(action){
    yield delay(action.expirationTime *1000)
    yield put(actions.logout())
}

export function* authUserSaga (action){
    yield put(actions.authStart())
    const authData = {
        email:action.email,
        password: action.password,
        returnSecureToken: true
    }
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA_bcy3Qaxo8O3Qe-g96PNztr8Nly8Dvps'
    if (!action.isSignup){
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA_bcy3Qaxo8O3Qe-g96PNztr8Nly8Dvps'
    }
    try {
        const res = yield axios.post(url, authData);
        const expirationTime = new Date(new Date().getTime() + res.data.expiresIn *1000)
        yield localStorage.setItem('token', res.data.idToken)
        yield localStorage.setItem('expirationDate', expirationTime)
        yield localStorage.setItem('userId', res.data.localId)
        yield put(actions.authSuccess(res.data.idToken,res.data.localId))
        yield put(actions.checkAuthTimeOut(res.data.expiresIn))
        
    } catch(error){
        yield put(action.authFail(error.response.data.error))
    }
}

export function* authCheckStateSaga(action){
    const token = yield localStorage.getItem('token');
        if (!token) {
            yield put(actions.logout());
        } else {
            const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                yield put(actions.logout());
            } else {
                const userId = yield localStorage.getItem('userId');
                yield put(actions.authSuccess(token, userId));
                yield put(actions.checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000 ))
            }   
        }
}