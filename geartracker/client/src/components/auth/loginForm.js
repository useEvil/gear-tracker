import React from 'react';
import { Formik } from 'formik';
import { StyledButton, StyledInput } from '../shared';
import { StyledForm, Error } from './styles';

const LoginForm = ({ view, submit }) => {
  const formValidation = (values) => {
    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
    const errors = {};

    if (!values.email) {
      errors.email = 'Email Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Password Required';
    } else if (!passwordRegex.test(values.password)) {
      errors.password = 'Invalid Password';
    }

    if (view === 'Sign Up') {
      if(!values.name) {
        errors.name = 'Name Required';
      }
    } else {
      delete errors.name;
    }

    return errors;
  };

  const onSubmit = (values, { setSubmitting }) => {
    // setSubmitting(true);
    submit(values, view === 'Sign Up');
  };

  return (
    <Formik
      initialValues={{ email: '', password: '', name: '' }}
      validate={formValidation}
      onSubmit={onSubmit}
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
            {
              <StyledInput
                autocomplete="false"
                placeholder="Username"
                type="name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
            }
            <Error> {touched.name && errors.name} </Error>
          </>
          }
          <StyledInput
            placeholder="Email"
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          <Error> {touched.email && errors.email} </Error>
          <StyledInput
            placeholder="Password"
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
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
