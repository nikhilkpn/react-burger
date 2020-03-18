import React, { Component, useEffect, Suspense } from 'react';
import { connect } from 'react-redux'
import asyncComponent from './hoc/asyncComponent/asyncComponent'
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { Route, Switch , withRouter, Redirect} from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions/index'


const Checkout = React.lazy(()=>{
  return import('./containers/Checkout/Checkout');
});
const Orders = asyncComponent(()=>{
  return import('./components/Orders/Orders');
});
const Auth = React.lazy(()=>{
  return import('./containers/Auth/Auth');
});
// see App not app eventhough it is a function component
const App = props => {
  const { onTryAutoSignup } = props
  useEffect(()=> {
    onTryAutoSignup();
  }, [onTryAutoSignup]);
  let routes = (
        <Switch >
          <Route path='/' exact component={BurgerBuilder}/>
          <Route path='/auth' render={(props)=> <Auth {...props}/>} />
          <Redirect to='/'/>
        </Switch>
    )
    if (props.isAuthenticated){
        routes =   <Switch>
            <Route path='/orders' exact render={(props)=> <Orders {...props}/>}/>
            <Route path='/auth'  render={(props)=><Auth {...props}/>}/>
            <Route path='/' exact component={BurgerBuilder}/>
            <Route path='/logout'  component={Logout}/>
            <Route path='/checkout'  render={(props)=><Checkout {...props}/>}/>
            <Redirect to='/'/>
          </Switch>
    }
    return (
      <div >
        <Layout>
          <Suspense fallback={<p>Loading..</p>}>{routes}</Suspense>
        </Layout>
      </div>
    );
  }
  const mapStateToProps = state => {
    return{
      isAuthenticated: state.auth.token !==null
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
      onTryAutoSignup : () => dispatch(actions.authCheckState())
    }
  }
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
  
  // for class
  // const asyncCheckout = asyncComponent(()=>{
  //   return import('./containers/Checkout/Checkout');
  // });
  // const asyncOrders = asyncComponent(()=>{
  //   return import('./components/Orders/Orders');
  // });
  // const asyncAuth = asyncComponent(()=>{
  //   return import('./containers/Auth/Auth');
  // });

// class App extends Component {
//   componentDidMount(){
//     this.props.onTryAutoSignup();
//   }
//   render() {
//     let routes = (
//         <Switch >
//           <Route path='/' exact component={BurgerBuilder}/>
//           <Route path='/auth'  component={asyncAuth}/>
//           <Redirect to='/'/>
//         </Switch>
//     )
//     if (this.props.isAuthenticated){
//         routes =   <Switch>
//             <Route path='/orders' exact component={asyncOrders}/>
//             <Route path='/auth'  component={asyncAuth}/>
//             <Route path='/' exact component={BurgerBuilder}/>
//             <Route path='/logout'  component={Logout}/>
//             <Route path='/checkout'  component={asyncCheckout}/>
//             <Redirect to='/'/>
//           </Switch>
//     }
//     return (
//       <div >
//         <Layout>
//           {routes}
//         </Layout>
//       </div>
//     );
//   }
// }
// const mapStateToProps = state => {
//   return{
//     isAuthenticated: state.auth.token !==null
