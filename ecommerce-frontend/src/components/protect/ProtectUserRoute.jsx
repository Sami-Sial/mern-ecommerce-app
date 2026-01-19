import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import SessionLoader from "../layout/SessionLoader";

const ProtectUserRoute = ({ children }) => {
  const { user, isLoading, isAuthenticated } = useSelector((state) => state.userSlice);
  console.log(isLoading);
  //  Auth resolving
  if (isAuthenticated === null) {
    return <SessionLoader />;
  }

  //  Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Wrong role
  if (user.role !== "user") {
    return <Navigate to="/login" replace />;
  }

  // ✅ Authorized
  return children;
};

export default ProtectUserRoute;
