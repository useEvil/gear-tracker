import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { SideNav, Header, Authentication, Bikes, Components } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { clearSession, fetchUserInfo, getToken, initSession, SessionTypes } from './state/modules/session';
import DocumentCookie from './utils/documentCookie';

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
  const token = useSelector(getToken);
  return (
    <Route
      {...rest}
      render={props =>
        token ? (
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
  const [showNav, setShowNav] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const initApp = async () => {
      const token = DocumentCookie.getCookie('token');
      if (token) {
        await dispatch(initSession(token, true));
        history.push('/');
      } else {
        dispatch(clearSession());
        history.push('/login')
      }
      setLoading(false);
    };
    initApp().catch(e => console.log(e));
  }, [history, dispatch]);

  return (
    <>
      <Header showNav={setShowNav}/>
      <AppContainer>
        <SideNav show={showNav} hideNav={() => setShowNav(false)}/>
        { !loading && (
          <Content>
            <Switch>
              <Route exact path='/login' component={Authentication} />
              <PrivateRoute exact path="/" component={Bikes} />
              <PrivateRoute exact path="/bikes" component={Bikes} />
              <PrivateRoute exact path="/components" component={Components} />
            </Switch>
          </Content>
        )}
      </AppContainer>
    </>
  );
});

export default App;
