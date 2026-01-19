import React, { useState, useEffect } from "react";
import "./stylesheets/ForgotPassword.css"; // New separate CSS file
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearUserState } from "../../redux-toolkit/slices/user.slice";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import PageTitle from "../layout/PageTitle";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const { mailError, message, isLoading } = useSelector((state) => state.userSlice);

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {

    if (mailError) toast.error(mailError);
    if (message) toast.success(message);
  }, [mailError, message]);

  return (
    <>
      <PageTitle title={"Ecommerce - Forgot Password"} />
      <Header />

      <main id="forgot-password-main">
        <div id="forgot-password-container">
          <form id="forgot-password-form" onSubmit={forgotPasswordSubmit}>
            <h2 id="forgot-password-heading">Forgot Password</h2>

            {/* Description Text */}
            <p id="forgot-password-description">
              Enter your registered email address and we'll send you a secure link
              to reset your password.
              <br />
              If the email is registered, the reset link will arrive shortly.
            </p>

            {/* Email Input */}
            <div id="forgot-password-input-group">
              <span id="forgot-password-icon">
                <MailOutlineIcon />
              </span>
              <input
                id="forgot-password-email"
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
              id="forgot-password-submit"
              type="submit"
              variant="dark"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>

            {/* Back to Login */}
            <p id="forgot-password-back">
              <Link id="forgot-password-link" to="/login">
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