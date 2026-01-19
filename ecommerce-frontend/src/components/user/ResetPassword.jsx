import React, { Fragment, useState, useEffect } from "react";
import "./stylesheets/ResetPassword.css";
import Loader from "../layout/Loader";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import PageTitle from "../layout/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux-toolkit/slices/user.slice";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const dispatch = useDispatch();

  const { resetPasswordError, success, isLoading } = useSelector((state) => state.userSlice);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    // ✅ Validation
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    dispatch(resetPassword({ token, password, confirmPassword }));
  };

  useEffect(() => {
    if (resetPasswordError) {
      toast.error(resetPasswordError);
    }

    if (success) {
      toast.success("Password Updated Successfully");
      navigate("/login");
    }
  }, [resetPasswordError, success, navigate]);

  return (
    <Fragment>
      <PageTitle title={"Ecommerce - Reset Password"} />
      <Header />
      <main id="reset-password-main">
        <div id="reset-password-container">
          <form id="reset-password-form" onSubmit={resetPasswordSubmit}>
            <h2 id="reset-password-heading">Reset Password</h2>

            <p id="reset-password-description">
              Enter your new password below. Make sure it's strong and secure.
            </p>

            <div id="reset-password-input-group-1">
              <span id="reset-password-icon-1">
                <LockOpenIcon />
              </span>
              <input
                id="reset-password-new"
                type="password"
                placeholder="New Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div id="reset-password-input-group-2">
              <span id="reset-password-icon-2">
                <LockIcon />
              </span>
              <input
                id="reset-password-confirm"
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <Button
              id="reset-password-submit"
              type="submit"
              variant="dark"
              disabled={isLoading}
            >
              {isLoading ? "Resetting Password..." : "Reset Password"}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </Fragment>
  );
};

export default ResetPassword;
