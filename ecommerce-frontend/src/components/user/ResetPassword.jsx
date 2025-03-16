import React, { Fragment, useState, useEffect } from "react";
import "./stylesheets/ResetPassword.css";
import Loader from "../layout/Loader";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import DashboardTop from "../layout/DashboardTop";
import PageTitle from "../layout/PageTitle";

import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux-toolkit/slices/user.slice";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const dispatch = useDispatch();

  const { error, success, loading } = useSelector((state) => state.userSlice);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    dispatch(resetPassword({ token, password, confirmPassword }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (success) {
      toast.success("Password Updated Successfully");

      navigate("/login");
    }
  }, [dispatch, error, success]);

  return (
    <Fragment>
      <PageTitle title={"Ecommerce - Update Password"} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <main>
            <div className="form">
              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <h2 className="resetPasswordHeading">Update Profile</h2>

                <div className="input-group">
                  <span className="icon-wrapper">
                    {" "}
                    <LockOpenIcon />
                  </span>
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

                <Button type="submit" variant="dark">
                  Reset
                </Button>
              </form>
            </div>
          </main>

          <Footer />
        </>
      )}
    </Fragment>
  );
};

export default ResetPassword;
