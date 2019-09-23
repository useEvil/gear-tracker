import React from 'react';
import { withRouter } from 'react-router';
import { useDispatch } from 'react-redux';
import DocumentCookie from '../../utils/documentCookie';
import { clearSession, gd, SessionTypes } from '../../state/modules/session/actions';
import { setHeaders } from '../../clients/gearTracker';

const AuthCallback = withRouter(({ history }) => {
  DocumentCookie.setCookie('csrftoken', 'aNStlpThCLgK1IG92iCSdnnwYDL3ig1lsJjDyzVY8EJLEhEnTU4Dlk7PFgoSq0NC', 1);

  const dispatch = useDispatch();
  const csrftoken = DocumentCookie.getCookie('csrftoken');
  if (csrftoken) {
    setHeaders('Authorization', `${csrftoken}`);
    dispatch(gd(SessionTypes.SET_TOKEN, csrftoken));
    history.push('/')
  } else {
    dispatch(clearSession());
    history.push('/login')
  }
  return <div>Loading</div>
});

export default AuthCallback;
