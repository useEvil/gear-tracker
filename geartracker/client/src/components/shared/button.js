import styled from 'styled-components';
import { THEME } from '../../styles';

const BaseButton = styled.button`
  width: auto;
  font-weight: 400;
  font-size: 1rem;
  background-color: ${THEME.colors.cyanGreyDark};
  color: ${THEME.colors.bluePale};
  text-align: center;
  vertical-align: middle;
  transition:
    color .15s ease-in-out,
    background-color .15s ease-in-out,
    border-color .15s ease-in-out,
    box-shadow .15s ease-in-out,
    -webkit-box-shadow .15s ease-in-out;

  &:hover {
    background-color: ${THEME.colors.cyanBlueGrey};
  }

  &:focus {
    background-color: ${THEME.colors.cyanBlueGrey};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const StyledButton = styled(BaseButton)`
  width: ${(props) => (props.width || 'auto')};
  height: ${(props) => (props.height || '40px')};
  border-radius: .3rem;
  border: none;
  padding: .5rem 1rem;
  svg {
    margin-right: 5px;
    font-size: .75rem;
  }
  
  .selected {
    background-color: ${THEME.colors.cyanBlueGrey};
  }
`;

export const IconButton = styled(BaseButton)`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 0 0 1px 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  margin: 0;
`;

export const StyledButtonWrapper = styled.div`
  width: max-content;
  height: max-content;
  background-color: ${THEME.colors.cyanGreyDark};
  border: none;
  color: ${(props) => (props.color || THEME.colors.bluePale)};
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:hover {
    background-color: ${THEME.colors.cyanBlueGrey};
    cursor: pointer;
  }

  &:focus {
    background-color: ${THEME.colors.cyanBlueGrey};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
