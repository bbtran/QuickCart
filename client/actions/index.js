import axios from 'axios';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_CART = 'FETCH_CART';
export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';
export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const REMOVE_ITEM_FROM_INVENTORY = 'REMOVE_ITEM_FROM_INVENTORY';
export const ADD_ITEM_TO_INVENTORY = 'ADD_ITEM_TO_INVENTORY';

export function getProductsList() {
  const url = '/api/products';
  const request = axios.get(url);
  return (dispatch) => {
    request.then(({ data }) => {
      dispatch({ type: FETCH_PRODUCTS, payload: data });
    });
  };
}

export function getCartList() {
  const url = '/api/cart';
  const request = axios.get(url);
  return (dispatch) => {
    request.then(({ data }) => {
      dispatch({ type: FETCH_CART, payload: data });
    });
  };
}

export function removeFromCart(itemId) {
  const url = `api/remove?${itemId}`;
  console.log('remove url', url);
  const request = axios.post(url);
  return (dispath) => {
    request.then(({ data }) => {
      console.log(data);
      dispath({ type: ADD_ITEM_TO_INVENTORY, payload: data });
    }).then(() => {
      dispatch({ type: REMOVE_ITEM_FROM_CART, payload: itemId });
    });
  };
}

export function addToCart(itemId) {
  const url = `http://localhost:3000/api/add?${itemId}`;
  console.log('add url', url);
  const request = axios.post(url);
  return (dispath) => {
    request.then(({ data }) => {
      console.log('data in addtocart:', data);
      dispath({ type: ADD_ITEM_TO_CART, payload: data });
    }).then(() => {
      console.log('in here');
      dispath({ type: REMOVE_ITEM_FROM_INVENTORY, payload: itemId });
    });
  };
}
