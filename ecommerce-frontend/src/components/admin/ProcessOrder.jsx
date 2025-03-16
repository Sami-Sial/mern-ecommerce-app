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
import {
  processOrder,
  clearAdminState,
} from "../../redux-toolkit/slices/admin.slice.jsx";
import DashboardTop from "../layout/DashboardTop";
import PageTitle from "../layout/PageTitle";
import { toast } from "react-toastify";

const ProcessOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderStatus, setOrderStatus] = useState("Processing");

  const { error, orderProcessSuccess } = useSelector(
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
      <DashboardTop />
      <main>
        <div style={{ display: "flex" }}>
          <Sidebar />

          <div
            className="content-wrapper"
            style={{
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            {order && (
              <>
                <div>
                  <div>
                    <h5 style={{ fontWeight: "bold", margin: "1rem 0 0" }}>
                      Order Items
                    </h5>

                    <Table striped>
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Product Name</th>
                          <th>Price</th>
                          <th>Quantity</th>
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
                                style={{ borderRadius: "5px" }}
                                src={item.images[0].url}
                                alt=""
                              />
                            </td>
                            <td>{item.name}</td>
                            <td>&#x24;{Math.round(item.price)}</td>
                            <td>{item.quantity}</td>
                            <td>
                              &#x24;{Math.round(item.price * item.quantity)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>Gross Total</th>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th>&#x24;{Math.round(order.totalPrice)}</th>
                        </tr>
                      </tfoot>
                    </Table>
                  </div>

                  <div>
                    <h5 style={{ fontWeight: "bold" }}>Payment</h5>
                    <Table striped>
                      <thead>
                        <tr>
                          <th>Total Price</th>
                          <th>Payment Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>&#x24;{Math.round(order.totalPrice)}</td>
                          <td style={{ color: "green" }}>
                            {order.paymentInfo?.status}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>

                <div
                  style={{
                    width: "30%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    padding: "1rem",
                    gap: "1rem",
                  }}
                >
                  <div>
                    <h5 style={{ fontWeight: "bold" }}>Order Address</h5>
                    <p>Name : {order.user?.name}</p>
                    <p style={{ margin: "0" }}>
                      Address : {""}
                      {order.shippingInfo?.address +
                        "," +
                        order.shippingInfo?.city +
                        "," +
                        order.shippingInfo?.state +
                        "," +
                        order.shippingInfo?.country}
                    </p>
                    <p>Pin Code : {order.shippingInfo?.pinCode}</p>
                    <p style={{ margin: "0" }}>
                      Phone No: {order.shippingInfo?.phoneNo}
                    </p>
                  </div>

                  <div>
                    <h4>Process Order</h4>
                    <div>
                      <p style={{ marginBottom: "10px 0" }}>
                        <p>
                          Order Status :
                          <span style={{ color: "red" }}>
                            {" " + order.orderStatus}
                          </span>
                        </p>
                      </p>
                      {/* <label htmlFor="" style={{ marginBottom: "5px" }}>
                        Update Status
                      </label>{" "}
                      <br />
                      <select
                        value={orderStatus}
                        onChange={(e) => setOrderStatus(e.target.value)}
                        id=""
                        style={{
                          width: "150px",
                          padding: "2px",
                          borderRadius: "5px",
                          border: "2px solid green",
                        }}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Delivered">Delivered</option>
                      </select> */}

                      {order?.orderStatus == "Processing" ? (
                        <Button
                          onClick={updateOrderStatus}
                          style={{
                            marginTop: "2rem",
                          }}
                          size="sm"
                          variant="success"
                        >
                          Deliver Order
                        </Button>
                      ) : (
                        <div>
                          <p style={{ color: "green", fontSize: "20px" }}>
                            Order is already delivered
                          </p>
                          <p>
                            Delivery Date : {order?.deliveredAt?.slice(0, 10)}
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
