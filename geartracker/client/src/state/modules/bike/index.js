import { BikeTypes } from './actions';

export * from './actions';
export * from './selectors';

const initialBikeState = {
  bikes: {},
  edits: {},
  deletes: {},
  selectedBike: 0,
};

function bikeReducer(state = initialBikeState, { type, payload, meta }) {
  let newEdits;
  let newDeletes;
  let newBikes;

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
      if (!payload.data) {
        return state;
      }
      return {
        ...state,
        bikes: {
          ...state.bikes,
          [payload.data.id]: payload.data,
        },
      };
    case BikeTypes.DELETE_BIKE:
      newDeletes = { ...state.deletes};
      if (newDeletes[payload]) {
        delete newDeletes[payload]
      } else {
        newDeletes[payload] = true;
      }
      return {
        ...state,
        deletes: newDeletes
      };
    case BikeTypes.DISCARD_BIKE_EDITS:
      newBikes = { ...state.bikes };
      if (payload.id !== '') {
        newEdits = { ...state.edits };
        newDeletes = { ...state.deletes };
        delete newDeletes[payload.id];
        delete newEdits[payload.id];
        if (payload.deleted) {
          delete newBikes[payload.id];
        }
      } else {
        newEdits = {};
        newDeletes = {};
      }
      return {
        ...state,
        bikes: newBikes,
        edits: newEdits,
        deletes: newDeletes,
        selectedBike: 0,
      };
    default: return state
  }
}

export default bikeReducer;
