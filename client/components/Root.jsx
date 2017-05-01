import React, { Component } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import App from '../containers/App';

class Root extends Component {
  render() {
    return (
      <Provider store={this.props.store} >
        <ConnectedRouter history={this.props.history}>
          <div>
            <Route exact path="/" component={App} />
            <Route path="/home" component={App} />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object,
  history: PropTypes.object,
};

export default Root;
