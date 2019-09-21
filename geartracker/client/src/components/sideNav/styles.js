import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { THEME } from '../../styles';

export const NavHeader = styled.div`
  padding-bottom: 25px;
  display: flex;
  justify-content: flex-end;
  
  > svg {
    font-size: 1.3rem;
    &:hover {
      cursor: pointer;
      color: ${THEME.colors.bluePale};
    }
    
    @media (min-width: 1200px) {
      visibility: hidden;
    }
  }
`;

export const Container = styled.div`
  position: absolute;
  left: 0;
  top: 144px;
  height: 100%;
  width: 20rem;
  padding: 28px 28px 0;
  
  @media (min-width: 1200px) {
    display: block;
    visibility: visible;
  }
  
  @media (max-width: 1199px) {
    transition: all 0.5s ease 0s;
    transform: ${(props) => props.show ? 'none' : 'translate3d(-100%, 0px, 0px)'};
    height: 100vh;
    width: 300px;
    position: absolute;
    top: -116px;
    left: 0;
    z-index: 9999;
    background-color: #22313a;
    box-shadow: 0 0 30px rgba(0,0,0,.5);
    padding-top: 28px;
  }
`;

export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  border-radius: .25rem;
  font-size: .95rem;
  display: flex;
  align-items: center;
  padding: .8rem 1rem .7rem;
  transition: color .3s;
  > svg {
    margin-right: 1rem;
    font-size: 1.1rem;
  }
   
  ${(props) => props.selected
    ? css`
      color: ${THEME.colors.warning};
      background-color: ${THEME.colors.dark};
    `
    : css`
      color: ${THEME.colors.grayLightBlue};
      background-color: transparent;
      &:hover {
        color: ${THEME.colors.bluePale}
      }
    `
  }
`;


