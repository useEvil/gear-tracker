import styled from 'styled-components';
import { Form } from 'formik';
import theme from '../../styles/theme';
import { Card } from '../../components/shared';

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
`;

export const InputContainer = styled(Card)`
  width: 320px;
  height: 500px;
  margin: 20px;
`;

export const ViewWrapper = styled.div`
  height: 90%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  
  > div, form {
    width: 80%;
  }
`;

export const ButtonWrapper = styled.div`
  height: 10%;
  > button {
    border-radius: 0;
    width: 50%;
    height: 100%;
    
    &:first-child {
      border-top-left-radius: .5rem;
    }
    
    &:last-child {
      border-top-right-radius: .5rem;
    }
  }
`;

export const ThirdPartyWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  > button {
    > svg {
      font-size: 2rem;
    }
  }
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  > input {
    margin: .75rem;
  }
  > button {
    margin-top: .75rem;
  }
`;

export const Error = styled.div`
  color: ${theme.colors.danger};
`;
