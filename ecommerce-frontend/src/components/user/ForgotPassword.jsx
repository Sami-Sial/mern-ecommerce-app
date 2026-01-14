import React, { useState, useEffect } from "react";
import "./stylesheets/LoginSignUp.css"; // Reuse the login CSS for consistent dark theme
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../redux-toolkit/slices/user.slice";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import PageTitle from "../layout/PageTitle";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const { error, message, loading } = useSelector((state) => state.userSlice);

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) toast.error(error);
    if (message) toast.success(message);
  }, [error, message]);

  return (
    <>
      <PageTitle title={"Ecommerce - Forgot Password"} />
      <Header />

      <main>
        <div className="form">
          <form className="forgotPasswordForm" onSubmit={forgotPasswordSubmit}>
            <h2 className="forgotPasswordHeading">Forgot Password</h2>

            {/* Description Text */}
            <p
              style={{
                color: "#aaa",
                fontSize: "0.9rem",
                textAlign: "center",
                marginBottom: "1.5rem",
                lineHeight: "1.5",
              }}
            >
              Enter your registered email address and we’ll send you a secure link
              to reset your password.
              <br />
              If the email is registered, the reset link will arrive shortly.
            </p>

            {/* Email Input */}
            <div className="input-group">
              <span className="icon-wrapper">
                <MailOutlineIcon />
              </span>
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <Button
              style={{ width: "100%", marginTop: "1rem" }}
              type="submit"
              variant="dark"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>

            {/* Back to Login */}
            <p
              style={{
                marginTop: "1.5rem",
                textAlign: "center",
                fontSize: "0.9rem",
              }}
            >
              <Link
                to="/login"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                ← Back to Login
              </Link>
            </p>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ForgotPassword;
