import "./stylesheets/Home.css";
import React, { useEffect } from "react";
import HomeCarousel from "./HomeCarousel";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import PageTitle from "../layout/PageTitle";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../redux-toolkit/slices/product.slice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Loader from "../layout/Loader";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector(
    (state) => state.productSlice
  );
  console.log(products);
  console.log(products);
  useEffect(() => {
    dispatch(fetchProducts());

    if (error) {
      toast.error(error);
    }
  }, [dispatch, error]);

  return (
    <>
      <PageTitle title={"Ecommerce-homepage"} />
      <Header />
      <main
        className="content-wrapper"
        style={{
          width: "100vw",
          maxHeight: "calc(100vh - 3rem)",
          padding: "0",
        }}
      >
        <HomeCarousel />

        {/* Featured products */}
        <div>
          <h3 style={{ textAlign: "center", padding: "1rem" }}>
            Featured Products
          </h3>

          {loading ? (
            <Loader />
          ) : (
            <>
              {" "}
              <div className="products-wrapper">
                {products &&
                  products.length > 0 &&
                  products.map(
                    (product) =>
                      product.featured && (
                        <div
                          style={{ position: "relative" }}
                          className="product"
                          key={product._id}
                        >
                          <FavoriteIcon
                            style={{
                              position: "absolute",
                              left: "10px",
                              top: "0px",
                              color: "gray",
                            }}
                          />
                          <img
                            onClick={() => navigate("/product/" + product._id)}
                            src={product.images[0]?.url}
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
                              Price : ₹{product.price}
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
                      )
                  )}
              </div>
            </>
          )}
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default Home;
