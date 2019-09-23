import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux'
import { createBrowserHistory } from "history";
import { PersistGate } from 'redux-persist/integration/react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faBars, faBicycle, faCogs, faPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

import App from './App';
import { GlobalStyle } from './styles/global';
import configureStore from './state/configureStore';
import * as serviceWorker from './serviceWorker';

library.add(fab, faBars, faBicycle, faCogs, faPlus, faCheck, faTimes);
library.add(fab, faBars, faBicycle, faCogs, faPlus, faCheck, faTimes);

const { store, persistor } = configureStore();
const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <React.Fragment>
          <GlobalStyle/>
          <App />
        </React.Fragment>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
