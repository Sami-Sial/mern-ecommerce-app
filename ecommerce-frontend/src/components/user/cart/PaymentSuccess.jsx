import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./stylesheets/OrderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import PageTitle from "../../layout/PageTitle";

const PaymentSuccess = () => {
  localStorage.setItem("cartItems", []);

  return (
    <>
      <PageTitle title={"Ecommerce- Payment Success"} />
      <Header />

      <main>
        <div className="orderSuccess">
          <CheckCircleIcon />

          <Typography>
            Payment is successfull and your Order has been Placed successfully{" "}
          </Typography>
          <Link to="/user/orders">View Orders</Link>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default PaymentSuccess;
