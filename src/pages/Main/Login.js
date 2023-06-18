import PropTypes from "prop-types";
import React, { useEffect } from "react";

import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap";

// Redux
import { Link } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";

import { useSelector } from "react-redux";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// import images
import logo from "../../assets/images/logo-full.png";
import logolight from "../../assets/images/logo-full.png";

const Login = props => {
  document.title = " Login | Minible - Responsive Bootstrap 5 Admin Dashboard";

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "admin@themesbrand.com" || "",
      password: "123456" || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
  });

  const { error } = useSelector(state => ({
    error: state.Login.error,
  }));

  useEffect(() => {
    document.body.className = "authentication-bg";
    // remove classname when component will unmount
    return function cleanup() {
      document.body.className = "";
    };
  });

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center">
                <Link to="/login" className="mb-5 d-block auth-logo">
                  <img
                    src={logo}
                    alt=""
                    height="22"
                    className="logo logo-dark"
                  />
                  <img
                    src={logolight}
                    alt=""
                    height="22"
                    className="logo logo-light"
                  />
                </Link>
              </div>
            </Col>
          </Row>
          <Row className="align-items-center justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card>
                <CardBody className="p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">Marketing tool platform.</h5>
                    <p className="text-muted">
                      Sign in to continue to Marketing.
                    </p>
                  </div>
                  <div className="p-2 mt-4">
                    <Form
                      className="form-horizontal"
                      onSubmit={e => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      {error ? <Alert color="danger">{error}</Alert> : null}

                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email
                              ? true
                              : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">
                            {validation.errors.email}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <div className="float-end">
                          <Link to="/forgot-password" className="text-muted">
                            Forgot password?
                          </Link>
                        </div>
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          value={validation.values.password || ""}
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.password &&
                            validation.errors.password
                              ? true
                              : false
                          }
                        />
                        {validation.touched.password &&
                        validation.errors.password ? (
                          <FormFeedback type="invalid">
                            {validation.errors.password}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mt-3">
                        <Link
                          to="/e-commerce"
                          className="btn btn-primary w-100 waves-effect waves-light"
                          type="submit"
                        >
                          Log In
                        </Link>
                      </div>

                      <div className="mt-4 text-center">
                        <p className="mb-0">
                          Contact admin to create an account.{" "}
                        </p>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  © {new Date().getFullYear()} Marketing Tool. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger"></i> by
                  Jimmytechnology
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);

Login.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  socialLogin: PropTypes.func,
};
