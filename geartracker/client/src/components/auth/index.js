import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { withRouter } from 'react-router-dom';
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
import { useDispatch } from 'react-redux';
import { initSession, login, register, SessionTypes } from '../../state/modules/session';


const Authentication = withRouter(({ history }) => {
  const [view, setView] = useState('Login');
  const dispatch = useDispatch();

  const submit = async (values, { setSubmitting }) => {
    let res = await dispatch(view === 'Login' ? login(values) : register(values));
    if (res.type === SessionTypes.FETCHED_USER_INFO) {
      dispatch(initSession(res.payload.data.token));
      history.push('/');
    } else {
      setSubmitting(false);
    }
  };

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
          <LoginForm view={view} submit={submit}/>
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

});

export default Authentication;
