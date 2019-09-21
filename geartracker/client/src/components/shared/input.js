import styled from 'styled-components';
import { THEME } from '../../styles';

export const StyledInput = styled.input`
  padding: .5rem 1rem;
  font-size: 1rem;
  font-weight: 400;
  width: 100%;
  height: 40px;
  line-height: 1.25;
  color: ${THEME.colors.cyanPale};
  background-color: transparent;
  background-image: none;
  border: 1px solid ${THEME.colors.grayBlue};
  border-radius: .25rem;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
  
  &:focus {
  border-color: ${THEME.colors.cyanBlueDark}; 
  }
  
  &::placeholder {
  color: ${THEME.colors.grayLightBlue};
  opacity: 1;
  }
`;
