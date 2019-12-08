import React from 'react';
import { Formik } from 'formik';
import { StyledButton, StyledInput } from '../shared';
import { StyledForm, Error } from './styles';

const LoginForm = ({ view, submit }) => {
  const formValidation = (values) => {
    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
    const errors = {};

    if(!values.username) {
      errors.username = 'username Required';
    }

    if (!values.password) {
      errors.password = 'Password Required';
    }
    // else if (!passwordRegex.test(values.password)) {
    //   errors.password = 'Invalid Password';
    // }

    delete errors.email;
    delete errors.firstName;
    delete errors.last_name;

    if (view === 'Sign Up') {
      if (!values.email) {
        errors.email = 'Email Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      if(!values.first_name) {
        errors.first_name = 'First Name Required';
      }
      if(!values.last_name) {
        errors.last_name = 'Last Name Required';
      }
    }
    return errors;
  };

  return (
    <Formik
      initialValues={{ email: '', password: '', username: '', first_name: '', last_name: '' }}
      validate={formValidation}
      onSubmit={submit}
    >
      {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
        }) => (
        <StyledForm>
          { view === 'Sign Up' &&
          <>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '.75rem'}}>
              <StyledInput
                  width="48%"
                  placeholder="First Name"
                  type="name"
                  name="first_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.first_name}
              />
              <StyledInput
                  width="48%"
                  placeholder="Last Name"
                  type="name"
                  name="last_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.last_name}
              />
            </div>
            <StyledInput
                placeholder="Email"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
            />
          </>
          }
          <StyledInput
              autocomplete="false"
              placeholder="Username"
              type="name"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
          />
          <StyledInput
            placeholder="Password"
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          <Error> {touched.first_name && errors.first_name} </Error>
          <Error> {touched.last_name && errors.last_name} </Error>
          <Error> {touched.email && errors.email} </Error>
          <Error> {touched.username && errors.username} </Error>
          <Error> {touched.password && errors.password} </Error>
          <StyledButton type="submit">
            {view}
          </StyledButton>
        </StyledForm>
      )}
    </Formik>
  );
};

export default LoginForm;
