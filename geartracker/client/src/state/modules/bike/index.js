import { BikeTypes } from './actions';

export * from './actions';
export * from './selectors';

const initialBikeState = {
  bikes: {},
  edits: {},
  selectedBike: 0,
};

function bikeReducer(state = initialBikeState, { type, payload, meta }) {
  switch(type) {
    case BikeTypes.FETCHED_BIKE_LIST:
      const bikes = {};
      payload.data.forEach(bike => bikes[bike.id] = bike);
      return {
        ...initialBikeState,
        bikes,
      };
    case BikeTypes.EDIT_BIKE:
      return {
        ...state,
        selectedBike: payload.id,
        edits: {
          ...state.edits,
          [payload.id]: payload,
        }
      };
    case BikeTypes.SELECT_BIKE:
      return {
        ...state,
        selectedBike: payload,
      };
    case BikeTypes.SAVE_BIKE_SUCCESS:
      return {
        ...state,
        bikes: {
          ...state.bikes,
          [payload.data.id]: payload.data,
        },
      };
    case BikeTypes.DISCARD_BIKE_EDITS:
      let edits;
      if (payload !== '') {
        edits = { ...state.edits };
        delete edits[payload];
      } else {
        edits = {};
      }
      return {
        ...state,
        edits,
        selectedBike: ''
      };
    default: return state
  }
}

export default bikeReducer;
