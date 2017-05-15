# QuickCart
A quick and easy shopping cart for scalable use.
## Version 1.0.0
* QuickCart is a full stack application utilzing a Node.js server along with MongoDB to persist cart data. The current store only contains 12 items with a stock quantity of 1 for each item. Clicking on the item will redirect users to a detailed view. From there users can add items to the cart or remove the items from the cart if they wish. Clicking on the add-to-cart button directly from the products page will remove the item from the list and add it to the cart. Checkout is easy! No payment is needed. Clicking the checkout button will update your products page and will empty the cart simulating a successful purchase.

![QuickCart](images/quickCartGif.gif "QuickCart")

# Tech Stack
## Frontend
* [React](https://facebook.github.io/react/)-[Redux](https://github.com/reactjs/redux) - JS libraries for rendering page views and maintaining state
* [React Router v4](https://github.com/ReactTraining/react-router) - Routing library for React applications, enabling URL for specific views
* [Bootstrap](http://getbootstrap.com/) - mobile first styling framework
* [SASS/SCSS](http://sass-lang.com/) - CSS preprocessor

## Backend
* [Node.js](https://nodejs.org/en/) with [Express](http://expressjs.com/) for serving pages
* [MongoDB](https://www.mongodb.com) for data storage
* [Mongoose.js](http://mongoosejs.com/) for object modeling
## Dev/Build Tools
* [Webpack](https://webpack.github.io/) for bundling/scaffolding and [Babel](https://babeljs.io/) for transpiling

## Install
#### Global Installs

For running Node server

```
$ brew install node
```

For building and deploying: Webpack

```
$ npm install webpack -g
```
#### Local Install

Download all dependencies listed under package.json

```
$ npm install
```

#### To Run the Application
Initiate both Development and Production servers by running the following:

```$ npm run dev``` and in a separate terminal run ```$ npm run build``` and then ```$ npm run start```

Fronend development changes are reflected immediately on ```http://localhost:8080```
Production server is on ```http://localhost:3000```

## Contributing

I am happy to review and merge pull requests. Please see [CONTRIBUTING](CONTRIBUTING.md) if you'd like to add to this fun project!

## License

MIT
