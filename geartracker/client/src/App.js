import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { SideNav, Header, Authentication, Bikes, Components } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { clearSession, fetchUserInfo, gd, getSessionId, mockFetchUserInfo, SessionTypes } from './state/modules/session';
import { fetchBikes } from './state/modules/bike';
import { fetchGears, fetchGearTypes } from './state/modules/gear';
import DocumentCookie from './utils/documentCookie';
import { setHeaders } from './clients/gearTracker';

const AppContainer = styled.div`
  position: relative;
`;

const Content = styled.section`
  margin-top: -144px;
  
  @media (max-width: 767.98px) {
    padding: 0 1rem 2rem;
  }
  @media (max-width: 1199.98px) and (min-width: 768px) {
    padding: 0 2rem 2rem;
  }
  @media (min-width: 1200px) {
    padding: 0 3rem 3rem 20rem;
  }
`;

const PrivateRoute = ({component: Component, ...rest}) => {
  const sessionId = useSelector(getSessionId);
  return (
    <Route
      {...rest}
      render={props =>
        sessionId ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

const App = withRouter(({ history }) => {
  const csrfToken = DocumentCookie.getCookie('csrftoken');
  const sessionid = DocumentCookie.getCookie('sessionid');

  const [showNav, setShowNav] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionid) {
      setHeaders('Authorization', `${csrfToken}`);
      dispatch(gd(SessionTypes.SET_SESSION_ID, sessionid));
      dispatch(fetchBikes());
      dispatch(fetchGears());
      dispatch(fetchGearTypes());
      dispatch(fetchUserInfo());
      dispatch(mockFetchUserInfo());
      history.push('/')
    } else {
      dispatch(clearSession());
      history.push('/login')
    }
  }, [history, dispatch, csrfToken, sessionid]);

  return (
    <>
      <Header showNav={setShowNav}/>
      <AppContainer>
        <SideNav show={showNav} hideNav={() => setShowNav(false)}/>
        <Content>
          <Switch>
            <Route exact path='/login' component={Authentication} />
            <PrivateRoute exact path="/" component={Bikes} />
            <PrivateRoute exact path="/bikes" component={Bikes} />
            <PrivateRoute exact path="/components" component={Components} />
          </Switch>
        </Content>
      </AppContainer>
    </>
  );
});

export default App;
