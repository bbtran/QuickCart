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
    return (
      <div className={this.state.class}>
        <div className="product-image">
          <img src={this.props.image} alt="productImg" />
        </div>
        <div className="product-name">
          {this.props.name}
        </div>
      </div>
    );
  }
}

ProductListItem.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  cart: PropTypes.bool,
};
