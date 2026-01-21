import React, { useState } from "react";
import "./stylesheets/ConfirmOrder.css";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import { Link } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../redux-toolkit/slices/order.slice.jsx";
import PageTitle from "../../layout/PageTitle";

const ConfirmOrder = () => {
  const dispatch = useDispatch();
  const { user, shippingInfo, cartItems } = useSelector(
    (state) => state.userSlice
  );

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const tax = 0;
  const shippingCharges = 0;
  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = async () => {
    try {
      setIsProcessingPayment(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/process/payment`,
        {
          cartItems,
          userId: user._id,
          shippingInfo,
          prices: {
            itemsPrice: subtotal,
            taxPrice: tax,
            shippingPrice: shippingCharges,
            totalPrice,
          },
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      console.error(error);
      setIsProcessingPayment(false);
    }
  };

  return (
    <>
      <PageTitle title={"Ecommerce - Confirm Order"} />
      <Header />

      <main>
        <CheckoutSteps activeStep={1} />
        <div className="wrapper">
          <div className="left-section">
            <h4>Your Cart Items</h4>

            <table className="cart-table">
              <tbody>
                {cartItems &&
                  cartItems.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <img
                          className="cart-item-image"
                          src={item.images[0]?.url}
                          alt="Product"
                        />
                        <Link
                          className="cart-item-link"
                          to={`/product/${item.product}`}
                        >
                          {item.name}
                        </Link>
                      </td>
                      <td>
                        <span>
                          {item.quantity} × ₹{item.price}
                        </span>
                      </td>
                      <td>₹{Math.round(item.quantity * item.price)}</td>
                    </tr>
                  ))}
              </tbody>

              <tfoot>
                <tr>
                  <th>Total</th>
                  <th></th>
                  <th>
                    ₹
                    {Math.round(
                      cartItems.reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
                    )}
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="right-section">
            <div className="shipping-info">
              <h4>Shipping Info</h4>
              <div>
                <p>Name</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address</p>
                <span>{address}</span>
              </div>

              <div className="order-summary">
                <h4>Order Summary</h4>

                <table className="summary-table">
                  <tbody>
                    <tr>
                      <td>Subtotal</td>
                      <td>₹{Math.round(subtotal)}</td>
                    </tr>
                    <tr>
                      <td>Shipping Charges</td>
                      <td>₹{shippingCharges}</td>
                    </tr>
                    <tr>
                      <td>GST</td>
                      <td>₹{tax}</td>
                    </tr>
                  </tbody>

                  <tfoot>
                    <tr>
                      <th>Total</th>
                      <th>₹{Math.round(totalPrice)}</th>
                    </tr>
                  </tfoot>
                </table>
                <button
                  className="payment-button"
                  onClick={proceedToPayment}
                  disabled={isProcessingPayment}
                  style={{
                    opacity: isProcessingPayment ? 0.5 : 1,
                    cursor: isProcessingPayment ? "not-allowed" : "pointer",
                  }}
                >
                  {isProcessingPayment
                    ? "Preparing Payment..."
                    : "Proceed to Payment"}
                </button>
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
