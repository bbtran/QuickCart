import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      class: 'product-list-item',
    };
  }
  componentWillMount() {
    if (this.props.cart) {
      this.setState({ class: 'cart-list-item' });
    }
  }

  render() {
    const price = '$' + this.props.price.toFixed(2);
    return (
      <div className={this.state.class}>
        <div className="product-image">
          <img src={this.props.image} alt="productImg" />
        </div>
        <div className="product-info">
          <div className="product-name">
            {this.props.name}
          </div>
          {this.props.cart ? <div className="price-header"> <span>Price</span><div className="product-price"> {price}</div></div> : <div className="product-price">{price}</div> }
        </div>
      </div>
    );
  }
}

ProductListItem.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  cart: PropTypes.bool,
  price: PropTypes.number,
};
