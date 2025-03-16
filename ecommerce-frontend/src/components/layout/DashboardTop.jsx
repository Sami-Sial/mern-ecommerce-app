import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/esm/Button";
import { logout } from "../../redux-toolkit/slices/user.slice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DashboardTop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);

  const logoutUser = () => {
    navigate("/login");
    dispatch(logout());

    toast.success("Logout Successfully");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0px 2rem",
          height: "3rem",
          backgroundColor: "#37475a",
          color: "white",
          position: "sticky",
          top: "3.5rem",
          left: "0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <DashboardIcon />
          {user?.role === "admin" ? (
            <h5 style={{ margin: "0" }}>Admin Dashboard</h5>
          ) : (
            <h5 style={{ margin: "0" }}>User Dashboard</h5>
          )}
        </div>
        <Button
          onClick={logoutUser}
          style={{ height: "fit-content" }}
          variant="dark"
        >
          Logout
        </Button>
      </div>
    </>
  );
};

export default DashboardTop;
