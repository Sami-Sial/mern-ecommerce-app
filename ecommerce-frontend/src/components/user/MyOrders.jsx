import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Button from "react-bootstrap/esm/Button";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import PageTitle from "../layout/PageTitle";
import "./stylesheets/UserOrders.css";
import {
  myOrders,
  getOrderDetails,
} from "../../redux-toolkit/slices/order.slice";
import { useNavigate } from "react-router-dom";
import TableSkeleton from "../skeletons/TableSkeleton";

const UserOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderDetailsModalShow, setOrderDetailsModalShow] = useState(false);
  const { user } = useSelector((state) => state.userSlice);
  let { orders, order, isLoading } = useSelector((state) => state.orderSlice);

  const showProductDetails = (id) => {
    dispatch(getOrderDetails(id));
    setOrderDetailsModalShow(true);
  };

  const getStatusClass = (status) => {
    const statusMap = {
      Processing: "status-processing",
      Delivered: "status-delivered",
      Shipped: "status-shipped",
      Cancelled: "status-cancelled",
    };
    return statusMap[status] || "status-processing";
  };

  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);

  return (
    <>
      <PageTitle title={`Ecommerce- ${user?.name}'s Orders`} />
      <Header />

      <main id="user-orders-main">
        {isLoading ? (
          <div>
            <TableSkeleton />
          </div>
        ) : (
          <>
            {" "}
            {orders && orders.length ? (
              <div id="user-orders-content">
                {/* Page Header */}
                <div id="user-orders-header">
                  <div>
                    <h1>My Orders</h1>
                    <p>Track and manage your orders</p>
                  </div>
                  <div id="orders-stats">
                    <div className="stat-badge">
                      <span className="stat-label">Total Orders</span>
                      <span className="stat-value">{orders.length}</span>
                    </div>
                  </div>
                </div>

                {/* Orders Table */}
                <div id="orders-table-container">
                  <table id="orders-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Order Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td className="order-id">#{order._id.slice(-8)}</td>
                          <td className="order-date">
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </td>
                          <td className="order-amount">
                            ${Math.round(order.totalPrice)}
                          </td>
                          <td>
                            <span
                              className={`status-badge ${getStatusClass(
                                order.orderStatus
                              )}`}
                            >
                              {order.orderStatus}
                            </span>
                          </td>
                          <td>
                            <button
                              onClick={() => showProductDetails(order._id)}
                              className="btn-view-details"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div id="no-orders-container">
                <div id="no-orders-content">
                  <div className="no-orders-icon">📦</div>
                  <h2>No Orders Yet</h2>
                  <p>You haven't placed any orders yet. Start shopping now!</p>
                  <button
                    onClick={() => navigate("/products")}
                    className="btn-shop-now"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Order Details Modal */}
      <Modal
        show={orderDetailsModalShow}
        onHide={() => setOrderDetailsModalShow(false)}
        centered
        className="order-details-modal"
      >
        {order && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Order Details</Modal.Title>
            </Modal.Header>

            <Modal.Body className="order-modal-body">
              <div className="modal-section">
                <h5 className="section-title">Order Information</h5>
                <div className="info-row">
                  <span className="info-label">Order ID</span>
                  <span className="info-value order-id">
                    #{order._id?.slice(-8)}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Order Date</span>
                  <span className="info-value">
                    {order?.createdAt?.slice(0, 10)}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Total Amount</span>
                  <span className="info-value order-amount">
                    ${Math.round(order.totalPrice)}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Payment Method</span>
                  <span className="info-value">Stripe</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Payment Status</span>
                  <span className="info-value payment-success">
                    {order.paymentInfo?.status}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Order Status</span>
                  <span
                    className={`status-badge ${getStatusClass(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
              </div>

              <div className="modal-section">
                <h5 className="section-title">Order Items</h5>
                {order?.orderItems?.map((item) => (
                  <div className="order-item" key={item._id}>
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">
                        Qty: {item.quantity}
                      </span>
                    </div>
                    <span className="item-price">
                      ${Math.round(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="modal-section">
                <h5 className="section-title">Shipping Address</h5>
                <div className="address-info">
                  <p>
                    <strong>Phone:</strong> {order.shippingInfo?.phoneNo}
                  </p>
                  <p>
                    <strong>Address:</strong> {order.shippingInfo?.address}
                  </p>
                </div>
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>

      <Footer />
    </>
  );
};

export default UserOrders;
