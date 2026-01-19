import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../layout/DashboardSidebar";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import PageTitle from "../layout/PageTitle";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
  getAllOrders,
  deleteOrder,
  clearAdminState,
} from "../../redux-toolkit/slices/admin.slice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "./stylesheets/AdminOrders.css";
import TableSkeleton from "../skeletons/TableSkeleton";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const { error, orders, deleteOrderSuccess, totalOrdersPages, totalOrders, isLoading, isDeleting } =
    useSelector((state) => state.adminSlice);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  }

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
    dispatch(getAllOrders(currentPage));

    if (error) toast.error(error);

    if (deleteOrderSuccess) {
      dispatch(clearAdminState());
      toast.success("Order deleted successfully");
    }
  }, [dispatch, error, deleteOrderSuccess, currentPage]);



  return (
    <>
      <PageTitle title={"Ecommerce - Admin Orders"} />
      <Header />

      <main id="admin-orders-main">
        <div id="admin-orders-layout">
          <Sidebar />

          {isLoading ? (
            <div style={{ width: "95%", margin: "2rem auto" }}>
              <TableSkeleton />
            </div>
          ) : orders && orders.length ? (
            <div id="admin-orders-content">
              {/* Page Header */}
              <div id="admin-orders-header">
                <div>
                  <h1>All Orders</h1>
                  <p>Manage and track all customer orders</p>
                </div>
                <div id="orders-stats">
                  <div className="stat-badge">
                    <span className="stat-label">Total Orders</span>
                    <span className="stat-value">{totalOrders}</span>
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
                      <th>Status</th>
                      <th>Amount</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td className="order-id">#{order._id.slice(-8)}</td>
                        <td className="order-date">
                          {new Date(order.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td>
                          <span
                            className={`status-badge ${getStatusClass(order.orderStatus)}`}
                          >
                            {order.orderStatus}
                          </span>
                        </td>
                        <td className="order-amount">${Math.round(order.totalPrice)}</td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="btn-edit"
                              onClick={() =>
                                navigate(`/admin/process_order/${order._id}`)
                              }
                              title="Edit Order"
                            >
                              <EditIcon />
                            </button>
                            <button
                              className="btn-delete"
                              onClick={() => deleteOrderHandler(order._id)}
                              disabled={isDeleting}
                              title="Delete Order"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "0.875rem",
                                fontWeight: 600,
                                padding: "6px 12px",
                                minWidth: "36px",
                                borderRadius: "8px",
                                transition: "all 0.2s ease",
                              }}
                            >
                              {isDeleting ? "Deleting..." : <DeleteIcon style={{ width: "18px", height: "18px" }} />}
                            </button>

                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {orders && totalOrdersPages > 1 && (
                <div id="orders-pagination">
                  <Stack spacing={2}>
                    <Pagination
                      count={totalOrdersPages}
                      page={currentPage}
                      onChange={(e, page) => setCurrentPage(page)}
                      color="primary"
                      size="large"
                      showFirstButton
                      showLastButton
                    />
                  </Stack>
                </div>
              )}
            </div>
          ) : (
            <div id="no-orders-container">
              <div id="no-orders-content">
                <div className="no-orders-icon">📦</div>
                <h2>No Orders Yet</h2>
                <p>There are no orders to display at the moment.</p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default OrderList;
