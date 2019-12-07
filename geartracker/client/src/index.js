import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createBrowserHistory } from "history";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faBars, faBicycle, faCogs, faPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

import App from './App';
import { GlobalStyle } from './styles/global';
import configureStore from './state/configureStore';
import * as serviceWorker from './serviceWorker';
import DocumentCookie from "./utils/documentCookie";

library.add(fab, faBars, faBicycle, faCogs, faPlus, faCheck, faTimes);
library.add(fab, faBars, faBicycle, faCogs, faPlus, faCheck, faTimes);

window.DocumentCookie = DocumentCookie;
// DocumentCookie.setCookie('csrftoken', 'aNStlpThCLgK1IG92iCSdnnwYDL3ig1lsJjDyzVY8EJLEhEnTU4Dlk7PFgoSq0NC', 1);
// DocumentCookie.setCookie('authToken', 'aNStlpThCLgK1IG92iCSdnnwYDL3ig1lsJjDyzVY8EJLEhEnTU4Dlk7PFgoSq0NC', 1);

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
