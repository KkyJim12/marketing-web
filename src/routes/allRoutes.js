import React from "react";
import { Navigate } from "react-router-dom";

// Main
import ECommerce from "../pages/Main/E-Commerce/index";
import MyProduct from "../pages/Main/My-Product/index";
import Manage from "../pages/Main/My-Product/manage";
import OrderHistory from "../pages/Main/Order-History/index";
import Info from "../pages/Main/Info/index";

// Authentication related pages
import Login from "../pages/Main/Login";
import ForgetPwd from "../pages/Main/ForgetPassword";

const userRoutes = [
  { path: "/e-commerce", component: <ECommerce /> },
  { path: "/my-product", component: <MyProduct /> },
  { path: "/my-product/:id/manage", component: <Manage /> },
  { path: "/order-history", component: <OrderHistory /> },
  { path: "/info/:id", component: <Info /> },
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  { path: "*", component: <Navigate to="/login" /> },
];

const authRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
];

export { userRoutes, authRoutes };
