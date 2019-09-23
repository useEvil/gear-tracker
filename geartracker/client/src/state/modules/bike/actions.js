import uuid from 'uuid';
import { SessionTypes } from '../session/actions';
import { getBikes, getPendingBikes } from './selectors';
import mockBikes from '../../../mockData/bikes';
import { updateOrReset } from '../../../utils/helpers';

export const BikeTypes = {
  FETCHED_BIKE_LIST: 'FETCHED_BIKE_LIST',
  SELECT_BIKE: 'SELECT_BIKE',
  DISCARD_BIKE_EDITS: 'DISCARD_BIKE_EDITS',
  EDIT_BIKE: 'EDIT_BIKE',
};

export const newBike = () => ({
  id: uuid(),
  created_date: new Date().toISOString().split('T')[0],
  modified_date: new Date().toISOString().split('T')[0],
  name: '',
  brand: '',
  model: '',
  distance: 0,
  elevation: 0,
});

export function fetchBikes() {
  return {
    types: [SessionTypes.LOAD, BikeTypes.FETCHED_BIKE_LIST, SessionTypes.CLIENT_ERROR],
    payload: {
      request: {
        url: '/bike'
      }
    }
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

export function mockBikesFetch() {
  return {
    type: BikeTypes.FETCHED_BIKE_LIST,
    payload: { data: mockBikes },
  }
}


