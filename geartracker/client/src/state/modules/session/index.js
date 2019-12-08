import { SessionTypes } from './actions';

export * from './actions';
export * from './selectors';

const initialSessionState = {
  user: {
    id: 0,
    last_login: null,
    is_superuser: false,
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    is_staff: false,
    is_active: false,
    date_joined: '',
    groups: [],
    user_permissions: [],
    imageUrl: '',
  },
  token: '',
};

function sessionReducer(state = initialSessionState, { type, payload, error, meta }) {
  switch(type) {
    case SessionTypes.CLIENT_ERROR:
      // alert(`Error: ${error.message}`);
      console.error(meta, error);
      return state;
    case SessionTypes.FETCHED_USER_INFO:
      return {
        ...state,
        user: {
          ...state.user,
          ...payload.data.user,
        },
        token: payload.data.token
      };
    default: return state;
  }
}

export default sessionReducer;
