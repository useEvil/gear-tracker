import DocumentCookie from '../../../utils/documentCookie';
import { fetchBikes } from '../bike';
import { fetchGears, fetchGearTypes } from '../gear';
import { setHeaders } from '../../../clients/gearTracker';

export const SessionTypes = {
  LOAD: 'LOAD',
  CLIENT_ERROR: 'CLIENT_ERROR',
  FETCHED_USER_INFO: 'FETCHED_USER_INFO',
  CLEAR_SESSION: 'CLEAR_SESSION',
  SET_TOKEN: 'SET_TOKEN',
};

export function initSession(token, fetchUser = false) {
  return async (dispatch) => {
    setHeaders('Authorization', `Token ${token}`);
    DocumentCookie.setCookie('token', token, 7);

    dispatch({
      type: SessionTypes.SET_TOKEN,
      payload: token,
    });

    if (fetchUser) {
      const userResponse = await dispatch(fetchUserInfo());
      if (userResponse.type === SessionTypes.CLEAR_SESSION) {
        return false;
      }
    }

    Promise
      .all([
        dispatch(fetchBikes()),
        dispatch(fetchGears()),
        dispatch(fetchGearTypes()),
      ])
      .then(() => dispatch({ type: SessionTypes.LOAD, payload: false }));

    return true;
  }
}

export function fetchUserInfo() {
  return {
    types: [SessionTypes.LOAD, SessionTypes.FETCHED_USER_INFO, SessionTypes.CLEAR_SESSION],
    payload: {
      request: {
        method: 'get',
        url: '/user/',
      }
    }
  }
}

export function register({ first_name, last_name, email, username, password }) {
  return {
    types: [SessionTypes.LOAD, SessionTypes.FETCHED_USER_INFO, SessionTypes.CLEAR_SESSION],
    payload: {
      request: {
        method: 'post',
        url: '/register/',
        data: {
          first_name,
          last_name,
          email,
          username,
          password,
        }
      }
    }
  }
}

export function login({ username, password }) {
  return {
    types: [SessionTypes.LOAD, SessionTypes.FETCHED_USER_INFO, SessionTypes.CLEAR_SESSION],
    payload: {
      request: {
        method: 'post',
        url: '/login/',
        data: {
          username,
          password,
        }
      }
    }
  }
}

export function clearSession() {
  DocumentCookie.deleteCookie('token');
  setHeaders('Authorization', '');
  return { type: SessionTypes.CLEAR_SESSION }
}
