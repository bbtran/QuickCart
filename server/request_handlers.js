const url = require('url');
const database = require('./db_handlers');

module.exports = (app) => {
  // Retrieve all items from inventory collection
  app.get('/api/products', (req, res) => {
    database.getInventory((productList) => {
      res.status(200).send(JSON.stringify(productList));
    });
  });

  // Retrieve all items in cart collection
  app.get('/api/cart', (req, res) => {
    database.getCart((cartItems) => {
      res.status(200).send(JSON.stringify(cartItems));
    });
  });

  // Add item to cart
  app.post('/api/add?', (req, res) => {
    console.log(url.parse(req.url));
    const itemId = url.parse(req.url).query;
    if (itemId) {
      database.addOrRemoveFromCart(itemId, 'ADD', (item) => {
        console.log(item);
        res.status(201).send(JSON.stringify(item));
      });
    } else {
      res.end();
    }
  });

  // Remove item from cart
  app.post('/api/remove?', (req, res) => {
    console.log(url);
    const itemId = url.parse(req.url).query;
    if (itemId) {
      database.addOrRemoveFromCart(itemId, 'REMOVE', (item) => {
        console.log(item);
        res.status(201).send(JSON.stringify(item));
      });
    } else {
      res.end();
    }
  });

  // Checkout and start over with new products in Inventory
  app.get('/api/checkout', (req, res) => {
    database.checkOut().then(() => {
      database.generateInventory();
    }).then(() => {
      res.send('Success!');
    });
  });

  // Remove all items from Cart
  app.get('/api/removeAll', (req, res) => {
    database.removeAllFromCart().then(() => {
      res.send('Success!');
    });
  });
};

