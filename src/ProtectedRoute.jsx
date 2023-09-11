import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const existingUserDetails =
    JSON.parse(localStorage.getItem("userDetails")) || [];

  const { status } = useSelector((state) => state.auth);
  let location = useLocation();

  if (
    status?.status !== "success" &&
    existingUserDetails?.status !== "success"
  ) {
    // console.log(" access to the protected route");
    // console.log(status?.status);

    return <Navigate to="/log-in" state={{ from: location }} replace />;
  } else {
    // console.log("Allowing access to the protected route");

    return children;
  }
};

export default ProtectedRoute;
