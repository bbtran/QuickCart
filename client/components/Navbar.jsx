import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <header className="container">
        <nav className="navbar">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target=".header-navigation">
              <span className="sr-only">Toggle navigation</span><i className="fa fa-bars"></i>
            </button>
              <Link className="navbar-brand page-scroll" to="/"> QuickCart </Link>
          </div>
          <div className="collapse navbar-collapse header-navigation">
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/cart">Cart</Link></li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Navbar;
