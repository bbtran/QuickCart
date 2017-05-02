import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import ProductsListItem from '../components/ProductsListItem';

class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.getProductsList();
  }

  handleClick(id) {
    this.props.addToCart(id);
  }

  render() {
    const renderedList = this.props.productsList.map((item) => {
      return (
        <li key={item._id}>
          <ProductsListItem image={item.image} name={item.name} cart={this.state.cart} />
          <button className="add-to-cart" onClick={() => this.handleClick(item._id)}> ADD TO CART
          </button>
        </li>
      );
    });
    return (
      <div className="container">
        <div className="products-content">
          <ul className="products-list">
            {renderedList}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ productsList }) => {
  return { productsList };
};

ProductsList.propTypes = {
  productsList: PropTypes.array,
  getProductsList: PropTypes.func,
};

export default connect(mapStateToProps, actions)(ProductsList);
