import uuid from 'uuid';
import { SessionTypes } from '../session/actions';
import { getBikes, getPendingBikes } from './selectors';
import { updateOrReset } from '../../../utils/helpers';
import { getUserInfo } from '../session';

export const BikeTypes = {
  FETCHED_BIKE_LIST: 'FETCHED_BIKE_LIST',
  SELECT_BIKE: 'SELECT_BIKE',
  DISCARD_BIKE_EDITS: 'DISCARD_BIKE_EDITS',
  EDIT_BIKE: 'EDIT_BIKE',
  SAVE_BIKE: 'SAVE_BIKE',
  SAVE_BIKE_SUCCESS: 'SAVE_BIKE_SUCCESS',
};

export const newBike = () => ({
  id: uuid(),
  name: '',
  brand: '',
  model: '',
  distance: 0,
  elevation: 0,
  default: false,
});

export function fetchBikes() {
  return {
    types: [SessionTypes.LOAD, BikeTypes.FETCHED_BIKE_LIST, SessionTypes.CLIENT_ERROR],
    payload: {
      request: {
        url: '/bike/'
      }
    }
  }
}

export function saveBike(bike, method) {
  return async function(dispatch, getState) {
    const state = getState();
    const idMap = {};
    const userInfo = getUserInfo(state);

    if (isNaN(bike.id)) {
      delete bike.id;
      bike.created_by = userInfo.id;
    }

    bike.modified_by = userInfo.id;

    const response = await dispatch({
      types: [BikeTypes.SAVE_BIKE, BikeTypes.SAVE_BIKE_SUCCESS, SessionTypes.CLIENT_ERROR],
      payload: {
        request: {
          method,
          url: `/bike/${method === 'post' ? '' : bike.id + '/'}`,
          data: bike
        }
      }
    });

    if (response.type === BikeTypes.SAVE_BIKE_SUCCESS) {
      if (method === 'post') {
        idMap.initialId = bike.id;
      }
      idMap.id = response.payload.data.id;
      dispatch(discardChanges(bike.id));
    }

    return idMap;
  }
}

export function submitBikeEdits() {
  return async function(dispatch, getState) {
    const state = getState();
    const edits = getPendingBikes(state);

    const savedBikes =
      await Promise.all(
        Object
          .values(edits)
          .map(bike => dispatch(saveBike({...bike}, isNaN(bike.id) ? 'post' : 'put')))
      );
  }
}

export function updateBike(bike = newBike()) {
  return {
    type: BikeTypes.EDIT_BIKE,
    payload: bike,
  }
}

export function editBike(id, field, value) {
  return (dispatch, getState) => {
    const state = getState();
    const bikes = getBikes(state);
    const edits = getPendingBikes(state);

    const { isValidUpdate, updatedItem } =
      updateOrReset(id, field, value, bikes[id], edits[id]);

    if (isValidUpdate) {
      dispatch(updateBike(updatedItem));
    } else {
      dispatch(discardChanges(id));
    }
  }
}

export function selectBike(id) {
  return {
    type: BikeTypes.SELECT_BIKE,
    payload: id,
  }
}

export function discardChanges(id = '') {
  return {
    type: BikeTypes.DISCARD_BIKE_EDITS,
    payload: id,
  }
}
