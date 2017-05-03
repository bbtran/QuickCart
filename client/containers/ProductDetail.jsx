import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as actions from '../actions';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inCart: false,
      item: {},
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    this.props.productsList.forEach((prod) => {
      if (prod._id === this.props.match.params.itemId) {
        this.setState({
          item: prod,
          inCart: false,
        });
      }
    });
    if (this.state.item._id === undefined) {
      this.props.cartList.forEach((prod) => {
        if (prod._id === this.props.match.params.itemId) {
          this.setState({
            item: prod,
            inCart: true,
          });
        }
      });
    }
  }
  handleClick(e) {
    e.preventDefault();
    this.props.addToCart(this.state.item._id);
    this.setState({ inCart: true });
  }

  render() {
    return (
      <div className="product-detail">
        <div className="item-image">
          <img src={this.state.item.image} alt="product-photo" />
        </div>
        <div className="item-info">
          <h2>{this.state.item.name}</h2>
          <h4>Price: ${this.state.item.price}</h4>
          <p>{this.state.item.description}</p>
          <div className="call-to-action">
            {/* If the item is in cart, provide a link to the cart, else display add to cart buttom */}
            {this.state.inCart === true ? <Link to="/cart">View item in cart!</Link> : <button className="add-to-cart" onClick={this.handleClick}>ADD TO CART</button>}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ productsList, cartList }) => {
  return { productsList, cartList };
};

ProductDetail.propTypes = {
  match: PropTypes.object,
  productsList: PropTypes.array,
  cartList: PropTypes.array,
  addToCart: PropTypes.func,
};

export default connect(mapStateToProps, actions)(ProductDetail);
