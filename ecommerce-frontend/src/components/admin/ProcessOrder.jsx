import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Sidebar from "../layout/DashboardSidebar.jsx";
import { useEffect, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Button from "react-bootstrap/esm/Button";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails } from "../../redux-toolkit/slices/order.slice.jsx";
import { useNavigate, useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import "./stylesheets/ProcessOrder.css";
import {
  processOrder,
  clearAdminState,
} from "../../redux-toolkit/slices/admin.slice.jsx";

import PageTitle from "../layout/PageTitle";
import { toast } from "react-toastify";

const ProcessOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderStatus, setOrderStatus] = useState("Processing");

  const { error, orderProcessSuccess, isLoading } = useSelector(
    (state) => state.adminSlice
  );
  const { order } = useSelector((state) => state.orderSlice);

  console.log(order);

  const updateOrderStatus = () => {
    dispatch(processOrder(id));
  };

  useEffect(() => {
    if (orderProcessSuccess) {
      navigate("/admin/orders");
      dispatch(clearAdminState());
      toast.success("Order status updated successfully.");
    }
  }, [order, orderProcessSuccess]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, id, error]);

  return (
    <>
      <PageTitle title={"Ecoomerce-Admin Process Order"} />

      <Header />

      <main>
        <div style={{ display: "flex" }}>
          <Sidebar />

          <div className="content-wrapper">
            {order && (
              <>
                <div>
                  {/* ORDER ITEMS TABLE */}
                  <div>
                    <h5>Order Items</h5>

                    <Table striped>
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Product Name</th>
                          <th>Price</th>
                          <th>Qty</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order?.orderItems?.map((item) => (
                          <tr key={item._id}>
                            <td>
                              <img
                                width={30}
                                height={30}
                                src={item?.images[0]?.url}
                                alt={item.name}
                              />
                            </td>
                            <td>{item.name}</td>
                            <td>${Math.round(item.price)}</td>
                            <td>{item.quantity}</td>
                            <td>${Math.round(item.price * item.quantity)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>Gross Total</th>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th>${Math.round(order.totalPrice)}</th>
                        </tr>
                      </tfoot>
                    </Table>
                  </div>

                  {/* PAYMENT INFO TABLE */}
                  <div>
                    <h5>Payment Information</h5>
                    <Table striped>
                      <thead>
                        <tr>
                          <th>Total Price</th>
                          <th>Payment Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>${Math.round(order.totalPrice)}</td>
                          <td style={{ color: "green" }}>
                            {order.paymentInfo?.status}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>

                {/* RIGHT SIDEBAR */}
                <div id="right">
                  {/* SHIPPING ADDRESS */}
                  <div>
                    <h5>Shipping Address</h5>
                    <p>
                      <strong>Name:</strong> {order.user?.name}
                    </p>
                    <p>
                      <strong>Address:</strong> {order.shippingInfo?.address},{" "}
                      {order.shippingInfo?.city}, {order.shippingInfo?.state},{" "}
                      {order.shippingInfo?.country}
                    </p>
                    <p>
                      <strong>Pin Code:</strong> {order.shippingInfo?.pinCode}
                    </p>
                    <p>
                      <strong>Phone:</strong> {order.shippingInfo?.phoneNo}
                    </p>
                  </div>

                  {/* PROCESS ORDER */}
                  <div>
                    <h4>Process Order</h4>
                    <div>
                      <p>
                        Order Status:
                        <span> {order.orderStatus}</span>
                      </p>

                      {order?.orderStatus === "Processing" ? (
                        <Button
                          onClick={updateOrderStatus}
                          size="sm"
                          disabled={isLoading} // disable while loading
                        >
                          {isLoading ? "Processing..." : "Deliver Order"}
                        </Button>
                      ) : (
                        <div>
                          <p>✓ Order Delivered Successfully</p>
                          <p>
                            Delivery Date: {order?.deliveredAt?.slice(0, 10)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </>
  );
};

export default ProcessOrder;
