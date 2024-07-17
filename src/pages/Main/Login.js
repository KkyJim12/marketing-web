import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

import {
  Row,
  Col,
  CardBody,
  Card,
  Container,
  Form,
  Input,
  Label,
  Button,
  Alert,
} from "reactstrap";

import { useNavigate } from "react-router-dom";

// Redux
import withRouter from "../../components/Common/withRouter";

// import images
import logo from "../../assets/images/pacy-pilot-main-logo.png";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("authUser") ||
      localStorage.getItem("accessToken")
    ) {
      navigate("/e-commerce");
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [restError, setRestError] = useState("");

  const resetLoginFormError = () => {
    setEmailError("");
    setPasswordError("");
    setRestError("");
  };

  const loginProcess = async (e) => {
    e.preventDefault();
    resetLoginFormError();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/guest/auths/login`,
        { email: email, password: password }
      );

      const data = response.data.data;
      const decodedJWT = jwt_decode(data.accessToken);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("authUser", JSON.stringify(data.user));
      localStorage.setItem("expiresIn", JSON.stringify(decodedJWT.exp));

      navigate("/e-commerce");
    } catch (error) {
      const errors = error.response.data.errors;
      if (error.response.status === 422) {
        errors.map((error) => {
          if (error.key === "email") {
            return setEmailError(error.message);
          } else if (error.key === "password") {
            return setPasswordError(error.message);
          } else {
            return false;
          }
        });
      } else {
        setRestError(error.response.data.message);
      }
    }
  };

  return (
    <>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="d-flex justify-content-center mb-4">
                <img src={logo} alt="" height="40" className="logo logo-dark" />
              </div>
            </Col>
          </Row>
          <Row className="align-items-center justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card>
                <CardBody className="p-4">
                  <div className="text-center mt-2">
                    <h5 style={{ color: "#0D1727" }}>Sign In</h5>
                    <p className="text-muted">
                      Start boosting your campaign performance!
                    </p>
                  </div>
                  <div className="p-2 mt-4">
                    <Form
                      onSubmit={(e) => loginProcess(e)}
                      className="form-horizontal"
                    >
                      {restError && <Alert color="danger">{restError}</Alert>}
                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && (
                          <small className="text-danger">{emailError}</small>
                        )}
                      </div>

                      <div className="mb-2">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Enter Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && (
                          <small className="text-danger">{passwordError}</small>
                        )}
                      </div>

                      <div className="mt-3">
                        <Button
                          className="btn btn-primary w-100 waves-effect waves-light"
                          type="submit"
                        >
                          Sign In
                        </Button>
                      </div>

                      <div className="mt-4 text-center">
                        <p className="mb-0">
                          Contact our team to create a new account{" "}
                        </p>
                      </div>

                      <div className="mt-2 text-center">
                        <p className="mb-0">
                          By signing in, you agree to our{" "}
                          <a
                            href="https://pacymedia.com/terms-pacy-pilot"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Term & Conditions.
                          </a>
                        </p>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  © {new Date().getFullYear()} pacypilot.com by{" "}
                  <a
                    href="https://pacymedia.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Pacy Media.
                  </a>{" "}
                  All rights reserved
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default withRouter(Login);

Login.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  socialLogin: PropTypes.func,
};
