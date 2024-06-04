import React from "react";
import { useAuth } from "./AuthContext";
import { Outlet, Navigate } from "react-router-dom";

interface PrivateRouteProps {
  roles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ roles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signin" />;
  }
  if (roles && !roles.includes(user.roles[0])) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default PrivateRoute;
