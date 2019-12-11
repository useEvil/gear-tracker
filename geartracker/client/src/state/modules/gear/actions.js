import uuid from 'uuid';
import { SessionTypes } from '../session/actions';
import mockGears from '../../../mockData/gear';
import { getGears, getPendingGears } from './selectors';
import { updateOrReset } from '../../../utils/helpers';

export const GearTypes = {
  FETCHED_GEAR_LIST: 'FETCHED_GEAR_LIST',
  FETCHED_GEAR_TYPES: 'FETCHED_GEAR_TYPES',
  SELECT_GEAR: 'SELECT_GEAR',
  DISCARD_GEAR_EDITS: 'DISCARD_GEAR_EDITS',
  EDIT_GEAR: 'EDIT_GEAR',
};

export const newGear = (bikeId = 0) => ({
  id: uuid(),
  created_date: new Date().toISOString().split('T')[0],
  modified_date: new Date().toISOString().split('T')[0],
  name: '',
  type: '',
  brand: '',
  model: '',
  distance: 0,
  elevation: 0,
  date_installed: new Date().toISOString().split('T')[0],
  date_removed: null,
  created_by: '',
  modified_by: '',
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

export function updateGear(gear, bikeId) {
  if (!gear) {
    gear = newGear(bikeId)
  }

  return {
    type: GearTypes.EDIT_GEAR,
    payload: gear,
  }
}

export function editGear(id, field, value) {
  return (dispatch, getState) => {
    const state = getState();
    const gears = getGears(state);
    const edits = getPendingGears(state);

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

export function discardChanges(id = '') {
  return {
    type: GearTypes.DISCARD_GEAR_EDITS,
    payload: id,
  }
}

export function mockGearsFetch() {
  return {
    type: GearTypes.FETCHED_GEAR_LIST,
    payload: mockGears,
  }
}
