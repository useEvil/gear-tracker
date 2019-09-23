import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { StyledButton, IconButton } from '../shared';
import {
  Container,
  ViewWrapper,
  ButtonWrapper,
  InputContainer,
  ThirdPartyWrapper,
} from './styles';
import LoginForm from './loginForm';
import theme from '../../styles/theme';

const Authentication = () => {
  const [view, setView] = useState('Login');

  return (
    <Container>
      <h4>This is the mission statement.</h4>
      <InputContainer>
        <ButtonWrapper>
          <StyledButton onClick={() => setView('Sign Up')}>
            Sign Up
          </StyledButton>
          <StyledButton onClick={() => setView('Login')}>
            Login
          </StyledButton>
        </ButtonWrapper>
        <ViewWrapper>
          <LoginForm view={view} submit={() => console.log('submitted')}/>
          <ThirdPartyWrapper>
            <IconButton onClick={() => {
              window.open('https://gear-tracker.mobilebikeservices.com/oauth/login/google-oauth2/', '_self');
            }}>
              <FontAwesomeIcon icon={['fab', 'google']} color={theme.colors.orangeGoogle}/>
            </IconButton>
            <IconButton onClick={() => {
              window.open('https://gear-tracker.mobilebikeservices.com/oauth/login/facebook/', '_self');
            }}>
              <FontAwesomeIcon icon={['fab', 'facebook']} color={theme.colors.blueFacebook}/>
            </IconButton>
          </ThirdPartyWrapper>
        </ViewWrapper>
      </InputContainer>
    </Container>
  )

};

export { default as AuthCallback } from './authCallback';
export default Authentication;
