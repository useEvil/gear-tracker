import { SessionTypes } from './actions';

export * from './actions';
export * from './selectors';

const initialSessionState = {
  email: '',
  id: 0,
  imageUrl: '',
  name: '',
  firstName: '',
  lastName: '',
  token: '',
};

function sessionReducer(state = initialSessionState, { type, payload, error, meta }) {
  switch(type) {
    case SessionTypes.CLIENT_ERROR:
      alert(`Error: ${error.message}`);
      console.error(meta);
      return state;
    case SessionTypes.SET_TOKEN:
      return {
        ...state,
        token: payload,
      };
    case SessionTypes.FETCHED_USER_INFO:
      return {
        ...state,
        ...payload.data,
      };
    default: return state;
  }
}

export default sessionReducer;
