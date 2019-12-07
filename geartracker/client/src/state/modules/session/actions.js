import DocumentCookie from '../../../utils/documentCookie';

export const SessionTypes = {
  LOAD: 'LOAD',
  CLIENT_ERROR: 'CLIENT_ERROR',
  SET_SESSION_ID: 'SET_SESSION_ID',
  FETCHED_USER_INFO: 'FETCHED_USER_INFO',
  CLEAR_SESSION: 'CLEAR_SESSION',
};

export function gd(type, payload) {
  return { type, payload }
}

export function fetchUserInfo() {
  return { type: 'A'}
}

export function clearSession() {
  DocumentCookie.deleteCookie('sessionid');
  return { type: SessionTypes.CLEAR_SESSION }
}

export function mockFetchUserInfo() {
  return {
    type: SessionTypes.FETCHED_USER_INFO,
    payload: {
      data: {
        email: 'nesheiwat.rakan@gmail.com',
        id: 1,
        imageUrl: 'https://lh3.googleusercontent.com/-OIqUlE5LWZM/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfdo-zY86932B7KCcHZlBhCTpCC2Q.CMID/s32-c/photo.jpg',
        name: 'Ricky Nesh',
        firstName: 'Ricky',
        lastName: 'Nesh',
      }
    }
  }
}
