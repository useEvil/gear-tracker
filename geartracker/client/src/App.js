import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { SideNav, Header, Authentication, Bikes, Components, AuthCallback } from './components';
import { useSelector } from 'react-redux';
import { getToken } from './state/modules/session';

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

const App = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <>
      <Header showNav={setShowNav}/>
      <AppContainer>
        <SideNav show={showNav} hideNav={() => setShowNav(false)}/>
        <Content>
          <Switch>
            <Route exact path="/auth-callback" component={AuthCallback} />
            <Route exact path='/login' component={Authentication} />
            <PrivateRoute exact path="/" component={Bikes} />
            <PrivateRoute exact path="/bikes" component={Bikes} />
            <PrivateRoute exact path="/components" component={Components} />
          </Switch>
        </Content>
      </AppContainer>
    </>
  );
};

export default App;
