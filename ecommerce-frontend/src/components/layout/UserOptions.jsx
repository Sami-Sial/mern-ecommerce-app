import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SettingsIcon from "@material-ui/icons/Settings";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { logout } from "../../redux-toolkit/slices/user.slice";
import { useDispatch, useSelector } from "react-redux";
import "./stylesheets/UserOptions.css";

const UserOptions = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);

  const { cartItems } = useSelector((state) => state.userSlice);

  const logoutUser = () => {
    dispatch(logout());
    navigate("/login");
    toast.success("Logged out successfully");
    setShowDropdown(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setShowDropdown(false);
  };

  // Get user initials as fallback
  const getUserInitials = () => {
    if (!user?.name) return "U";
    const names = user.name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return user.name.substring(0, 2).toUpperCase();
  };

  const dashboardPath =
    user.role === "admin" ? "/admin/dashboard" : "/user/dashboard";

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
              <span className="user-role-badge">
                {user.role === "admin" ? "Admin" : "User"}
              </span>
            </div>
          </div>

          <Dropdown.Divider />

          {/* Dashboard */}
          <Dropdown.Item
            onClick={() => handleNavigation(dashboardPath)}
            className="dropdown-menu-item"
          >
            <DashboardIcon className="dropdown-icon" />
            <span>Dashboard</span>
          </Dropdown.Item>

          {/* Profile */}
          <Dropdown.Item
            onClick={() => handleNavigation("/user/profile")}
            className="dropdown-menu-item"
          >
            <PersonIcon className="dropdown-icon" />
            <span>My Profile</span>
          </Dropdown.Item>

          {/* Orders */}
          <Dropdown.Item
            onClick={() => handleNavigation("/user/orders")}
            className="dropdown-menu-item"
          >
            <ListAltIcon className="dropdown-icon" />
            <span>My Orders</span>
          </Dropdown.Item>

          {/* Cart */}
          <Dropdown.Item
            onClick={() => handleNavigation("/user/cart")}
            className="dropdown-menu-item"
          >
            <ShoppingCartIcon className="dropdown-icon" />
            <span>Cart</span>
            {cartItems.length > 0 && (
              <span className="cart-badge-dropdown">{cartItems.length}</span>
            )}
          </Dropdown.Item>

          {/* Settings */}
          <Dropdown.Item
            onClick={() => handleNavigation("/user/settings")}
            className="dropdown-menu-item"
          >
            <SettingsIcon className="dropdown-icon" />
            <span>Settings</span>
          </Dropdown.Item>

          <Dropdown.Divider />

          {/* Logout */}
          <Dropdown.Item
            onClick={logoutUser}
            className="dropdown-menu-item logout-item"
          >
            <ExitToAppIcon className="dropdown-icon" />
            <span>Logout</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default UserOptions;
