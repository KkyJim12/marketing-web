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
import FloatingActionButton from "../pages/Main/FloatingActionButton";
import Icon from "../pages/Main/Icon";

const userRoutes = [
  { path: "/e-commerce", component: <ECommerce /> },
  { path: "/my-product", component: <MyProduct /> },
  { path: "/my-product/:id/manage/:productId", component: <Manage /> },
  { path: "/order-history", component: <OrderHistory /> },
  { path: "/info/:name/:id", component: <Info /> },
  { path: "*", component: <Navigate to="/login" /> },
];

const authRoutes = [
  { path: "/", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  {
    path: "/floating-action-button/:id/:productId",
    component: <FloatingActionButton />,
  },
];

const publicRoutes = [{ path: "/icons/:name/:color/:backgroundColor/:size", component: <Icon /> }];

export { userRoutes, authRoutes, publicRoutes };
