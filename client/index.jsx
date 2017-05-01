import 'react-hot-loader/patch';
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';

import configureStore from './configureStore';
import Root from './components/Root';

// Create history and store to pass into react router and redux provider
const history = createHistory();
const store = configureStore(history);

ReactDOM.render(
<AppContainer>
  <Root store={store} history={history} />
</AppContainer>,
document.getElementById('main'));

// for hot module reloading
if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NextRoot = require('./components/Root').default;
    ReactDOM.render(
    <AppContainer>
      <NextRoot store={store} history={history} />
    </AppContainer>,
    document.getElementById('main'));
  });
}
