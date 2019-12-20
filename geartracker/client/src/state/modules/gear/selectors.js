const namespace = 'gearReducer';
const select = (state) => state[namespace];

export const getGearTypes = (state) => select(state).gearTypes;

export const getGears = (state) => select(state).gears;

export const getGearsList = (state) => Array.from(Object.values(getGears(state)));

export const getPendingGears = (state) => select(state).edits;

export const getNewGearsList = (state) =>
  Array.from(Object.values(getPendingGears(state))).filter(gear => isNaN(gear.id));

export const getSelectedGearId = (state) => select(state).selectedGear || 0;

export const getGearById = (state, gearId) => {
  const pendingGear = getPendingGears(state)[gearId];
  const gear = getGears(state)[gearId];
  return pendingGear || gear;
};

export const getSelectedGear = (state) => getGearById(state, getSelectedGearId(state));

export const getDeletedGears = (state) => select(state).deletes;

export const getCombinedGearList = (state) => [
  ...getGearsList(state).map(gear => getPendingGears(state)[gear.id] || gear),
  ...getNewGearsList(state),
];

export const getGearListForBike = (state, bikeId) =>
  getCombinedGearList(state).filter(gear => bikeId === gear.bike);

export const getAvailableGear = (state) =>
  getCombinedGearList(state).filter(gear => !gear.bike);



