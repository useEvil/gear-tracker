import styled from 'styled-components';
import { THEME } from '../../styles';

export const Table = styled.table`
  width: 100%;
  color: ${THEME.colors.cyanPale};
  border-collapse: collapse;
  
  thead > tr > th {
    border-bottom: 0;
  }
  
  th {
    font-weight: 400;
    color: ${THEME.colors.bluePale}
  }
  
  thead th {
    vertical-align: bottom;
    border-bottom: 2px solid ${THEME.colors.cyanGreyDark};
  }
  
  td, th {
    padding: 1rem 1.5rem;
    vertical-align: center;
    border-top: 1px solid ${THEME.colors.cyanGreyDark};
    outline: none;
  }
  
  tbody tr {
    &:hover {
      color: ${THEME.colors.cyanPale};
      background-color: ${THEME.colors.cyanGreyDark};
      cursor: pointer;
    }
    
    &.selected {
      background-color: ${THEME.colors.cyanDark};
      border-color: ${THEME.colors.cyanGrey};
    }
  }
  
  tfoot td {
    border: none;
    padding: 10px 0 0 ;
  }
`;
