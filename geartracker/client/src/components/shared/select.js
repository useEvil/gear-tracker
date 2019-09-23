import React from 'react';
import styled from 'styled-components';
import { THEME } from '../../styles';

const Select = styled.select`
  font-size: 1rem;
  font-weight: 400;
  border: none;
  background: transparent;
  color: ${THEME.colors.cyanPale};
`;

const TableSelect = ({ val, cb, options }) => {
  return (
    <td>
      <Select value={val} onChange={(event) => {cb(event.target.value)}}>
        {options.map(options => <option key={options[0]} value={options[0]}>{options[1]}</option>)}
      </Select>
    </td>
  )
};

export default TableSelect;
