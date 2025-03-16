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
import DashboardTop from "../layout/DashboardTop";
import PageTitle from "../layout/PageTitle";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, passwordUpdateSuccess, loading } = useSelector(
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
      toast.success("Profile Updated Successfully");
      navigate("/user/profile");
    }
  }, [dispatch, error, passwordUpdateSuccess]);

  return (
    <>
      <PageTitle title={"Ecommrece - Update Profile"} />
      <Header />

      <main>
        <div className="form">
          <form onSubmit={updatePasswordSubmit}>
            <h2>Update Profile</h2>

            <div className="input-group">
              <span className="icon-wrapper">
                <VpnKeyIcon />
              </span>
              <input
                type="password"
                placeholder="Old Password"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="input-group">
              <span className="icon-wrapper">
                <LockOpenIcon />
              </span>
              <input
                type="password"
                placeholder="New Password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="input-group">
              <span className="icon-wrapper">
                <LockIcon />
              </span>
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <Button type="submit" style={{ marginTop: "1rem" }} variant="dark">
              Update
            </Button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default UpdatePassword;
