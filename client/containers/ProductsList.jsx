import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Link, withRouter } from 'react-router-dom';
import * as actions from '../actions';
import ProductsListItem from '../components/ProductsListItem';
import ProductDetail from './ProductDetail';

class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: false,
      length: this.props.productsList.length,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.getProductsList();
  }

  handleClick(id) {
    document.getElementById(id).setAttribute('disabled', true);
    console.log(document.getElementById(id));
    this.props.addToCart(id);
  }

  render() {
    const renderedList = this.props.productsList.map((item) => {
      return (
        <li key={item._id}>
          <Link to={`/products/${item._id}`}><ProductsListItem id={item._id} image={item.image} name={item.name} price={item.price} cart={this.state.cart} /></Link>
          <button id={item._id} className="add-to-cart" onClick={() => { this.handleClick(item._id); }}> Add to Cart
          </button>
        </li>
      );
    });
    return (
      <div className="products-container">
        {/* Wrap the contents inside parent route. If url matches exactly to /products render list of products */}
        <Route path={`${this.props.match.url}/:itemId`} component={ProductDetail} />
        <Route exact path={this.props.match.url} render={() => (
          <div className="products-content">
            <ul className="products-list">
              {renderedList}
            </ul>
          </div>)}
        />
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
  addToCart: PropTypes.func,
  match: PropTypes.object,
};

export default withRouter(connect(mapStateToProps, actions)(ProductsList));
