import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import ProductsListItem from '../components/ProductsListItem';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.getCartList();
  }

  handleClick(id) {
    this.props.removeFromCart(id);
  }

  render() {
    console.log('cart props: ', this.props);
    const renderedList = this.props.cartList.map((item) => {
      return (
        <li key={item._id}>
          <Link to={`/products/${item._id}`} ><ProductsListItem image={item.image} name={item.name} cart={this.state.cart} /></Link>
          <a href="" onClick={() => this.handleClick(item._id)}>
            REMOVE FROM CART
          </a>
        </li>
      );
    });
    return (
      <div className="container">
        <div className="cart-content">
          <ul className="cart-list">
            {renderedList}
          </ul>
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
};

export default connect(mapStateToProps, actions)(Cart);
