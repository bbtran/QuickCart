import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { FETCH_PRODUCTS, FETCH_CART, REMOVE_ITEM_FROM_CART, ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_INVENTORY, ADD_ITEM_TO_INVENTORY } from '../actions/index';

function productsReducer(state = [], action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
    return action.payload || state;
    case REMOVE_ITEM_FROM_INVENTORY:
    return removeFromList(state, action);
    case ADD_ITEM_TO_INVENTORY:
    return addToList(state, action);
    default:
    return state;
  }
}
function cartReducer(state = [], action) {
  switch (action.type) {
    case FETCH_CART:
    return action.payload || state;
    case REMOVE_ITEM_FROM_CART:
    return removeFromList(state, action);
    case ADD_ITEM_TO_CART:
    return addToList(state, action);
    default:
    return state;
  }
}

function addToList(prevState, action) {
  const newState = [...prevState, action.payload];
  console.log('newState:', newState);
  return newState;
}

function removeFromList(prevState, action) {
  const copiedState = [...prevState];
  let index;
  for (let i = 0; i < copiedState.length; i++) {
    console.log('in reducer', action.payload);
    if (copiedState[i]._id === action.payload) {
      index = i;
    }
  }
  copiedState.splice(index, 1);
  return copiedState;
}


const rootReducer = combineReducers({
  cartList: cartReducer,
  productsList: productsReducer,
  router: routerReducer,
});

export default rootReducer;
