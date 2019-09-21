import styled from 'styled-components';
import { Link } from 'react-router-dom';
import theme from '../../styles/theme';


export const AppHeader = styled.header`
  background-color: ${theme.colors.dark};
  height: 260px;
  transition: top .3s;
  position: relative;
`;

export const Main = styled.div`
  display: flex;
  @media (max-width: 767.98px) {
    padding: 1rem;
  }
  @media (max-width: 1199.98px) and (min-width: 768px) {
    padding: 2rem;
  }
  @media (min-width: 1200px) {
    padding: 3rem;
  }
`;

export const NavToggle = styled.div`
  border-radius: .25rem;
  background-color: ${theme.colors.cyanGrey};
  color: ${theme.colors.bluePale};
  font-size: 1.75rem;
  padding-top: .15rem;
  margin-right: 1.25rem;
  position: relative;
  flex-shrink: 0;
  width: 3.25rem;
  height: 3.25rem;
  display: flex;
  align-items: center;
  justify-content: center;;
  
  &:hover {
    cursor: pointer;
    background-color: ${theme.colors.cyanBlue};
  }
  
  @media (min-width: 1200px) {
     display: none!important;
  }
`;

export const Logo = styled.div`
  flex-shrink: 0;
  padding-right: 2.5rem;
  display: none;
  
  a {
    color: #fff;
    font-weight: 500;
    font-size: 1.65rem;
    line-height: 100%;
  }
  
  a small {
     display: block;
    font-weight: 400;
    font-size: 1.25rem;
    color: ${theme.colors.grayLightBlue};
  }
  
  @media (min-width: 768px) {
    display: block;
  }
`;

export const Nav = styled.ul`
  padding-left: 0;
  list-style: none;
  display: flex;
  margin-left: auto;
  margin-bottom: 0;
  align-items: center;
`;

export const NavItem = styled.li`
  margin-left: 10px;
`;

export const StyledLink = styled(Link)`
  color: ${theme.colors.grayLightBlue};
  
  &:hover {
  color: ${theme.colors.bluePale}
  }
`;

export const ImageLink = styled(StyledLink)`
  display: flex;
  align-items: center;
  img {
    margin-right: 5px
  }
`;
