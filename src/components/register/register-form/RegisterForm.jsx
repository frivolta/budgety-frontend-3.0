/** @format */

import React from 'react';

import { Formik } from 'formik';

import { Button, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Row, Col } from 'reactstrap';
import { SignupSchema } from '../../../utils/validation/validationSchemas.yup';

class RegisterForm extends React.Component {
  /**
   * Async
   * @function handleSignup
   */
  handleSignUp = async ({ email, password }) => {
    try {
      console.log(`Registering with ${email} and ${password}`);
    } catch (error) {
      alert(error);
    }
  };
  render() {
    return (
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={SignupSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await this.handleSignUp(values);
          setSubmitting(false);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form role="form" onSubmit={handleSubmit} noValidate>
            <FormGroup className="EmailFormGroup">
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-email-83" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Email"
                  type="email"
                  name="email"
                  data-test="email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  touched={touched.email}
                  invalid={errors.email}
                />
              </InputGroup>
              {errors.email && touched.email && <small className="error-message">{errors.email}</small>}
            </FormGroup>
            <FormGroup className="PasswordFormGroup">
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Password"
                  data-test="password"
                  type="password"
                  name="password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  touched={touched.password}
                  invalid={errors.password}
                />
              </InputGroup>
              {errors.password && touched.password && <small className="error-message">{errors.password}</small>}
            </FormGroup>
            <FormGroup className="ConfirmPasswordFormGroup">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Re-type password"
                  type="password"
                  name="confirmPassword"
                  data-test="confirmPassword"
                  value={values.confirmPassword}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  touched={touched.confirmPassword}
                  invalid={errors.confirmPassword}
                />
              </InputGroup>
              {errors.confirmPassword && touched.confirmPassword && (
                <small className="error-message">{errors.confirmPassword}</small>
              )}
            </FormGroup>
            <div className="text-muted font-italic">
              <small>
                password strength: <span className="text-success font-weight-700">strong</span>
              </small>
            </div>
            <Row className="my-4">
              <Col xs="12">
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input className="custom-control-input" id="customCheckRegister" type="checkbox" />
                  <label className="custom-control-label" htmlFor="customCheckRegister">
                    <span className="text-muted">
                      I agree with the{' '}
                      <a href="/privacy-policy" onClick={(e) => e.preventDefault()}>
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                </div>
              </Col>
            </Row>
            <div className="text-center">
              <Button className="mt-4" color="primary" type="submit" disabled={isSubmitting}>
                Create account
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    );
  }
}

export default RegisterForm;
