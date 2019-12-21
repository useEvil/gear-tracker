import uuid from 'uuid';
import { SessionTypes } from '../session/actions';
import { getDeletedGears, getGearListForBike, getGears, getPendingGears } from './selectors';
import { updateOrReset } from '../../../utils/helpers';
import { getUserInfo } from '../session';

export const GearTypes = {
  FETCHED_GEAR_LIST: 'FETCHED_GEAR_LIST',
  FETCHED_GEAR_TYPES: 'FETCHED_GEAR_TYPES',
  SELECT_GEAR: 'SELECT_GEAR',
  DISCARD_GEAR_EDITS: 'DISCARD_GEAR_EDITS',
  EDIT_GEAR: 'EDIT_GEAR',
  SAVE_GEAR: 'SAVE_GEAR',
  DELETE_GEAR: 'DELETE_GEAR',
  SAVE_GEAR_SUCCESS: 'SAVE_GEAR_SUCCESS',
};

export const newGear = (bikeId = null) => ({
  id: uuid(),
  name: '',
  type: 'frame',
  brand: '',
  model: '',
  distance: 0,
  elevation: 0,
  date_installed: new Date().toISOString().split('T')[0],
  bike: bikeId,
});

export function fetchGears() {
  return {
    types: [SessionTypes.LOAD, GearTypes.FETCHED_GEAR_LIST, SessionTypes.CLIENT_ERROR],
    payload: {
      request: {
        url: '/gear/'
      }
    }
  }
}

export function fetchGearTypes() {
  return {
    types: [SessionTypes.LOAD, GearTypes.FETCHED_GEAR_TYPES, SessionTypes.CLIENT_ERROR],
    payload: {
      request: {
        url: '/gear/gear_types/'
      }
    }
  }
}

export function saveGear(gear, method) {
  return async function(dispatch, getState) {
    const state = getState();
    const initialId = gear.id;
    const userInfo = getUserInfo(state);

    gear.modified_by = userInfo.id;
    if (method === 'post') {
      gear.created_by = userInfo.id;
      delete gear.id;
    }

    const response = await dispatch({
      types: [GearTypes.SAVE_GEAR, GearTypes.SAVE_GEAR_SUCCESS, SessionTypes.CLIENT_ERROR],
      payload: {
        request: {
          method,
          url: `/gear/${method === 'post' ? '' : gear.id + '/'}`,
          data: method === 'delete' ? {} : gear,
        }
      },
    });

    if (response.type === GearTypes.SAVE_GEAR_SUCCESS) {
      dispatch(discardChanges(initialId, method === 'delete'));
    }
  }
}

export function unlinkGears(bikeId) {
  return function(dispatch, getState) {
    const state = getState();
    const bikeGears = getGearListForBike(state, bikeId);

    bikeGears.forEach(gear => dispatch(editGear(gear.id, 'bike', '')));
  }
}

export function submitGearEdits(idMap = {}) {
  return async function(dispatch, getState) {
    const state = getState();
    const edits = getPendingGears(state);
    const deletes = getDeletedGears(state);
    const gears = getGears(state);
    let requiresBikeSave = false;

    dispatch({ type: SessionTypes.LOAD, payload: true });

    // get existing gears and delete those marked for deletion
    // get new or existing gears (marked for edits), which aren't marked for deletion and submit
    // * note, for new gears, make sure the parent bike is saved before submitting the post
    await Promise.all(
      [
        ...Object
          .values(gears)
          .filter(gear => deletes[gear.id])
          .map(gear => dispatch(saveGear({...gear}, 'delete'))),
        ...Object
          .values(edits)
          .filter(gear => {
            if (deletes[gear.id]) return false; // skip bikes getting deleted
            if (!isNaN(gear.id)) return true; // id is a number therefore it's an existing gear
            if (!!gear.bike && isNaN(gear.bike)) {
              if (!idMap[gear.bike]) {
                requiresBikeSave = true;
                return false;
              } else {
                gear.bike = idMap[gear.bike];
              }
            }
            return true;
          })
          .map(gear => dispatch(saveGear({...gear}, isNaN(gear.id) ? 'post' : 'put'))),
        ]
    );

    if (requiresBikeSave) {
      alert('Some gears require associated bike to be saved first');
    }

    Object
      .values(edits)
      .filter(gear => deletes[gear.id] && isNaN(gear.id))
      .map(gear => dispatch(discardChanges(gear.id)));

    dispatch({ type: SessionTypes.LOAD, payload: false });
  }
}

export function updateGear(gear, bikeId) {
  if (!gear) {
    gear = newGear(bikeId)
  }

  return {
    type: GearTypes.EDIT_GEAR,
    payload: gear,
  }
}

export function deleteGear(id) {
  return {
    type: GearTypes.DELETE_GEAR,
    payload: id,
  }
}

export function editGear(id, field, value) {
  return (dispatch, getState) => {
    const state = getState();
    const gears = getGears(state);
    const edits = getPendingGears(state);

    value = field === 'bike' ? (parseInt(value) || null): value;
    const { isValidUpdate, updatedItem } =
      updateOrReset(id, field, value, gears[id], edits[id]);

    if (isValidUpdate) {
      dispatch(updateGear(updatedItem));
    } else {
      dispatch(discardChanges(id));
    }
  }
}

export function selectGear(id) {
  return {
    type: GearTypes.SELECT_GEAR,
    payload: id,
  }
}

export function discardChanges(id = '', deleted = false) {
  return {
    type: GearTypes.DISCARD_GEAR_EDITS,
    payload: { id, deleted },
  }
}
