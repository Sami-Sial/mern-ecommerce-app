import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import axios from "axios";
import image from "../../assets/herosection_img2.jpg";
import Button from "react-bootstrap/esm/Button";
import "./stylesheets/products.css";
import PageTitle from "../layout/PageTitle";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loader";

const SearchProducts = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const searcHandler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://mern-ecommerce-app-backend-one.vercel.app/api/v1/products/searched?search_query=${search}`
      );

      setProducts(data.products);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    searcHandler();
  }, [search]);

  return (
    <>
      <PageTitle title={"Ecommerce-Search products"} />
      <Header />
      <main
        className="content-wrapper"
        style={{
          padding: "2rem",
          width: "100vw",
          maxHeight: "calc(100vh - 3rem)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <input
            style={{
              width: "80vw",
              padding: "5px 10px",
              borderRadius: "10px",
            }}
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>

        <h4 style={{ textAlign: "center", margin: "1rem" }}>Search Results</h4>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="products-wrapper">
              {products && Array.isArray(products) ? (
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
                            <p style={{ color: "green" }}>Status : In Stock</p>
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
                })
              ) : (
                <h4 style={{ textAlign: "center", paddingTop: "4rem" }}>
                  No results found!
                </h4>
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default SearchProducts;
