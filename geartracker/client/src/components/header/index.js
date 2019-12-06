import React from 'react';
import { Link, withRouter } from 'react-router-dom';
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
import { useDispatch, useSelector } from 'react-redux';
import { clearSession, getUserInfo } from '../../state/modules/session';


const LoggedInView = withRouter(({ history, userInfo }) => {
  const dispatch = useDispatch();
  const logout = () => {
    history.push('/login');
    dispatch(clearSession());
  };

  return (
  <React.Fragment>
    <NavItem>
      <ImageLink to="/profile">
        <img src={ userInfo.imageUrl } alt="" width="40px" />
        { userInfo.name }
      </ImageLink>
    </NavItem>
    <NavItem>
      <StyledLink to="/login" onClick={logout}>
        Log Out
      </StyledLink>
    </NavItem>
  </React.Fragment>
)});

const Header = ({ showNav }) => {
  const userInfo = useSelector(getUserInfo);

  const view = userInfo.id
    ? <LoggedInView userInfo={userInfo} />
    :  <StyledLink to="/login">Log in</StyledLink>;

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
