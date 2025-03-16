import React from "react";
import "./stylesheets/ConfirmOrder.css";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import image from "../../../assets/herosection_img2.jpg";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../redux-toolkit/slices/order.slice.jsx";
import PageTitle from "../../layout/PageTitle";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, shippingInfo, cartItems } = useSelector(
    (state) => state.userSlice
  );

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  // const shippingCharges = subtotal > 1000 ? 0 : 200;
  // const tax = subtotal * 0.18;
  const tax = 0;
  const shippingCharges = 0;
  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51QfZq5E07PLtCzrjGDAxiS2pFWF1xiXyDp7Kev1wxhZH1QBtjw95ka8l7ohf16sMzhtBkgVWM3OIv46HOXMW6cYH001QWeFYIS"
    );
    const products = cartItems;
    const { data } = await axios.post(
      "/api/v1/process/payment",
      [...products],
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const session = data;
    console.log(data);

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
      return;
    }

    // place order
    const orderItems = cartItems.map((item) => {
      return { ...item, product: item._id, image: item.images[0] };
    });
    const order = {
      shippingInfo,
      paymentInfo: { id: session.id, status: "paid" },
      orderItems: orderItems,
      itemsPrice: subtotal,
      taxPrice: tax,
      shippingPrice: shippingCharges,
      totalPrice: totalPrice,
    };

    dispatch(createOrder(order));
  };

  return (
    <>
      <PageTitle title={"Ecommerce- Confirm Order"} />
      <Header />

      <main style={{ overflowY: "scroll", maxHeight: "calc(100vh - 4rem)" }}>
        <CheckoutSteps activeStep={1} />
        <div className="content-wrapper">
          <div className="left-section">
            <h4>Your Cart Items:</h4>

            <div>
              <Table>
                <tbody>
                  {cartItems &&
                    cartItems.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <img
                            style={{
                              borderRadius: "5px",
                              marginRight: "10px",
                            }}
                            width={30}
                            height={30}
                            src={item.images[0]?.url}
                            alt="Product"
                          />

                          <Link
                            style={{
                              color: "black",
                              textDecoration: "none",
                            }}
                            to={`/product/${item.product}`}
                          >
                            {item.name}
                          </Link>
                        </td>

                        <td>
                          <span>{Math.round(item.quantity * item.price)}</span>
                        </td>

                        <td>
                          <b>₹{Math.round(item.quantity * item.price)}</b>
                        </td>
                      </tr>
                    ))}
                </tbody>

                <tfoot>
                  <th>Total</th>
                  <th></th>
                  <th>
                    <p>{`₹${Math.round(
                      cartItems.reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
                    )}`}</p>
                  </th>
                </tfoot>
              </Table>
            </div>
          </div>

          <div className="right-section">
            <div className="shipping-info">
              <h4>Shipping Info</h4>
              <div>
                <p>Name: {user.name}</p>
              </div>

              <div>
                <p>Phone: {shippingInfo.phoneNo}</p>
              </div>

              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>

              <div className="order-summary">
                <h4>Order Summary</h4>

                <Table>
                  <tbody>
                    <tr>
                      <td>Subtotal</td>
                      <td>&#x24;{Math.round(subtotal)}</td>
                    </tr>

                    <tr>
                      <td>Shipping Charges</td>
                      <td>&#x24;{shippingCharges}</td>
                    </tr>

                    <tr>
                      <td>GST</td>
                      <td>&#x24;{tax}</td>
                    </tr>
                  </tbody>

                  <tfoot>
                    <tr>
                      <th>Total</th>
                      <th>&#x24;{Math.round(totalPrice)}</th>
                    </tr>
                  </tfoot>
                </Table>

                <Button onClick={proceedToPayment} variant="danger">
                  Proceed to Payment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ConfirmOrder;
