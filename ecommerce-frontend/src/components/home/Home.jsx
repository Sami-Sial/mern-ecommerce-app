import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../redux-toolkit/slices/product.slice";
import { toast } from "react-toastify";
import HeroSection from "./HeroSection";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import PageTitle from "../layout/PageTitle";
import ProductSkeleton from "../skeletons/ProductSkeleton";
import "./stylesheets/Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isLoading, error } = useSelector(
    (state) => state.productSlice
  );

  useEffect(() => {
    dispatch(fetchProducts());
    if (error) {
      toast.error(error);
    }
  }, [dispatch, error]);

  const newestArrivals = products
    ? [...products]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 8)
    : [];

  return (
    <>
      <PageTitle title={"ShopVerse | Shop Quality Products"} />
      <Header />
      <main className="home-main">
        <HeroSection />

        {/* Newest Arrivals */}
        <section className="products-section">
          <h2 className="section-header">
            Newest Arrivals
            <span className="header-underline"></span>
          </h2>

          {isLoading ? (
            <div style={{ padding: "1rem" }}>
              {" "}
              <ProductSkeleton count={8} />
            </div>
          ) : (
            <div className="products-wrapper">
              {newestArrivals.map((product) => (
                <div key={product._id} className="product-card">
                  <div className="product-image-wrapper">
                    <img
                      onClick={() => navigate(`/product/${product._id}`)}
                      src={product.images[0]?.url}
                      alt={product.name}
                      className="product-image"
                    />
                  </div>

                  <div className="product-content">
                    <h3 className="product-title">{product.name}</h3>

                    <div className="product-tags">
                      <span className="tag tag-primary">
                        {product.category}
                      </span>
                      {product.brand && (
                        <span className="tag tag-secondary">
                          {product.brand}
                        </span>
                      )}
                    </div>

                    <div className="product-footer">
                      <p className="product-price">
                        ₹{product.price.toLocaleString()}
                      </p>

                      <div className="product-rating">
                        <div className="rating-stars">
                          <span className="star-icon">⭐</span>
                          <span className="rating-value">
                            {product.ratings?.toFixed(1) || "0.0"}
                          </span>
                        </div>
                        <span className="review-count">
                          ({product.numOfReviews || 0})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Featured Products */}
        <section className="products-section">
          <h2 className="section-header">
            Featured Products
            <span className="header-underline"></span>
          </h2>

          {loading || products.length === 0 ? (
            <div style={{ padding: "1rem" }}>
              {" "}
              <ProductSkeleton count={8} />
            </div>
          ) : (
            <div className="products-wrapper">
              {products?.map(
                (product) =>
                  product.featured && (
                    <div key={product._id} className="product-card">
                      <div className="product-image-wrapper">
                        <img
                          onClick={() => navigate(`/product/${product._id}`)}
                          src={product.images[0]?.url}
                          alt={product.name}
                          className="product-image"
                        />
                      </div>

                      <div className="product-content">
                        <h3 className="product-title">{product.name}</h3>

                        <div className="product-tags">
                          <span className="tag tag-primary">
                            {product.category}
                          </span>
                          {product.brand && (
                            <span className="tag tag-secondary">
                              {product.brand}
                            </span>
                          )}
                        </div>

                        <div className="product-footer">
                          <p className="product-price">
                            ₹{product.price.toLocaleString()}
                          </p>

                          <div className="product-rating">
                            <div className="rating-stars">
                              <span className="star-icon">⭐</span>
                              <span className="rating-value">
                                {product.ratings?.toFixed(1) || "0.0"}
                              </span>
                            </div>
                            <span className="review-count">
                              ({product.numOfReviews || 0})
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          )}
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Home;
