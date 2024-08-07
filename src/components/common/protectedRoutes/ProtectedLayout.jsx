import  useIsLoggedIn  from "../../../hooks/useLoggedIn";
import { Navigate,Outlet } from "react-router-dom";
import React from "react";

const ProtectedLayout = () => {
  const isAuthenticated = useIsLoggedIn();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedLayout;