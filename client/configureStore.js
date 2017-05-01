import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from './reducers'; // Or wherever you keep your reducers

export default function configureStore(history) {
  const middleware = routerMiddleware(history);
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(middleware, thunk)));
  /* eslint-enable */

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers/index');
      store.replaceReducer(nextReducer);
    });
  }
  return store;
}
