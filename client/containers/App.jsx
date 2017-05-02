import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from '../components/Navbar';
import ProductsList from './ProductsList';
import Cart from './Cart';

// import * as actions from '../actions';
// import '../../styles/base.scss';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Navbar />
        <div className="router">
          <Switch>
            <Route exact path="/" component={ProductsList} />
            <Route path="/products" component={ProductsList} />
            <Route path="/cart" component={Cart} />
          </Switch>
          </div>
      </div>
    );
  }
}

App.propTypes = {
};

export default App;
