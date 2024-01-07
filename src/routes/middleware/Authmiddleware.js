import React from "react";
import { useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";
const Authmiddleware = (props) => {
  const navigate = useNavigate();

  const payload = localStorage.getItem("accessToken").split(".")[1];
  const decoded = atob(payload);
  const expTime = JSON.parse(decoded).exp;
  const now = new Date();

  if (
    !localStorage.getItem("authUser") ||
    !localStorage.getItem("accessToken") ||
    now > expTime
  ) {
    navigate("/login");
  }
  return <React.Fragment>{props.children}</React.Fragment>;
};

export default Authmiddleware;
