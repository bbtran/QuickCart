import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';
import * as actions from '../actions';
import ProductsListItem from '../components/ProductsListItem';
import ProductDetail from './ProductDetail';

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
    console.log('match', this.props.match);
    const renderedList = this.props.productsList.map((item) => {
      return (
        <li key={item._id}>
          <Link to={`/products/${item._id}`}><ProductsListItem id={item._id} image={item.image} name={item.name} cart={this.state.cart} /></Link>
          <button className="add-to-cart" onClick={() => { this.handleClick(item._id); }} > ADD TO CART
          </button>
        </li>
      );
    });
    return (
      <div className="container">
        <Route path={`${this.props.match.url}/:itemId`} component={ProductDetail} />
        {/* Wrap the contents inside parent route. If url matches exactly to /products render list of products */}
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

export default connect(mapStateToProps, actions)(ProductsList);
