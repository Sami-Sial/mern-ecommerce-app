import React, { Fragment, useState, useEffect } from "react";
import "./stylesheets/UpdatePassword.css";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

import { useDispatch, useSelector } from "react-redux";
import {
  clearUserState,
  updatePassword,
} from "../../redux-toolkit/slices/user.slice";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import PageTitle from "../layout/PageTitle";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, passwordUpdateSuccess, isLoading } = useSelector(
    (state) => state.userSlice
  );

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all the fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New & confirm password are not matching");
      return;
    }

    dispatch(updatePassword({ oldPassword, newPassword, confirmPassword }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (passwordUpdateSuccess) {
      dispatch(clearUserState());
      toast.success("Password Updated Successfully");
      navigate("/user/profile");
    }
  }, [dispatch, error, passwordUpdateSuccess, navigate]);

  return (
    <>
      <PageTitle title={"Ecommerce - Update Password"} />
      <Header />

      <main>
        <div className="wrapper">
          <div className="form">
            <div className="updatePasswordForm">
              <h2>Update Password</h2>

              {/* Old Password Input */}
              <div className="input-group">
                <span className="icon-wrapper">
                  <VpnKeyIcon style={{ fontSize: '1.3rem' }} />
                </span>
                <input
                  type="password"
                  placeholder="Enter old password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="password-input"
                />
              </div>

              {/* New Password Input */}
              <div className="input-group">
                <span className="icon-wrapper">
                  <LockOpenIcon style={{ fontSize: '1.3rem' }} />
                </span>
                <input
                  type="password"
                  placeholder="Enter new password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="password-input"
                />
              </div>

              {/* Confirm Password Input */}
              <div className="input-group">
                <span className="icon-wrapper">
                  <LockIcon style={{ fontSize: '1.3rem' }} />
                </span>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="password-input"
                />
              </div>

              {/* Password Requirements */}
              <div className="password-hint">
                <p>Password must be at least 8 characters long</p>
              </div>

              {/* Submit Button */}
              <button
                onClick={updatePasswordSubmit}
                className="form-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default UpdatePassword;