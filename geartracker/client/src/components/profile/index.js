import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { Card, CardBody, StyledInput } from '../shared';
import { getUserInfo } from '../../state/modules/session';

const StyledForm = styled(Form)`
  display: flex;
  flex-wrap: wrap;
  
  > input {
    margin: .75rem;
  }
  
  > button {
    margin-top: .75rem;
  }
`;

const UserProfile = () => {
  const { username, first_name, last_name, email } = useSelector(getUserInfo);
  const handleSubmit = () => {};
  const formValidation = (values) => {

  };

  return (
    <Card>
      <CardBody>
        <Formik
          initialValues={{username, first_name, last_name, email }}
          render={({values, errors, touched, handleChange, handleBlur, isSubmitting}) => (
            <StyledForm>
              <StyledInput
                placeholder="Username"
                type="name"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
              <StyledInput
                placeholder="First Name"
                type="name"
                name="first_name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.first_name}
              />
              <StyledInput
                placeholder="Last Name"
                type="name"
                name="last_name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.last_name}
              />
              <StyledInput
                placeholder="Email"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </StyledForm>
          )}/>
      </CardBody>
    </Card>
  )
};

export default UserProfile;
