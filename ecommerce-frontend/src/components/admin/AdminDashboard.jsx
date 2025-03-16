import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Sidebar from "../layout/DashboardSidebar.jsx";
import { useEffect } from "react";
import Chart from "chart.js/auto";
import { Doughnut, Bar } from "react-chartjs-2";
import Button from "react-bootstrap/esm/Button";
import { useSelector, useDispatch } from "react-redux";
import DashboardTop from "../layout/DashboardTop";
import PageTitle from "../layout/PageTitle";
import {
  getAdminProducts,
  getAllOrders,
  getAllUsers,
} from "../../redux-toolkit/slices/admin.slice.jsx";
import "./stylesheets/AdminDashboard.css";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { products, orders, users } = useSelector((state) => state.adminSlice);
  console.log(users);

  let totalAmount = 0;
  let mensClothing,
    womensClothing,
    beauty,
    furniture,
    groceries,
    fragrances,
    jewelry,
    electronics;

  orders &&
    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });

  let outOfStock = 0;
  if (products) {
    products.forEach((product) => {
      if (product.stock <= 0) {
        outOfStock += 1;
      }
    });

    mensClothing = products.filter((p) => p.category == "men's clothing");
    womensClothing = products.filter((p) => p.category == "women's clothing");
    jewelry = products.filter((p) => p.category == "jewelery");
    electronics = products.filter((p) => p.category == "electronics");
    beauty = products.filter((p) => p.category == "beauty");
    fragrances = products.filter((p) => p.category == "fragrances");
    furniture = products.filter((p) => p.category == "furniture");
    groceries = products.filter((p) => p.category == "groceries");
  }

  let delilverdOrders = 0;
  let processingOrders = 0;
  orders &&
    orders.forEach((order) => {
      if (order.orderStatus == "Processing") {
        processingOrders += 1;
      } else if (order.orderStatus == "Delivered") {
        delilverdOrders += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <>
      <PageTitle title={"Ecommerce-Admin Dashboard"} />

      <Header />
      <DashboardTop />
      <main>
        <div style={{ display: "flex" }}>
          <Sidebar />

          <div className="content-wrapper">
            <div
              style={{ display: "flex", justifyContent: "center", gap: "2rem" }}
            >
              <div className="box">
                <h5>Total Revenue</h5>
                <h5>&#x24;{Math.round(totalAmount)}</h5>
              </div>

              <div className="box">
                <h5>Products</h5>
                <h5>{products.length}</h5>
              </div>
              <div className="box">
                <h5>Orders</h5>
                <h5>{orders.length}</h5>
              </div>
              <div className="box">
                <h5>Users</h5>
                <h5>{users.length}</h5>
              </div>
            </div>

            <div
              style={{ display: "flex", gap: "2rem", justifyContent: "center" }}
            >
              <div
                style={{
                  width: "240px",
                  height: "250px",
                  margin: "2rem 0",
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                }}
              >
                <Doughnut
                  data={{
                    labels: ["Out of Stock", "In Stock"],
                    datasets: [
                      {
                        label: "Products",
                        data: [outOfStock, products.length - outOfStock],
                        backgroundColor: [
                          "rgb(255, 205, 86)",
                          "rgb(54, 162, 235)",
                        ],
                        hoverOffset: 4,
                      },
                    ],
                  }}
                />
              </div>

              <div
                style={{
                  width: "250px",
                  height: "250px",
                  margin: "2rem 0",
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                }}
              >
                <Doughnut
                  data={{
                    labels: ["Processing Orders", "Delivered Orders"],
                    datasets: [
                      {
                        label: "Orders",
                        data: [processingOrders, delilverdOrders],
                        backgroundColor: [
                          "rgb(255, 205, 86)",
                          "rgb(54, 162, 235)",
                        ],
                        hoverOffset: 4,
                      },
                    ],
                  }}
                />
              </div>

              <div
                style={{
                  margin: "2rem 0",
                  backgroundColor: "lightgrey",
                  padding: "10px 20px",
                }}
                id="inventory"
              >
                <h4>Inventory</h4>
                <div>
                  <p>Men's Clothing</p>
                  <p>{mensClothing.length}</p>
                </div>
                <div>
                  <p>Jewelry</p>
                  <p>{jewelry.length}</p>
                </div>
                <div>
                  <p>Electronics</p>
                  <p>{electronics.length}</p>
                </div>
                <div>
                  <p>Women's Clothing</p>
                  <p>{womensClothing.length}</p>
                </div>
                <div>
                  <p>Beauty</p>
                  <p>{beauty.length}</p>
                </div>
                <div>
                  <p>Fragrances</p>
                  <p>{fragrances.length}</p>
                </div>
                <div>
                  <p>Furniture</p>
                  <p>{furniture.length}</p>
                </div>
                <div>
                  <p>Groceries</p>
                  <p>{groceries.length}</p>
                </div>
              </div>
            </div>

            {/* <div
              style={{ width: "400px", height: "400px", margin: "1rem auto" }}
            >
              <Bar
                data={{
                  labels: [
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                  ],
                  datasets: [
                    {
                      label: "Revenue",
                      data: [0, 1, 20],
                      backgroundColor: ["rgb(54, 162, 235)"],
                      barThickness: "30",
                      borderRadius: "10",
                    },
                  ],
                }}
              />
            </div> */}
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </>
  );
};

export default AdminDashboard;
