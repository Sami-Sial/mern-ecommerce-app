import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People"; // Admin - Users
import StoreIcon from "@material-ui/icons/Store";   // Admin - Products
import { toast } from "react-toastify";

import { logout } from "../../redux-toolkit/slices/user.slice";
import { useDispatch, useSelector } from "react-redux";
import "./stylesheets/UserOptions.css";

const UserOptions = ({ user }) => {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const { cartItems } = useSelector((state) => state.userSlice);

  const isAdmin = user?.role === "admin";

  const logoutUser = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    setShowDropdown(false);
  };

  const getUserInitials = () => {
    if (!user?.name) return "U";
    const names = user.name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return user.name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="user-options-wrapper">
      <Dropdown
        show={showDropdown}
        onToggle={(isOpen) => setShowDropdown(isOpen)}
        align="end"
      >
        <Dropdown.Toggle
          className="user-dropdown-toggle"
          id="dropdown-user-menu"
          variant="dark"
        >
          <div className="user-avatar-wrapper">
            {user.avatar?.url ? (
              <img
                className="user-avatar-img"
                src={user.avatar.url}
                alt={user.name}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <div
              className="user-avatar-initials"
              style={{ display: user.avatar?.url ? "none" : "flex" }}
            >
              {getUserInitials()}
            </div>
            <div className="user-status-indicator"></div>
          </div>
          <span className="user-name-text">{user.name}</span>
          <i className="fa-solid fa-chevron-down dropdown-arrow"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu className="user-dropdown-menu">
          {/* User Info Header */}
          <div className="dropdown-user-header">
            <div className="dropdown-user-avatar">
              {user.avatar?.url ? (
                <img src={user.avatar.url} alt={user.name} />
              ) : (
                <div className="dropdown-avatar-initials">
                  {getUserInitials()}
                </div>
              )}
            </div>
            <div className="dropdown-user-info">
              <h6>{user.name}</h6>
              <p>{user.email}</p>
              <span className={`user-role-badge ${isAdmin ? "admin" : "user"}`}>
                {isAdmin ? "Admin" : "User"}
              </span>
            </div>
          </div>

          <Dropdown.Divider />

          {/* Dashboard - Admin only */}
          {isAdmin && (
            <Dropdown.Item as={Link} to="/admin/dashboard" className="dropdown-menu-item">
              <DashboardIcon className="dropdown-icon" />
              <span>Dashboard</span>
            </Dropdown.Item>
          )}
          {/* Profile */}
          <Dropdown.Item as={Link} to={isAdmin ? "/admin/profile" : "/user/profile"} className="dropdown-menu-item">
            <PersonIcon className="dropdown-icon" />
            <span>My Profile</span>
          </Dropdown.Item>

          {/* Regular user items */}
          {!isAdmin && (
            <>
              <Dropdown.Item as={Link} to="/user/orders" className="dropdown-menu-item">
                <ListAltIcon className="dropdown-icon" />
                <span>My Orders</span>
              </Dropdown.Item>

              <Dropdown.Item as={Link} to="/user/cart" className="dropdown-menu-item">
                <ShoppingCartIcon className="dropdown-icon" />
                <span>Cart</span>
                {cartItems.length > 0 && (
                  <span className="cart-badge-dropdown">{cartItems.length}</span>
                )}
              </Dropdown.Item>
            </>
          )}

          {/* Admin management links */}
          {isAdmin && (
            <>
              <Dropdown.Item as={Link} to="/admin/orders" className="dropdown-menu-item">
                <ListAltIcon className="dropdown-icon" />
                <span>Orders</span>
              </Dropdown.Item>

              <Dropdown.Item as={Link} to="/admin/users" className="dropdown-menu-item">
                <PeopleIcon className="dropdown-icon" />
                <span>Users</span>
              </Dropdown.Item>

              <Dropdown.Item as={Link} to="/admin/products" className="dropdown-menu-item">
                <StoreIcon className="dropdown-icon" />
                <span>Products</span>
              </Dropdown.Item>
            </>
          )}

          <Dropdown.Divider />

          {/* Logout */}
          <Dropdown.Item onClick={logoutUser} className="dropdown-menu-item logout-item">
            <ExitToAppIcon className="dropdown-icon" />
            <span>Logout</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default UserOptions;
