import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../actions';
import ProductsListItem from '../components/ProductsListItem';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: true,
      isEmpty: false,
      submitting: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
  }

  componentDidMount() {
    this.props.getCartList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cartList.length === 0) {
      this.setState({ isEmpty: true });
    }
  }
  handleClick(id) {
    this.props.removeFromCart(id);
  }

  handleCheckout() {
    // api calll does not need to flow through redux store
    this.setState({ submitting: true });
    axios.get('/api/checkout').then((res) => {
      console.log('Database updated', res.data);
      if (res.data === 'Success!') {
        this.props.history.push('/products');
      }
    });
  }

  render() {
    const renderedList = this.props.cartList.map((item) => {
      return (
        <li key={item._id}>
          <Link to={`/products/${item._id}`} ><ProductsListItem image={item.image} name={item.name} price={item.price} cart={this.state.cart} /></Link>
          <a className="remove-from-cart" href="" onClick={() => this.handleClick(item._id)}>
            Remove item from cart
          </a>
        </li>
      );
    });
    return (
      <div className="cart-container">
        <div className="cart-content">
          <ul className="cart-list">
            {renderedList}
          </ul>
        </div>
        <div className="checkout-button">
          {this.state.isEmpty ? <span className="empty-cart"> Your cart is currently empty. Please return to the products page. Thank you! </span> : <button className="call-to-action" onClick={this.handleCheckout} disabled={this.state.submitting}>Checkout</button>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ cartList }) => {
  return { cartList };
};

Cart.propTypes = {
  cartList: PropTypes.array,
  getCartList: PropTypes.func,
  removeFromCart: PropTypes.func,
  history: PropTypes.object,
};

export default withRouter(connect(mapStateToProps, actions)(Cart));
