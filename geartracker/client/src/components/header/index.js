import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Main,
  AppHeader,
  StyledLink,
  NavItem,
  ImageLink,
  NavToggle,
  Logo,
  Nav,
} from './styles';

const LoggedOutView = () => (
  <StyledLink to="/login">
    Log in
  </StyledLink>
);

const LoggedInView = ({ session }) => (
  <React.Fragment>
    <NavItem>
      <ImageLink to="/profile">
        <img src={ session.imageUrl } alt="" width="40px" />
        { session.name }
      </ImageLink>
    </NavItem>
    <NavItem>
      <StyledLink to="/login" onClick={session.clearSession}>
        Log Out
      </StyledLink>
    </NavItem>
  </React.Fragment>
);

const Header = ({ showNav, session }) => {
  session = {
    id: ''
  }
  const view = session.id
    ? <LoggedInView session={session} />
    : <LoggedOutView />;

  return (
    <AppHeader>
      <Main>
        <NavToggle onClick={() => showNav(true)}>
          <FontAwesomeIcon icon="bars" />
        </NavToggle>
        <Logo>
          <Link to="/">Gear Tracker<small>Ride More</small></Link>
        </Logo>

        <Nav>
          { view }
        </Nav>
      </Main>
    </AppHeader>
  );
};

export default Header;
