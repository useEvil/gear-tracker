import React, { useState } from 'react';
import styled from 'styled-components';
import { THEME } from '../../styles';

const Input = styled.input`
  font-size: 1rem;
  font-weight: 400;
  border: none;
  background: transparent;
  color: ${THEME.colors.cyanPale};
`;

const TableInput = ({ val, cb }) => {
  const [value, setValue] = useState(val);
  const handleBlur = () => val !== value ? cb(value) : null;
  return (
    <td >
      <Input
        type="text"
        value={value}
        onChange={event => {setValue(event.target.value)}}
        onBlur={handleBlur}
      />
    </td>
  )
};

export default TableInput;
