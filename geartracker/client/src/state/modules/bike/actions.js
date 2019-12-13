import uuid from 'uuid';
import { SessionTypes } from '../session/actions';
import { getBikes, getDeletedBikes, getPendingBikes } from './selectors';
import { updateOrReset } from '../../../utils/helpers';
import { getUserInfo } from '../session';

export const BikeTypes = {
  FETCHED_BIKE_LIST: 'FETCHED_BIKE_LIST',
  SELECT_BIKE: 'SELECT_BIKE',
  DISCARD_BIKE_EDITS: 'DISCARD_BIKE_EDITS',
  EDIT_BIKE: 'EDIT_BIKE',
  SAVE_BIKE: 'SAVE_BIKE',
  DELETE_BIKE: 'DELETE_BIKE',
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

    bike.modified_by = userInfo.id;

    if (method === 'post') {
      idMap.initialId = bike.id;
      bike.created_by = userInfo.id;
      delete bike.id;
    }

    const response = await dispatch({
      types: [BikeTypes.SAVE_BIKE, BikeTypes.SAVE_BIKE_SUCCESS, SessionTypes.CLIENT_ERROR],
      payload: {
        request: {
          method,
          url: `/bike/${method === 'post' ? '' : bike.id + '/'}`,
          data: method === 'delete' ? {} : bike
        }
      }
    });

    if (response.type === BikeTypes.SAVE_BIKE_SUCCESS) {
      idMap.id = bike.id || response.payload.data.id;
      dispatch(
        discardChanges((bike.id || idMap.initialId), method === 'delete'),
      );
      return idMap;
    }

    return { initialId: '', id: '' };
  }
}

export function submitBikeEdits() {
  return async function(dispatch, getState) {
    const state = getState();
    const edits = getPendingBikes(state);
    const deletes = getDeletedBikes(state);
    const bikes = getBikes(state);

    dispatch({ type: SessionTypes.LOAD, payload: true });
    // Get saved bikes that have been marked for deletion
    const deletedBikes =
      await Promise.all(
        Object
          .values(bikes)
          .filter(bike => deletes[bike.id])
          .map(bike => dispatch(saveBike({...bike}, 'delete'))),
      );

    // Get get edits(new bikes and edited saved bikes) that haven't been marked for deletion
    const savedBikes =
      await Promise.all(
        Object
          .values(edits)
          .filter(bike => !deletes[bike.id])
          .map(bike => dispatch(saveBike({...bike}, isNaN(bike.id) ? 'post' : 'put')))
      );

    // Get edits (new bikes only) that have been marked for deletion to clear up
    const discardedNewBikes =
      Object
        .values(edits)
        .filter(bike => deletes[bike.id] && isNaN(bike.id))
        .map(bike => {
          dispatch(discardChanges(bike.id));
        });

    console.log('DELETED BIKES: ', deletedBikes);
    console.log('SAVED BIKES: ', savedBikes);
    console.log('DISCARDED EDITS: ', discardedNewBikes);

    dispatch({ type: SessionTypes.LOAD, payload: false });
  }
}

export function updateBike(bike = newBike()) {
  return {
    type: BikeTypes.EDIT_BIKE,
    payload: bike,
  }
}

export function deleteBike(id) {
  return {
    type: BikeTypes.DELETE_BIKE,
    payload: id,
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

export function discardChanges(id = '', deleted = false) {
  return {
    type: BikeTypes.DISCARD_BIKE_EDITS,
    payload: { id, deleted },
  }
}
