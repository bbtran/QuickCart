const faker = require('faker');
const mongoose = require('mongoose');
const Inventory = require('./database_models').Inventory;
const CartItem = require('./database_models').CartItem;

mongoose.Promise = global.Promise;

handlers = {};

// Initiate Inventory with 10 new items
handlers.generateInventory = () => {
  Inventory.remove({}, (error) => {
    if (error) throw error;
    const PRODUCT_COUNT = 10;
    for (let i = 1; i <= PRODUCT_COUNT; i++) {
      const product = {
        _id: faker.random.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.image() + `/${i}`, // designate a unique image to each item
        description: faker.lorem.sentence(),
      };
      const newProduct = new Inventory(product);
      newProduct.save((err) => {
        if (err) throw err;
      });
    }
  });
};

// Handler for adding and removing items from cart
handlers.addOrRemoveFromCart = (id, addOrRemove, callback) => {
  let Col;
  let AltCol;
  // Toggle between the collections for adding and removing products
  if (addOrRemove === 'ADD') {
    Col = Inventory;
    AltCol = CartItem;
  } else if (addOrRemove === 'REMOVE') {
    Col = CartItem;
    AltCol = Inventory;
  }
  Col.findOne({ _id: id }).exec((error, item) => {
    if (error) throw error;
    const product = {
      _id: item._id,
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description,
    };
    movedItem = new AltCol(product);
    movedItem.save((err) => {
      if (err) throw err;
      callback(item);
    });
  }).then(() => {
    Col.remove({ _id: id }, (error) => {
      if (error) throw error;
    });
  });
};

// Remove all exiting items from CartItems collection
handlers.removeAllFromCart = () => {
  CartItem.find({}, (error, results) => {
    results.forEach((item) => {
      const product = {
        _id: item._id,
        name: item.name,
        price: item.price,
        image: item.image,
        description: item.description,
      };
      const movedItem = new Inventory(product);
      movedItem.save((err) => {
        if (err) throw err;
      }).then(() => {
        CartItem.remove({ _id: item._id }, (error) => {
          if (error) throw error;
        });
      });
    });
  });
};

// Fetch all items in Inventory
handlers.getInventory = (callback) => {
  Inventory.find({}, (error, productList) => {
    if (error) throw error;
    callback(productList);
  });
};

// Fetch all items in Cart
handlers.getCart = (callback) => {
  CartItem.find({}, (error, cartItems) => {
    if (error) throw error;
    callback(cartItems);
  });
};

// Clear out Cart as well as Inventory
handlers.checkOut = () => {
  CartItem.remove({}, (error) => {
    if (error) throw error;
  }).then(() => {
    Inventory.remove({}, (error) => {
      if (error) throw error;
    });
  });
};

module.exports = handlers;
