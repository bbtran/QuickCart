const express = require('express');
const path = require('path');
const faker = require('faker');

const app = express();
const port = process.env.PORT || 3000;
app.set('port', port);

const PRODUCT_COUNT = 10;
const products = [];
for (let i = 0; i < PRODUCT_COUNT; i++) {
  products.push({
    id: faker.random.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.image(),
    description: faker.lorem.sentence(),
  });
}

console.log('Products:', JSON.stringify(products, null, 2));


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
} else {
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('./webpack.config.js');
  app.use(webpackMiddleware(webpack(webpackConfig), {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));
  app.use(webpackHotMiddleware(webpack(webpackConfig)));
}

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Listening on http://localhost:${port}/`);
  }
});
