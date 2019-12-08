import DocumentCookie from '../../../utils/documentCookie';
import { fetchBikes } from '../bike';
import { fetchGears, fetchGearTypes } from '../gear';
import { setHeaders } from '../../../clients/gearTracker';

export const SessionTypes = {
  LOAD: 'LOAD',
  CLIENT_ERROR: 'CLIENT_ERROR',
  FETCHED_USER_INFO: 'FETCHED_USER_INFO',
  CLEAR_SESSION: 'CLEAR_SESSION',
};

export function initSession(token) {
  return (dispatch) => {
    setHeaders('Authorization', `Token ${token}`);
    DocumentCookie.setCookie('token', token, 7);

    dispatch(fetchBikes());
    dispatch(fetchGears());
    dispatch(fetchGearTypes());
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
  return { type: SessionTypes.CLEAR_SESSION }
}
