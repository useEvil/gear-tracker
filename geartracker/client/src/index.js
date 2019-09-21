import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { createBrowserHistory } from "history";
import { Provider } from 'react-redux'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faBars, faBicycle, faCogs, faPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

import { GlobalStyle } from './styles/global';

import App from './App';
import configureStore from './state/configureStore';
import * as serviceWorker from './serviceWorker';

library.add(fab, faBars, faBicycle, faCogs, faPlus, faCheck, faTimes);

const store = configureStore();
const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <React.Fragment>
        <GlobalStyle/>
        <App />
      </React.Fragment>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
