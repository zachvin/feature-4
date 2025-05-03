import React from "react";
import { checkUser } from "../../Services/auth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  if (checkUser()) {
    return Component;
  } else {
    // redirects to login instead of just /auth (login page looks more professional)
    return <Navigate to="/auth/login" replace />;
  }
};

export default ProtectedRoute;
