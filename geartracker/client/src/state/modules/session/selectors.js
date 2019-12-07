const namespace = 'sessionReducer';
const select = (state) => state[namespace];

export const getSessionId = (state) => select(state).sessionId;

export const getUserInfo = (state) => {
  const session = select(state);
  return {
    email: session.email,
    id: session.id,
    imageUrl: session.imageUrl,
    firstName: session.firstName,
    lastName: session.last,
    name: session.name,
  }
};
