import React from "react";
import { useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";
const Authmiddleware = props => {
  const navigate = useNavigate();
  if (
    !localStorage.getItem("authUser") ||
    !localStorage.getItem("accessToken")
  ) {
    navigate("/login");
  }
  return <React.Fragment>{props.children}</React.Fragment>;
};

export default Authmiddleware;
