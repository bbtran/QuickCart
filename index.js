const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI || require('./server/config').MONGO_URI;


const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
app.set('port', port);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// On server start, clear inventory collection and add 10 new products
// mongoHandlers.generateInventory();

// mongoHandlers.addOrRemoveFromCart('', 'ADD', (item) => {
//   console.log(item);
// });


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

mongoose.connect(MONGO_URI);
app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Listening on http://localhost:${port}/`);
  }
});
