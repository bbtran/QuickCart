import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div className="nav-container">
        <div className="main-nav">
          <nav className="navbar navbar-default">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/"> QuickCart </Link>
            </div>
            <div className="navbar-list">
              <ul>
                <li><Link className="nav-link" to="/cart">Cart <i className="fa fa-shopping-cart" aria-hidden="true"></i></Link></li>
                <li><Link className="nav-link" to="/products">Products</Link></li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default Navbar;

