import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RouteGuard = ({ children }) => {
  const { token } = useSelector((store) => store.authSlice);

  if (token) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default RouteGuard;
