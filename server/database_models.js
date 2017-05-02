const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  _id: String,
  name: String,
  price: Number,
  image: String,
  description: String,
});

const CartItem = (mongoose.model('CartItem', productSchema));
const Inventory = (mongoose.model('Inventory', productSchema));

module.exports = { CartItem, Inventory };
