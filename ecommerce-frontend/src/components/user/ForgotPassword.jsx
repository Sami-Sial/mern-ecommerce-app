import React, { Fragment, useState, useEffect } from "react";
import "./stylesheets/ForgotPassword.css";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { toast } from "react-toastify";
import Button from "react-bootstrap/esm/Button";

import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../redux-toolkit/slices/user.slice";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import PageTitle from "../layout/PageTitle";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const { error, message, loading } = useSelector((state) => state.userSlice);

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, message]);

  return (
    <>
      <PageTitle title={"Ecommerce - Forgot Password"} />
      <Header />

      <main>
        <div className="form">
          <form className="forgotPasswordForm" onSubmit={forgotPasswordSubmit}>
            <h2 className="forgotPasswordHeading">Forgot Password</h2>

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

            <Button
              style={{ width: "fit-content", marginTop: "2rem" }}
              type="submit"
              variant="dark"
            >
              Send
            </Button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ForgotPassword;
