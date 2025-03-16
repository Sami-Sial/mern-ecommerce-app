import React from "react";
import "./stylesheets/Sidebar.css";
import { Link } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.userSlice);

  return (
    <>
      <div className="sidebar">
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
    </>
  );
};

export default Sidebar;
