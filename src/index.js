import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter} from 'react-router-dom'
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import burgeBuilderReducer from './store/reducers/burgerBuilder'
import orderReducer from './store/reducers/order'
import authReducer from './store/reducers/auth'

const logger = store =>{
    return next =>{
        return action=>{
            const result = next(action);
            return result;
        }
    }
}
const rootReducer = combineReducers({
    burgerBuilder: burgeBuilderReducer,
    order: orderReducer,
    auth: authReducer
})

const composeEnhancers = process.env.NODE_ENV =='development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose:null;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
