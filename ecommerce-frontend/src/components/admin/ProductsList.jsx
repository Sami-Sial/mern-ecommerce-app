import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { toast } from "react-toastify";
import Sidebar from "../layout/DashboardSidebar";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import DashboardTop from "../layout/DashboardTop";
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

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  console.log(currentPage);

  const { error, products, productDeleteSuccess, totalAdminProdutsPages } =
    useSelector((state) => state.adminSlice);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const addProductToFeatured = async (id) => {
    try {
      const { data } = await axios.put("/api/v1/product/featured/" + id);
      toast.success("Product added to featured products list");
      console.log(data);

      dispatch(getAdminProducts(currentPage));
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProductFromFeatured = async (id) => {
    try {
      const { data } = await axios.put("/api/v1/product/featured/remove/" + id);
      toast.success("Product removed from featured products list");
      console.log(data);

      dispatch(getAdminProducts());
    } catch (error) {
      console.log(error);
      toast.error(error.message);
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
      <PageTitle title={"Ecommerce-Admin Products List"} />

      <Header />
      <DashboardTop />
      <main>
        <div style={{ display: "flex" }}>
          <Sidebar />

          <div className="content-wrapper">
            <h4 style={{ textAlign: "center" }}>All Products</h4>
            <Table style={{ width: "90%", margin: "auto" }} striped>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Created At</th>
                  <th>Actions</th>
                  {/* <th>View Details</th> */}
                  <th>Featured</th>
                </tr>
              </thead>
              {products && (
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <img
                          width={30}
                          height={30}
                          src={product.images[0]?.url}
                          alt=""
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>&#x24;{product.price}</td>
                      <td>{product.stock}</td>
                      <td>{product.createdAt.slice(0, 10)}</td>
                      <td style={{ display: "flex" }}>
                        <Button
                          style={{ padding: "2px", marginRight: "10px" }}
                          size="sm"
                          variant="danger"
                        >
                          <EditIcon
                            onClick={() =>
                              navigate(`/admin/edit_product/${product._id}`)
                            }
                          />
                        </Button>
                        <Button
                          style={{ padding: "2px" }}
                          onClick={() => deleteProductHandler(product._id)}
                          size="sm"
                          variant="danger"
                        >
                          <DeleteIcon />
                        </Button>
                      </td>
                      {/* <td>
                        <Button
                          onClick={() => navigate(`/product/${product._id}`)}
                          size="sm"
                          variant="secondary"
                        >
                          View Details
                        </Button>
                      </td> */}
                      <td>
                        {product.featured ? (
                          <>
                            <EditIcon
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                removeProductFromFeatured(product._id)
                              }
                            />
                            <CheckCircleIcon />
                          </>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => addProductToFeatured(product._id)}
                          >
                            Add
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </Table>

            {/* pagination */}
            {products && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "2rem",
                }}
              >
                <Stack spacing={2}>
                  <Pagination
                    count={totalAdminProdutsPages}
                    onChange={(e, page) => setCurrentPage(page)}
                    color="primary"
                  />
                </Stack>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </>
  );
};

export default ProductList;
