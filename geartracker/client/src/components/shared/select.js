import React from 'react';
import styled from 'styled-components';
import { THEME } from '../../styles';
import selectCaretSvg from '../../assets/selectCaret.svg';

const Select = styled.select`
  appearance: none;
  font-size: 1rem;
  font-weight: 400;
  border: none;
  background: transparent;
  color: ${THEME.colors.cyanPale};
  padding-right: 1.5rem;
  background: url(${selectCaretSvg}) no-repeat bottom 5px right 5px;
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
