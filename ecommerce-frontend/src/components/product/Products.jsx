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
        <Sidebar currentPage={currentPage} />

        <div
          id="products"
          className="content-wrapper"
          style={{
            flexGrow: "1",
            padding: "1rem",
            width: "calc(100vw - 200px)",
            maxHeight: "calc(100vh - 3rem)",
          }}
        >
          <h4 style={{ marginBottom: "2rem" }}>All Products</h4>

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

      {/* <Footer /> */}
    </>
  );
};

export default products;
