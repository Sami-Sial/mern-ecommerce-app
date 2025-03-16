import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectAdminRoute = (props) => {
  const { user } = useSelector((state) => state.userSlice);

  // useEffect(() => {
  //   if (!user) {
  //     toast.error("Please login to this resource");
  //   }
  // }, []);

  return user && user.role === "admin" ? (
    <>{props.children}</>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default ProtectAdminRoute;
