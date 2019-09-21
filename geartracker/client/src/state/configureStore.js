import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axiosMiddleware from 'redux-axios-middleware';

import rootReducer from './modules';
import gearTrackerClient from '../clients/gearTracker';

export default function configureStore(initialState) {
  const middlewares = [thunkMiddleware, axiosMiddleware(gearTrackerClient())];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const composedEnhancers = composeEnhancers(...enhancers);

  const store = createStore(rootReducer, initialState, composedEnhancers);

  return store
}
