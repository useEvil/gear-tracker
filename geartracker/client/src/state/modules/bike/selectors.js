const namespace = 'bikeReducer';
const select = (state) => state[namespace];

export const getBikes = (state) => select(state).bikes;

export const getBikesList = (state) => Array.from(Object.values(getBikes(state)));

export const getPendingBikes = (state) => select(state).edits;

export const getNewBikesList = (state) =>
  Array.from(Object.values(getPendingBikes(state))).filter(bike => isNaN(bike.id));

export const getSelectedBikeId = (state) => select(state).selectedBike || 0;

export const getSelectedBikeById = (state, bikeId) => {
  const pendingBike = getPendingBikes(state)[bikeId];
  const bike = getBikes(state)[bikeId];
  return pendingBike || bike;
};

export const getSelectedBike = (state) => getSelectedBikeById(state, getSelectedBikeId(state));

export const getDeletedBikes = (state) => select(state).deletes;

export const getCombinedBikeList = (state) => [
  ...getBikesList(state).map((bike) => getPendingBikes(state)[bike.id] || bike),
  ...getNewBikesList(state),
];

export const getBikeDropdownList = (state) =>
  [ ...getCombinedBikeList(state).map(bike => ([bike.id,bike.name])), ['', '']];
