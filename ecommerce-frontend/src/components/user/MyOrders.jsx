import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Sidebar from "../layout/DashboardSidebar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import DashboardTop from "../layout/DashboardTop";
import PageTitle from "../layout/PageTitle";
import exclamationImg from "../../assets/exclamation_mark.jpg";
import {
  myOrders,
  getOrderDetails,
} from "../../redux-toolkit/slices/order.slice";
import { Navigate, useNavigate } from "react-router-dom";

const UserOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderDetailsModalShow, setOrderDetailsModalShow] = useState(false);
  const { user } = useSelector((state) => state.userSlice);
  let { orders, order } = useSelector((state) => state.orderSlice);
  console.log(orders);
  console.log(order);

  const showProductDetails = (id) => {
    dispatch(getOrderDetails(id));
    setOrderDetailsModalShow(true);
  };

  useEffect(() => {
    order = {};
    dispatch(myOrders());
  }, [dispatch]);

  return (
    <>
      <PageTitle title={`Ecommerce- ${user.name}'s Orders`} />
      <Header />
      <DashboardTop />
      <main>
        <div style={{ display: "flex" }}>
          <Sidebar />

          {orders && orders.length ? (
            <div style={{ padding: "1rem" }} className="content-wrapper">
              <h4 style={{ textAlign: "center", marginBottom: "1rem" }}>
                My Orders
              </h4>

              <div className="content-wrapper">
                {orders && (
                  <Table
                    style={{ width: "80%", margin: "auto" }}
                    striped
                    bordered
                  >
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Order Date</th>
                        <th>Order Price</th>
                        <th>Order Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{order.createdAt.slice(0, 10)}</td>
                          <td>{order.totalPrice}</td>
                          <td style={{ color: "red" }}>{order.orderStatus}</td>
                          <td>
                            <Button
                              onClick={() => showProductDetails(order._id)}
                              size="sm"
                              variant="secondary"
                            >
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "calc(100vw - 200px)",
                flexDirection: "column",
              }}
            >
              <img width={50} height={50} src={exclamationImg} alt="" />
              <h4>No orders yet</h4>
              <Button>View Products</Button>
            </div>
          )}
        </div>
      </main>
      {/* <Footer /> */}

      {/* order details modal */}
      <Modal
        style={{ padding: "10px" }}
        show={orderDetailsModalShow}
        onHide={() => setOrderDetailsModalShow(false)}
      >
        {order && (
          <>
            <Modal.Header closeButton></Modal.Header>

            <Modal.Body>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>Order ID</p>
                <p>{order._id}</p>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>Order Date</p>
                <p>{order?.createdAt?.slice(0, 10)}</p>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>Order Price</p>
                <p>&#x24;{Math.round(order.totalPrice)}</p>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>Payment Method</p>
                <p>Stripe</p>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>Payment Status</p>
                <p style={{ color: "green" }}>{order.paymentInfo?.status}</p>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>Order Status</p>
                <p style={{ color: "red" }}>{order.orderStatus}</p>
              </div>

              <div>
                <h5>Order Details</h5>
                {order?.orderItems?.map((item) => (
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                    key={item._id}
                  >
                    <p>{item.name}</p>
                    <p>{item.quantity}</p>
                    <p>&#x24;{Math.round(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div>
                <h5>Address Details</h5>
                <p>Phone No : {order.shippingInfo?.phoneNo}</p>
                <p>Address: {order.shippingInfo?.address}</p>
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>
    </>
  );
};

export default UserOrders;
