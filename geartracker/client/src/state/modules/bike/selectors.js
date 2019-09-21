const namespace = 'bikeReducer';
const select = (state) => state[namespace];

export const getBikes = (state) => {
  return select(state).bikes;
};

export const getBikesList = (state) => {
  return Array.from(Object.values(getBikes(state)))
};

export const getPendingBikes = (state) => {
  return select(state).edits;
};

export const getNewBikesList = (state) => {
  return Array.from(Object.values(getPendingBikes(state))).filter(bike => isNaN(bike.id));
};

export const getSelectedBikeId = (state) => select(state).selectedBike || 0;

export const getSelectedBikeById = (state, bikeId) => {
  const pendingBike = getPendingBikes(state)[bikeId];
  const bike = getBikes(state)[bikeId];
  return pendingBike || bike;
};

export const getSelectedBike = (state) => getSelectedBikeById(state, getSelectedBikeId(state));

export const getCombinedBikeList = (state) => [
  ...getBikesList(state).map((bike) => getPendingBikes(state)[bike.id] || bike),
  ...getNewBikesList(state),
];
