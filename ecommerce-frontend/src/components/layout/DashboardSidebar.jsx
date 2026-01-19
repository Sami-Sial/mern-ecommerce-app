import React from "react";
import "./stylesheets/Sidebar.css";
import { Link, useLocation } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AddBoxIcon from "@mui/icons-material/AddBox";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.userSlice);
  const location = useLocation();

  // Helper function to check if route is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <div className="sidebar">
        {/* ADMIN ONLY SECTIONS */}
        {user?.role === "admin" && (
          <>
            {/* Dashboard */}
            <div
              className={`sidebar-option ${isActive("/admin/dashboard") ? "active" : ""
                }`}
            >
              <DashboardIcon />
              <Link className="link" to={"/admin/dashboard"}>
                Dashboard
              </Link>
            </div>

            <div className="sidebar-divider"></div>

            {/* Profile */}
            <div
              className={`sidebar-option ${isActive("/admin/profile") ? "active" : ""
                }`}
            >
              <AccountBoxIcon />
              <Link className="link" to={"/admin/profile"}>
                Profile
              </Link>
            </div>

            {/* Orders */}
            <div
              className={`sidebar-option ${isActive("/admin/orders") ? "active" : ""
                }`}
            >
              <ListAltIcon />
              <Link className="link" to={"/admin/orders"}>
                Orders
              </Link>
            </div>

            <div className="sidebar-divider"></div>

            {/* Products */}
            <div
              className={`sidebar-option ${isActive("/admin/products") ? "active" : ""
                }`}
            >
              <InventoryIcon />
              <Link className="link" to={"/admin/products"}>
                Products
              </Link>
            </div>

            {/* Create Product */}
            <div
              className={`sidebar-option ${isActive("/admin/product/create") ? "active" : ""
                }`}
            >
              <AddBoxIcon />
              <Link className="link" to={"/admin/product/create"}>
                Create Product
              </Link>
            </div>

            {/* Users */}
            <div
              className={`sidebar-option ${isActive("/admin/users") ? "active" : ""
                }`}
            >
              <PeopleIcon />
              <Link className="link" to={"/admin/users"}>
                Users
              </Link>
            </div>
          </>
        )}

        {/* USER ONLY SECTIONS */}
        {user?.role === "user" && (
          <>
            {/* Profile */}
            <div
              className={`sidebar-option ${isActive("/user/profile") ? "active" : ""
                }`}
            >
              <AccountBoxIcon />
              <Link className="link" to={"/user/profile"}>
                Profile
              </Link>
            </div>

            {/* Orders */}
            <div
              className={`sidebar-option ${isActive("/user/orders") ? "active" : ""
                }`}
            >
              <ListAltIcon />
              <Link className="link" to={"/user/orders"}>
                Orders
              </Link>
            </div>

            <div className="sidebar-divider"></div>

            {/* Cart */}
            <div
              className={`sidebar-option ${isActive("/user/cart") ? "active" : ""
                }`}
            >
              <ShoppingCartIcon />
              <Link className="link" to="/user/cart">
                Cart
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Sidebar;