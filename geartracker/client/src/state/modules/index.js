import { combineReducers } from 'redux';
import bikeReducer from './bike';
import gearReducer from './gear';
import sessionReducer, { SessionTypes } from './session';

const gearTracker = combineReducers({
  bikeReducer,
  gearReducer,
  sessionReducer,
});

const rootReducer = (state, action) => {
  if (action.type === SessionTypes.CLEAR_SESSION) {
    state = undefined;
  }
  return gearTracker(state, action);
};

export default rootReducer;
