import React, { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/esm/Button";
import { logout } from "../../redux-toolkit/slices/user.slice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import DashboardSidebar from "./DashboardSidebar";
import { Link } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ListAltIcon from "@mui/icons-material/ListAlt";
import "./stylesheets/DashboardTop.css";

const DashboardTop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const { user } = useSelector((state) => state.userSlice);

  const logoutUser = () => {
    navigate("/login");
    dispatch(logout());

    toast.success("Logout Successfully");
  };

  return (
    <>
      <div className="dashboard-top">
        <Button
          id="menu-icon"
          onClick={() => setOpenDrawer(true)}
          style={{ marginRight: "10px" }}
          variant="dark"
          size="sm"
        >
          <MenuIcon />
        </Button>
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
          size="sm"
        >
          Logout
        </Button>
      </div>

      {/* side drawer */}
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <div style={{ padding: "1rem 1rem 1rem 5px" }}>
          {user?.role === "admin" && (
            <div className="sidebar-option">
              <DashboardIcon />
              <Link
                className="link"
                // to={user.role == "user" ? "/user/dashboard" : "/admin/dashboard"}
                to={"/admin/dashboard"}
              >
                Dashboard
              </Link>
            </div>
          )}

          <div className="sidebar-option">
            <AccountBoxIcon />
            <Link
              className="link"
              to={user.role == "user" ? "/user/profile" : "/admin/profile"}
            >
              Profile
            </Link>
          </div>

          {/* {user.role == "user" && (
          <div className="sidebar-option">
            <FavoriteIcon />
            <Link className="link" to="/user/products/favourite">
              Favourite Products
            </Link>
          </div>
        )} */}

          <div className="sidebar-option">
            <ListAltIcon />
            <Link
              className="link"
              to={user.role == "user" ? "/user/orders" : "/admin/orders"}
            >
              Orders
            </Link>
          </div>

          {user.role == "admin" && (
            <div className="sidebar-option">
              <ListAltIcon />
              <Link className="link" to={"/admin/products"}>
                Products
              </Link>
            </div>
          )}

          {/* {user.role == "admin" && (
          <div className="sidebar-option">
            <ListAltIcon />
            <Link className="link" to={"/admin/featured_products"}>
              Featured Products
            </Link>
          </div>
        )} */}

          {user.role == "admin" && (
            <div className="sidebar-option">
              <ListAltIcon />
              <Link className="link" to={"/admin/product/create"}>
                Create Product
              </Link>
            </div>
          )}

          {user.role == "admin" && (
            <div className="sidebar-option">
              <ListAltIcon />
              <Link className="link" to={"/admin/users"}>
                Users
              </Link>
            </div>
          )}

          {user.role == "user" && (
            <div className="sidebar-option">
              <ShoppingCartIcon />
              <Link className="link" to="/user/cart">
                Cart
              </Link>
            </div>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default DashboardTop;
