import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFilteredProducts } from "../../redux-toolkit/slices/product.slice";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Sidebar from "./Sidebar.jsx";
import "./stylesheets/products.css";
import image from "../../assets/herosection_img2.jpg";
import Button from "react-bootstrap/esm/Button.js";
import { useNavigate } from "react-router-dom";
import PageTitle from "../layout/PageTitle";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Offcanvas from "react-bootstrap/Offcanvas";
import {
  addItemsToCart,
  clearUserState,
} from "../../redux-toolkit/slices/user.slice.jsx";
import Loader from "../layout/Loader.jsx";
import { toast } from "react-toastify";

const products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const { totalPages, products, loading, error } = useSelector(
    (state) => state.productSlice
  );

  const [showFilters, setShowFilters] = useState(false);

  console.log(products);
  // const addToCart = (product) => {
  //   if (product.stock > 0) {
  //     let id = product._id;
  //     dispatch(addItemsToCart({ id }));
  //     return;
  //   }

  //   toast.error("Product is out of stock");
  // };

  useEffect(() => {
    dispatch(fetchFilteredProducts());

    if (error) {
      toast.error(error);
    }
  }, [dispatch, error]);

  console.log(products);
  return (
    <>
      <PageTitle title={"Ecommerec- Products"} />

      <Header />

      <main style={{ display: "flex" }}>
        <div className="sidebar-wrapper">
          <Sidebar currentPage={currentPage} />
        </div>

        <div
          id="products"
          style={{
            flexGrow: "1",
            padding: "1rem",
            width: "calc(100vw - 200px)",
            maxHeight: "calc(100vh - 3rem)",
            minHeight: "calc(100vh - 3rem)",
            overflowY: "scroll",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "3rem",
              height: "fit-content",
              marginBottom: "1rem",
            }}
          >
            <Button
              onClick={() => setShowFilters(true)}
              variant="secondary"
              size="sm"
              id="responsive-filter"
            >
              All Filters
            </Button>
            <h2>All Products</h2>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <>
              {" "}
              <div className="products-wrapper">
                {products &&
                  products.length > 0 &&
                  products.map((product) => {
                    return (
                      <div className="product" key={product._id}>
                        <img
                          onClick={() => navigate("/product/" + product._id)}
                          src={product.images[0].url}
                          alt=""
                        />
                        <h6>{product.name}</h6>

                        <span>
                          <p>{product.category}</p>
                          {product.brand ? <p>{product.brand}</p> : <></>}
                        </span>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p style={{ color: "red" }}>
                            Price : &#x24;{product.price}
                          </p>

                          <div>
                            {product.stock > 0 ? (
                              <p style={{ color: "green" }}>
                                Status : In Stock
                              </p>
                            ) : (
                              <p style={{ color: "red" }}>
                                Status : Out of Stock
                              </p>
                            )}
                          </div>
                        </div>

                        {/* <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "10px",
                          }}
                        >
                          <Button
                            onClick={() => addToCart(product)}
                            size="sm"
                            style={{ width: "80%" }}
                            variant="dark"
                          >
                            Add to Cart
                          </Button>
                        </div> */}
                      </div>
                    );
                  })}
              </div>
              {/* pagination */}
              {totalPages > 1 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "2rem",
                  }}
                >
                  <Stack spacing={2}>
                    <Pagination
                      count={totalPages}
                      onChange={(e, page) => setCurrentPage(page)}
                      color="primary"
                    />
                  </Stack>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Filters Offcanvas */}
      <Offcanvas
        style={{ width: "200px" }}
        show={showFilters}
        onHide={() => setShowFilters(false)}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>All Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="responsive-filters-sidebar">
            <Sidebar currentPage={currentPage} />
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* <Footer /> */}
    </>
  );
};

export default products;
