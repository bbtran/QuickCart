import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as actions from '../actions';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inCart: false,
      item: {},
    };
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }
  componentDidMount() {
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

  handleAddClick(e) {
    e.preventDefault();
    this.setState({ inCart: true });
    this.props.addToCart(this.state.item._id);
  }

  handleRemoveClick(e) {
    e.preventDefault();
    this.setState({ inCart: false });
    this.props.removeFromCart(this.state.item._id);
  }

  render() {
    const showViewLink = <div><Link to="/cart">View item in cart!</Link> or <button className="add-to-cart" onClick={this.handleRemoveClick}>Remove from Cart</button></div>;
    const price = 'Price: $' + this.state.item.price + '.00';
    return (
      <div className="product-detail">
        <div className="item-image">
          <img src={this.state.item.image} alt="product-photo" />
        </div>
        <div className="item-info">
          <h2>{this.state.item.name}</h2>
          <h4>{price}</h4>
          <p>{this.state.item.description}</p>
          <div className="call-to-action">
            {/* If the item is in cart, provide a link to the cart, else display add to cart buttom */}
            {this.state.inCart === true ? showViewLink : <button className="add-to-cart" onClick={this.handleAddClick}>Add to Cart</button>}
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
  removeFromCart: PropTypes.func,
};

export default withRouter(connect(mapStateToProps, actions)(ProductDetail));
