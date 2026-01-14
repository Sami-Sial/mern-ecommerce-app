import { useEffect, useState } from "react";
import "./stylesheets/Header.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import UserOptions from "./UserOptions";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ecommerceLogo from "../../assets/ecommerce-logo.png";
import { Link } from "react-router-dom";

import { loadUser } from "../../redux-toolkit/slices/user.slice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, cartItems } = useSelector((state) => state.userSlice);

  // State for mobile menu and scroll effect
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartPulse, setCartPulse] = useState(false);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Pulse cart icon when items change
  useEffect(() => {
    if (cartItems.length > 0) {
      setCartPulse(true);
      const timer = setTimeout(() => setCartPulse(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cartItems.length]);

  // Close mobile menu when clicking outside or on a link
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        mobileMenuOpen &&
        !e.target.closest("#navbar-middle") &&
        !e.target.closest(".mobile-menu-btn")
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [mobileMenuOpen]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className={isScrolled ? "scrolled" : ""}>
        <div className="header-wrapper">
          {/* Logo Section */}
          <div id="navbar-left" onClick={() => navigate("/")}>
            <img
              src={ecommerceLogo}
              style={{ width: "30px", height: "30px" }}
              alt="Ecommerce Logo"
            />
            <h2>ShopVerse</h2>
          </div>

          {/* Navigation Links */}
          <div
            id="navbar-middle"
            className={mobileMenuOpen ? "mobile-open" : ""}
          >
            <Link
              id="home-link"
              style={{ color: "white", textDecoration: "none" }}
              to={"/"}
              onClick={handleLinkClick}
            >
              <i className="fa-solid fa-house"></i>
              <span>Home</span>
            </Link>
            <Link
              to={"/products"}
              style={{ color: "white", textDecoration: "none" }}
              onClick={handleLinkClick}
            >
              <i className="fa-solid fa-box"></i>
              <span>All Products</span>
            </Link>
            <Link
              to={"/products/search"}
              className="search-link"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
              onClick={handleLinkClick}
            >
              <i className="fa-solid fa-magnifying-glass"></i>
              <span>Search</span>
            </Link>

            {/* Cart in Mobile Menu */}
            <Link
              style={{
                color: "white",
                textDecoration: "none",
              }}
              to="/user/cart"
              onClick={handleLinkClick}
              className="mobile-cart-link"
            >
              <div style={{ position: "relative", display: "inline-flex" }}>
                <ShoppingCartIcon />
                {cartItems.length > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      background: "linear-gradient(135deg, #ff9800, #ff5722)",
                      color: "white",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.7rem",
                      fontWeight: "bold",
                      boxShadow: "0 2px 8px rgba(255, 152, 0, 0.5)",
                    }}
                  >
                    {cartItems.length}
                  </span>
                )}
              </div>
            </Link>
          </div>

          {/* Right Section - Cart & Auth */}
          <div id="navbar-right">
            {/* Mobile Menu Button - Shows below 1100px */}
            <button
              className="mobile-menu-btn"
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>

            {user ? (
              <UserOptions user={user} />
            ) : (
              <div style={{ display: "flex", gap: "15px" }}>
                <Link
                  to={"/login"}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <i className="fa-solid fa-user"></i>
                  <span style={{ marginLeft: "5px" }}>Login</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
