import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { SideNav, Header, Authentication, Bikes, Components, UserProfile } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { clearSession, getToken, initSession } from './state/modules/session';
import DocumentCookie from './utils/documentCookie';

const Content = styled.section`
  margin-top: 85px;
  min-width: fit-content;
  
  @media (max-width: 767.98px) {
    padding: 0 1rem 2rem;
  }
  @media (max-width: 1199.98px) and (min-width: 768px) {
    padding: 0 2rem 2rem;
  }
  @media (min-width: 1200px) {
    margin-top: 144px;
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

const App = () => {
  const [showNav, setShowNav] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const initApp = async () => {
      const token = DocumentCookie.getCookie('token');

      if (token) {
         await dispatch(initSession(token, true));
      } else {
        dispatch(clearSession());
      }
      setLoading(false);
    };
    initApp().catch(console.log);
  }, [dispatch]);

  return (
    <>
      <Header showNav={setShowNav}/>
      <>
        <SideNav show={showNav} hideNav={() => setShowNav(false)}/>
        { loading ? <div>Loading...</div> : (
          <Content>
            <Switch>
              <Route exact path='/login' component={Authentication} />
              <PrivateRoute exact path="/" component={Bikes} />
              <PrivateRoute exact path="/bikes" component={Bikes} />
              <PrivateRoute exact path="/components" component={Components} />
              <PrivateRoute exact path="/profile" component={UserProfile} />
            </Switch>
          </Content>
        )}
      </>
    </>
  );
};

export default App;
