import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import * as actions from '../actions';
// import '../../styles/base.scss';

class App extends Component {
  render() {
    return (
      <div className="container">
        <nav className="navbar">
          <div className="container-fluid">
            <div className="navbar-header">
              <a href="/"><h1>QuickCart</h1></a>
              HELLO WORLD
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

App.propTypes = {
};

export default App;
