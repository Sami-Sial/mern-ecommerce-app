import { useEffect, useState } from "react";
import "./stylesheets/Header.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import UserOptions from "./UserOptions";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ecommerceLogo from "../../assets/ecommerce-logo.png";
import { Link } from "react-router-dom";

import { loadUser } from "../../redux-toolkit/slices/user.slice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, cartItems } = useSelector((state) => state.userSlice);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <>
      <header>
        <div id="navbar-left" onClick={() => navigate("/")}>
          {/* <img src={} height={30} width={40} alt="" /> */}
          <h2 onClick={() => navigate("/")}>Ecommerce</h2>
        </div>

        <div id="navbar-middle">
          <Link style={{ color: "white", textDecoration: "none" }} to={"/"}>
            Home
          </Link>
          <Link
            to={"/products"}
            style={{ color: "white", textDecoration: "none" }}
          >
            All Products
          </Link>
          <Link
            to={"/products/search"}
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Button variant="dark">
              Search
              <i
                style={{ marginLeft: "5px" }}
                className="fa-solid fa-magnifying-glass"
              ></i>
            </Button>
          </Link>
        </div>

        <div id="navbar-right">
          <Link
            style={{
              color: "white",
              textDecoration: "none",
            }}
            to="/user/cart"
          >
            <ShoppingCartIcon />
            <p style={{ display: "inline", margin: "0" }}>
              Cart({cartItems.length})
            </p>
          </Link>

          {user ? (
            <UserOptions user={user} />
          ) : (
            <div style={{ display: "flex", gap: "15px" }}>
              <Link
                to={"/login"}
                style={{ color: "white", textDecoration: "none" }}
              >
                Login
              </Link>
              <Link
                to={"/signup"}
                style={{ color: "white", textDecoration: "none" }}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
