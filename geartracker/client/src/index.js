import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createBrowserHistory } from "history";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  faBars, faBicycle, faCogs, faPlus,
  faCheck, faTimes, faTrashAlt, faUndo
} from '@fortawesome/free-solid-svg-icons'

import App from './App';
import { GlobalStyle } from './styles/global';
import configureStore from './state/configureStore';
import * as serviceWorker from './serviceWorker';

library.add(fab, faBars, faBicycle, faCogs, faPlus, faCheck, faTimes, faTrashAlt, faUndo);

const store = configureStore();
const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <HashRouter history={history}>
      <React.Fragment>
        <GlobalStyle/>
        <App />
      </React.Fragment>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
