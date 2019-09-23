import { GearTypes} from './actions';

export * from './actions';
export * from './selectors';

const initialGearState = {
  gearTypes: [],
  gears: {},
  edits: {},
  selectedGear: '',
};

function gearReducer(state = initialGearState, { type, payload }) {
  switch(type) {
    case GearTypes.FETCHED_GEAR_LIST:
      const gears = {};
      payload.data.forEach(gear => gears[gear.id] = gear);
      return {
        ...state,
        gears,
        edits: {},
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
    case GearTypes.DISCARD_GEAR_EDITS:
      let edits;
      if (!!payload) {
        edits = { ...state.edits };
        delete edits[payload];
      } else {
        edits = {};
      }
      return {
        ...state,
        edits,
        selectedGear: ''
      };
    default: return state
  }
}

export default gearReducer;
