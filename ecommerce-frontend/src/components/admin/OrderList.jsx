import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../layout/DashboardSidebar";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Button from "react-bootstrap/esm/Button";
import { useSelector, useDispatch } from "react-redux";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Table from "react-bootstrap/Table";
import DashboardTop from "../layout/DashboardTop";
import PageTitle from "../layout/PageTitle";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
  getAllOrders,
  deleteOrder,
  clearAdminState,
} from "../../redux-toolkit/slices/admin.slice";
import { toast } from "react-toastify";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const [quantity, setQuantity] = useState(0);
  const { error, orders, deleteOrderSuccess, totalOrdersPages } = useSelector(
    (state) => state.adminSlice
  );
  console.log(orders);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
    toast.success("Order deleted successfully");
    navigate("/admin/orders");
  };

  useEffect(() => {
    dispatch(getAllOrders(currentPage));

    if (error) {
      toast.error(error);
    }

    if (deleteOrderSuccess) {
      dispatch(clearAdminState());
      toast.success("Order deleted successfully");
    }
  }, [dispatch, error, deleteOrderSuccess, currentPage]);

  return (
    <>
      <PageTitle title={"Ecommerec-Admin Orders"} />

      <Header />
      <DashboardTop />
      <main>
        <div style={{ display: "flex" }}>
          <Sidebar />

          {orders && orders.length ? (
            <div className="content-wrapper">
              <h4 style={{ textAlign: "center" }}>All Orders</h4>

              <Table style={{ width: "90%", margin: "auto" }} striped>
                <thead>
                  <tr>
                    <th>Order Id</th>
                    <th>Order Date</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.slice(0, 10)}</td>
                      <td style={{ color: "red" }}>{order.orderStatus}</td>
                      <td>&#x24;{Math.round(order.totalPrice)}</td>
                      <td>
                        <Button
                          style={{ padding: "2px", marginRight: "10px" }}
                          size="sm"
                          variant="danger"
                        >
                          <EditIcon
                            onClick={() =>
                              navigate(`/admin/process_order/${order._id}`)
                            }
                          />
                        </Button>
                        <Button
                          onClick={() => deleteOrderHandler(order._id)}
                          size="sm"
                          variant="danger"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* pagination */}
              {orders && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "2rem",
                  }}
                >
                  <Stack spacing={2}>
                    <Pagination
                      count={totalOrdersPages}
                      onChange={(e, page) => setCurrentPage(page)}
                      color="primary"
                    />
                  </Stack>
                </div>
              )}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "calc(100vh - 7rem)",
                width: "calc(100vw - 200px)",
              }}
            >
              <h4>No orders placed yet</h4>
            </div>
          )}
        </div>
      </main>

      {/* <Footer /> */}
    </>
  );
};

export default OrderList;
