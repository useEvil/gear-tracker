import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, List, NavHeader, StyledLink } from './styles';
import { withRouter } from 'react-router';
import { useSelector } from 'react-redux';
import { getUserInfo } from '../../state/modules/session';

const SideNav = withRouter(({ show, hideNav, location }) => {
  const { id } = useSelector(getUserInfo);

  const path = location.pathname;
  return (
    <Container show={show}>
      <NavHeader>
        <FontAwesomeIcon onClick={hideNav} icon="times"/>
      </NavHeader>
      <List>
        {
          !!id && (
            <li>
              <StyledLink to="/bikes" selected={path === "/bikes" || path === "/"}>
                <FontAwesomeIcon icon="bicycle"/> Bikes
              </StyledLink>
            </li>
          )
        }
        {
          !!id && (
            <li>
              <StyledLink to="/components" selected={path === "/components"}>
                <FontAwesomeIcon icon="cogs"/> Components
              </StyledLink>
            </li>
          )
        }
      </List>
    </Container>
  )
});

export default SideNav;
