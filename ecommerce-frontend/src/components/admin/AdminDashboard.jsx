import React, { useEffect } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Sidebar from "../layout/DashboardSidebar.jsx";
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { useSelector, useDispatch } from "react-redux";
import PageTitle from "../layout/PageTitle";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import {
  getAdminProducts,
  getAllOrders,
  getAllUsers,
} from "../../redux-toolkit/slices/admin.slice.jsx";
import './stylesheets/AdminDashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { products, orders, users } = useSelector((state) => state.adminSlice);

  let totalAmount = 0;
  let mensClothing = [],
    womensClothing = [],
    beauty = [],
    furniture = [],
    groceries = [],
    fragrances = [],
    jewelry = [],
    electronics = [];

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

    mensClothing = products.filter((p) => p.category === "men's clothing");
    womensClothing = products.filter((p) => p.category === "women's clothing");
    jewelry = products.filter((p) => p.category === "jewelery");
    electronics = products.filter((p) => p.category === "electronics");
    beauty = products.filter((p) => p.category === "beauty");
    fragrances = products.filter((p) => p.category === "fragrances");
    furniture = products.filter((p) => p.category === "furniture");
    groceries = products.filter((p) => p.category === "groceries");
  }

  // Calculate most sold products
  const productSales = {};
  orders?.forEach((order) => {
    order.orderItems?.forEach((item) => {
      if (productSales[item.product]) {
        productSales[item.product].quantity += item.quantity;
      } else {
        const productInfo = products?.find(p => p._id === item.product);
        if (productInfo) {
          productSales[item.product] = {
            ...productInfo,
            soldQuantity: item.quantity
          };
        }
      }
    });
  });

  const mostSoldProducts = Object.values(productSales)
    .sort((a, b) => (b.soldQuantity || 0) - (a.soldQuantity || 0))
    .slice(0, 4);

  let deliveredOrders = 0;
  let processingOrders = 0;
  orders &&
    orders.forEach((order) => {
      if (order.orderStatus === "Processing") {
        processingOrders += 1;
      } else if (order.orderStatus === "Delivered") {
        deliveredOrders += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  const getStatusClass = (status) => {
    const statusMap = {
      'Processing': 'status-processing',
      'Delivered': 'status-delivered',
      'Shipped': 'status-shipped',
      'Cancelled': 'status-cancelled'
    };
    return statusMap[status] || 'status-processing';
  };

  // Bar chart data for inventory
  const inventoryData = {
    labels: ["Men's", "Women's", "Jewelry", "Electronics", "Beauty", "Fragrances", "Furniture", "Groceries"],
    datasets: [{
      label: 'Products',
      data: [
        mensClothing.length,
        womensClothing.length,
        jewelry.length,
        electronics.length,
        beauty.length,
        fragrances.length,
        furniture.length,
        groceries.length
      ],
      backgroundColor: [
        '#ff6347',
        '#ff8c00',
        '#ffa500',
        '#3b82f6',
        '#10b981',
        '#8b5cf6',
        '#f59e0b',
        '#ec4899'
      ],
      borderRadius: 8,
      borderWidth: 0
    }]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#1a1a1a',
        padding: 12,
        titleFont: { size: 13, weight: 'bold' },
        bodyFont: { size: 12 }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f0f1f3',
          drawBorder: false
        },
        ticks: {
          font: { size: 11 },
          color: '#6b7280'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: { size: 10 },
          color: '#6b7280'
        }
      }
    }
  };

  return (
    <>
      <PageTitle title={"Ecommerce-Admin Dashboard"} />
      <Header />

      <main>
        <div style={{ display: "flex" }}>
          <Sidebar />

          <div className="admin-dashboard">
            {/* Page Header */}
            <div className="dashboard-header">
              <div>
                <h1>Admin Dashboard</h1>
                <p>Welcome back! Here's what's happening with your store today.</p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card revenue-card">
                <div className="stat-icon-wrapper revenue-icon">
                  <AttachMoneyIcon className="stat-icon" />
                </div>
                <div className="stat-content">
                  <h5>Total Revenue</h5>
                  <div className="value">${Math.round(totalAmount).toLocaleString()}</div>
                </div>
              </div>
              <div className="stat-card products-card">
                <div className="stat-icon-wrapper products-icon">
                  <InventoryIcon className="stat-icon" />
                </div>
                <div className="stat-content">
                  <h5>Total Products</h5>
                  <div className="value">{products?.length || 0}</div>
                </div>
              </div>
              <div className="stat-card orders-card">
                <div className="stat-icon-wrapper orders-icon">
                  <ShoppingCartIcon className="stat-icon" />
                </div>
                <div className="stat-content">
                  <h5>Total Orders</h5>
                  <div className="value">{orders?.length || 0}</div>
                </div>
              </div>
              <div className="stat-card users-card">
                <div className="stat-icon-wrapper users-icon">
                  <PeopleIcon className="stat-icon" />
                </div>
                <div className="stat-content">
                  <h5>Total Users</h5>
                  <div className="value">{users?.length || 0}</div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="charts-container">
              {/* Stock Status Chart */}
              <div className="chart-card">
                <h4>Stock Status</h4>
                <div style={{ maxWidth: '240px', margin: '0 auto' }}>
                  <Doughnut
                    data={{
                      labels: ["Out of Stock", "In Stock"],
                      datasets: [{
                        data: [outOfStock, (products?.length || 0) - outOfStock],
                        backgroundColor: ['#ef4444', '#10b981'],
                        borderWidth: 0,
                        hoverOffset: 4
                      }]
                    }}
                    options={{
                      plugins: {
                        legend: {
                          position: 'bottom',
                          labels: {
                            padding: 12,
                            font: { size: 11, family: 'Segoe UI' }
                          }
                        }
                      },
                      cutout: '65%'
                    }}
                  />
                </div>
              </div>

              {/* Order Status Chart */}
              <div className="chart-card">
                <h4>Order Status</h4>
                <div style={{ maxWidth: '240px', margin: '0 auto' }}>
                  <Doughnut
                    data={{
                      labels: ["Processing", "Delivered"],
                      datasets: [{
                        data: [processingOrders, deliveredOrders],
                        backgroundColor: ['#f59e0b', '#10b981'],
                        borderWidth: 0,
                        hoverOffset: 4
                      }]
                    }}
                    options={{
                      plugins: {
                        legend: {
                          position: 'bottom',
                          labels: {
                            padding: 12,
                            font: { size: 11, family: 'Segoe UI' }
                          }
                        }
                      },
                      cutout: '65%'
                    }}
                  />
                </div>
              </div>

              {/* Inventory Bar Chart */}
              <div className="chart-card chart-card-wide">
                <h4>Inventory by Category</h4>
                <div style={{ height: '240px' }}>
                  <Bar data={inventoryData} options={barOptions} />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <h2 className="section-title">Recent Activity</h2>

            {/* Latest Orders */}
            <div className="recent-section-full">
              <div className="table-section-header">Latest Orders</div>
              <div className="table-wrapper">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.slice(0, 4).map((order) => (
                      <tr key={order._id}>
                        <td style={{ fontWeight: '600', color: 'var(--dark)' }}>
                          #{order._id.slice(-8)}
                        </td>
                        <td style={{ color: 'var(--gray)' }}>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <span className={`status-badge ${getStatusClass(order.orderStatus)}`}>
                            {order.orderStatus}
                          </span>
                        </td>
                        <td style={{ fontWeight: '600', color: 'var(--dark)' }}>
                          ${Math.round(order.totalPrice)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Most Sold Products */}
            <div className="recent-section-full">
              <div className="table-section-header">Most Sold Products</div>
              <div className="table-wrapper">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Sold</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mostSoldProducts.map((product) => (
                      <tr key={product._id}>
                        <td>
                          <img
                            src={product.images?.[0]?.url || "/placeholder.jpg"}
                            alt={product.name}
                          />
                        </td>
                        <td style={{ fontWeight: '600', color: 'var(--dark)' }}>
                          {product.name}
                        </td>
                        <td style={{ color: 'var(--gray)', textTransform: 'capitalize' }}>
                          {product.category}
                        </td>
                        <td style={{ color: 'var(--gray)', fontWeight: '600' }}>${product.price}</td>
                        <td>
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            background: 'linear-gradient(135d, #d1fae5, #a7f3d0)',
                            color: '#065f46'
                          }}>
                            {product.soldQuantity} sold
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Latest Products */}
            <div className="recent-section-full">
              <div className="table-section-header">Latest Products</div>
              <div className="table-wrapper">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products?.slice(0, 4).map((product) => (
                      <tr key={product._id}>
                        <td>
                          <img
                            src={product.images?.[0]?.url || "/placeholder.jpg"}
                            alt={product.name}
                          />
                        </td>
                        <td style={{ fontWeight: '600', color: 'var(--dark)' }}>
                          {product.name}
                        </td>
                        <td style={{ color: 'var(--gray)', textTransform: 'capitalize' }}>
                          {product.category}
                        </td>
                        <td style={{ color: 'var(--gray)', fontWeight: '600' }}>${product.price}</td>
                        <td>
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            background: product.stock > 20 ? '#d1fae5' : product.stock > 0 ? '#fef3c7' : '#fee2e2',
                            color: product.stock > 20 ? '#065f46' : product.stock > 0 ? '#92400e' : '#991b1b'
                          }}>
                            {product.stock}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Latest Users */}
            <div className="recent-section-full">
              <div className="table-section-header">Latest Users</div>
              <div className="table-wrapper">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Avatar</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.slice(0, 4).map((user) => (
                      <tr key={user._id}>
                        <td>
                          <img
                            src={user.avatar?.url || "/default-avatar.png"}
                            alt={user.name}
                            style={{ borderRadius: '50%', border: '2px solid #000' }}
                          />
                        </td>
                        <td style={{ fontWeight: '600', color: 'var(--dark)' }}>
                          {user.name}
                        </td>
                        <td style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>
                          {user.email}
                        </td>
                        <td>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            background: user.role === 'admin' ? '#000' : '#e5e7eb',
                            color: user.role === 'admin' ? 'white' : 'var(--gray)'
                          }}>
                            {user.role}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;