import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './components/Orders/Orders'
import { Route, Switch } from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div >
        <Layout>
          <Switch >
            <Route path='/orders' exact component={Orders}/>
            <Route path='/' exact component={BurgerBuilder}/>
            <Route path='/checkout'  component={Checkout}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
