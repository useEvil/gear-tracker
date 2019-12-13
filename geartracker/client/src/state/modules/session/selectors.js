const namespace = 'sessionReducer';
const select = (state) => state[namespace];

export const getToken = (state) => select(state).token;
export const getUserInfo = (state) => select(state).user;
export const isLoading = (state) => select(state).loading;