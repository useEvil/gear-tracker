import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axiosMiddleware from 'redux-axios-middleware';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import rootReducer from './modules';
import gearTrackerClient from '../clients/gearTracker';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['sessionReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore(initialState) {
  const middlewares = [thunkMiddleware, axiosMiddleware(gearTrackerClient())];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const composedEnhancers = composeEnhancers(...enhancers);

  const store = createStore(persistedReducer, initialState, composedEnhancers);
  const persistor = persistStore(store);
  return { store, persistor };
}
