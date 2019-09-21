import { combineReducers } from 'redux';
import bikeReducer from './bike';
import gearReducer from './gear';
import sessionReducer from './session';

const gearTracker = combineReducers({
  bikeReducer,
  gearReducer,
  sessionReducer,
});

export default gearTracker;
