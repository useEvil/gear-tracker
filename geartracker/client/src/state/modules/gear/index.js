import { GearTypes} from './actions';

export * from './actions';
export * from './selectors';

const initialGearState = {
  gearTypes: [],
  gears: {},
  edits: {},
  deletes: {},
  selectedGear: 0,
};

function gearReducer(state = initialGearState, { type, payload }) {
  let newEdits;
  let newDeletes;
  let newGears;

  switch(type) {
    case GearTypes.FETCHED_GEAR_LIST:
      const gears = {};
      payload.data.forEach(gear => gears[gear.id] = gear);
      return {
        ...state,
        gears,
        edits: {},
        deletes: {},
        selectedGear: '',
      };
    case GearTypes.FETCHED_GEAR_TYPES:
      return {
        ...state,
        gearTypes: payload.data,
      };
    case GearTypes.EDIT_GEAR:
      return {
        ...state,
        selectedGear: payload.id,
        edits: {
          ...state.edits,
          [payload.id]: payload,
        }
      };
    case GearTypes.SELECT_GEAR:
      return {
        ...state,
        selectedGear: payload,
      };
    case GearTypes.SAVE_GEAR_SUCCESS:
      if (!payload.data) {
        return state;
      }
      return {
        ...state,
        gears: {
          ...state.gears,
          [payload.data.id]: payload.data,
        }
      };
    case GearTypes.DELETE_GEAR:
      newDeletes = { ...state.deletes };
      if(newDeletes[payload]) {
        delete newDeletes[payload];
      } else {
        newDeletes[payload] = true;
      }

      return {
        ...state,
        deletes: newDeletes,
      };
    case GearTypes.DISCARD_GEAR_EDITS:
      newGears = { ...state.gears };
      if (payload.id !== '') {
        newEdits = { ...state.edits };
        newDeletes = { ...state.deletes };
        delete newDeletes[payload.id];
        delete newEdits[payload.id];
        if (payload.deleted) {
          delete newGears[payload.id];
        }
      } else {
        newEdits = {};
        newDeletes = {};
      }
      return {
        ...state,
        gears: newGears,
        edits: newEdits,
        deletes: newDeletes,
        selectedGear: 0
      };
    default: return state
  }
}

export default gearReducer;
