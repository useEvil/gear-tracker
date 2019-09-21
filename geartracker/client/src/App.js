import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import { SideNav, Header, Authentication, Bikes, Components } from './components';
import { useDispatch } from 'react-redux';
import { mockBikesFetch } from './state/modules/bike/actions';
import { mockGearsFetch } from './state/modules/gear';

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

const App = () => {
  const [showNav, setShowNav] = useState(false);
  const dispatch = useDispatch();

  dispatch(mockBikesFetch());
  dispatch(mockGearsFetch());
  return (
    <>
      <Header showNav={setShowNav}/>
      <AppContainer>
        <SideNav show={showNav} hideNav={() => setShowNav(false)}/>
        <Content>
          <Switch>
            <Route exact path='/login' component={Authentication} />
            <Route exact path="/" component={Bikes} />
            <Route exact path="/bikes" component={Bikes} />
            <Route exact path="/components" component={Components} />
          </Switch>
        </Content>
      </AppContainer>
    </>
  );
};

export default App;
