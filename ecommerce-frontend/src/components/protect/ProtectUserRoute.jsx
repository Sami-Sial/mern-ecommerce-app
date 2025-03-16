import React from "react";
import { useSelector } from "react-redux";
import Login from "../user/Login";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const ProtectUserRoute = (props) => {
  const { user } = useSelector((state) => state.userSlice);

  // useEffect(() => {
  //   if (!user) {
  //     toast.error("Please login to this resource");
  //   }
  // }, [user]);

  return user && user.role === "user" ? (
    <>{props.children}</>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default ProtectUserRoute;
