import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, List, NavHeader, StyledLink } from './styles';

const SideNav = ({ show, hideNav, session, router}) => {
  session = {
    id: 1
  }
  router = {
    location: {
      pathname: '/bikes'
    }
  }
  const path = router.location.pathname;
  return (
    <Container show={show}>
      <NavHeader>
        <FontAwesomeIcon onClick={hideNav} icon="times"/>
      </NavHeader>
      <List>
        {
          !!session.id && (
            <li>
              <StyledLink to="/bikes" selected={path === "/bikes"}>
                <FontAwesomeIcon icon="bicycle"/> Bikes
              </StyledLink>
            </li>
          )
        }
        {
          !!session.id && (
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
};

export default SideNav;
