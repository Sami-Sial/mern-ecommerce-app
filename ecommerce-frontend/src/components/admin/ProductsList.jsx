import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { toast } from "react-toastify";
import Sidebar from "../layout/DashboardSidebar";
import Button from "react-bootstrap/esm/Button";
import PageTitle from "../layout/PageTitle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useSelector, useDispatch } from "react-redux";
import {
  getAdminProducts,
  deleteProduct,
  clearAdminState,
} from "../../redux-toolkit/slices/admin.slice";
import axios from "axios";
import "./stylesheets/AdminProducts.css";
import TableSkeleton from "../skeletons/TableSkeleton";

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ NEW STATE (only addition)
  const [featuredLoadingId, setFeaturedLoadingId] = useState(null);

  const {
    error,
    products,
    productDeleteSuccess,
    totalAdminProdutsPages,
    totalProducts,
    isLoading,
    isDeleting,
  } = useSelector((state) => state.adminSlice);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const addProductToFeatured = async (id) => {
    try {
      setFeaturedLoadingId(id);

      await axios.put(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/product/featured/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      toast.success("Product added to featured products list");
      dispatch(getAdminProducts(currentPage));
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setFeaturedLoadingId(null);
    }
  };

  const removeProductFromFeatured = async (id) => {
    try {
      setFeaturedLoadingId(id);

      await axios.put(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/product/featured/remove/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      toast.success("Product removed from featured products list");
      dispatch(getAdminProducts(currentPage));
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setFeaturedLoadingId(null);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (productDeleteSuccess) {
      dispatch(clearAdminState());
      toast.success("Product Deleted Successfully");
    }

    dispatch(getAdminProducts(currentPage));
  }, [dispatch, error, productDeleteSuccess, currentPage]);

  return (
    <>
      <PageTitle title={"Ecommerce - Admin Products List"} />
      <Header />

      <main id="admin-products-main">
        <div id="admin-products-layout">
          <Sidebar />

          {isLoading ? (
            <div style={{ width: "95%", margin: "2rem auto" }}>
              <TableSkeleton />
            </div>
          ) : products && products.length ? (
            <div id="admin-products-content">
              <div id="admin-products-header">
                <div>
                  <h1>All Products</h1>
                  <p>Manage your product inventory</p>
                </div>
                <div id="products-stats">
                  <div className="stat-badge">
                    <span className="stat-label">Total Products</span>
                    <span className="stat-value">{totalProducts}</span>
                  </div>
                </div>
              </div>

              <div id="products-table-container">
                <table id="products-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Created At</th>
                      <th>Actions</th>
                      <th>Featured</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td>
                          <img
                            className="product-image"
                            src={product.images[0]?.url}
                            alt={product.name}
                          />
                        </td>

                        <td className="product-name">{product.name}</td>
                        <td className="product-price">${product.price}</td>

                        <td>
                          <span
                            className={`stock-badge ${product.stock > 0 ? "in-stock" : "out-stock"
                              }`}
                          >
                            {product.stock}
                          </span>
                        </td>

                        <td className="product-date">
                          {new Date(product.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </td>

                        <td>
                          <div className="action-buttons">
                            <button
                              className="btn-edit"
                              onClick={() =>
                                navigate(
                                  `/admin/edit_product/${product._id}`
                                )
                              }
                              title="Edit Product"
                            >
                              <EditIcon />
                            </button>

                            <button
                              className="btn-delete"
                              onClick={() => deleteProductHandler(product._id)}
                              title="Delete Product"
                              disabled={isDeleting}
                              style={{
                                opacity: isDeleting ? 0.5 : 1,
                                cursor: isDeleting ? "not-allowed" : "pointer",
                              }}
                            >
                              {isDeleting ? "Deleting..." : <DeleteIcon />}
                            </button>


                          </div>
                        </td>

                        <td>
                          {product.featured ? (
                            <div className="featured-actions">
                              <button
                                className="btn-remove-featured"
                                style={{
                                  opacity: featuredLoadingId === product._id ? 0.5 : 1,
                                  cursor: featuredLoadingId === product._id ? "not-allowed" : "pointer",
                                }}
                                disabled={
                                  featuredLoadingId === product._id
                                }
                                onClick={() =>
                                  removeProductFromFeatured(product._id)
                                }
                                title="Remove from Featured"
                              >
                                {featuredLoadingId === product._id
                                  ? "Removing..."
                                  : <EditIcon />}
                              </button>

                              <CheckCircleIcon className="featured-check" />
                            </div>
                          ) : (
                            <button
                              className="btn-add-featured"
                              style={{
                                opacity: featuredLoadingId === product._id ? 0.5 : 1,
                                cursor: featuredLoadingId === product._id ? "not-allowed" : "pointer",
                              }}
                              disabled={
                                featuredLoadingId === product._id
                              }
                              onClick={() =>
                                addProductToFeatured(product._id)
                              }
                            >
                              {featuredLoadingId === product._id
                                ? "Adding..."
                                : "Add"}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {products && totalAdminProdutsPages > 1 && (
                <div id="products-pagination">
                  <Stack spacing={2}>
                    <Pagination
                      count={totalAdminProdutsPages}
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
            <div id="no-products-container">
              <div id="no-products-content">
                <div className="no-products-icon">📦</div>
                <h2>No Products Yet</h2>
                <p>There are no products to display at the moment.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default ProductList;
