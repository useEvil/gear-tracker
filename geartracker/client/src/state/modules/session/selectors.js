const namespace = 'sessionReducer';
const select = (state) => state[namespace];

export const getToken = (state) => select(state).token;
export const getUserInfo = (state) => select(state).user;
