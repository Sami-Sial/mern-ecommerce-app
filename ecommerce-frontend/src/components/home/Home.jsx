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

// Style Objects
const styles = {
  sectionHeader: {
    textAlign: "center",
    padding: "1rem 0",
    fontSize: "2rem",
    fontWeight: 700,
    color: "#1a1a1a",
    position: "relative",
    marginBottom: "1rem",
    "::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "80px",
      height: "4px",
      background: "linear-gradient(90deg, #000000, #333333)",
      borderRadius: "2px",
    },
  },

  productsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: "1rem 2rem 3rem",
    gap: "1.5rem",
    maxWidth: "1400px",
    margin: "0 auto",
  },

  productCard: {
    width: "calc(25% - 1.2rem)",
    background: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "16px",
    padding: "1rem",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    animation: "fadeIn 0.5s ease-out",
    ":hover": {
      transform: "translateY(-8px)",
      boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
      borderColor: "#000000",
    },
  },

  topBorder: {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "4px",
    background: "linear-gradient(90deg, #000000, #434343, #666666)",
    transform: "scaleX(0)",
    transformOrigin: "left",
    transition: "transform 0.3s ease",
  },

  productImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "12px",
    border: "1px solid #f0f0f0",
    background: "#f9f9f9",
    transition: "all 0.3s ease",
    cursor: "pointer",
    ":hover": {
      transform: "scale(1.05)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
  },

  productTitle: {
    fontSize: "1.1rem",
    fontWeight: 600,
    color: "#2c3e50",
    margin: "0.8rem 0 0.5rem",
    lineHeight: 1.4,
    minHeight: "2.8rem",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },

  tagsContainer: {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "0.8rem",
    flexWrap: "wrap",
  },

  tag: {
    padding: "0.25rem 0.75rem",
    margin: 0,
    fontSize: "0.75rem",
    fontWeight: 600,
    background: "#000000",
    color: "white",
    borderRadius: "20px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  secondaryTag: {
    background: "#333333",
  },

  productBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "1rem",
    paddingTop: "0.8rem",
    borderTop: "1px solid #f0f0f0",
  },

  price: {
    fontSize: "1.25rem",
    fontWeight: 800,
    color: "#e63946",
    margin: 0,
    letterSpacing: "0.5px",
  },

  ratingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "0.15rem",
    lineHeight: 1.1,
  },

  stars: {
    display: "flex",
    alignItems: "center",
    gap: "0.35rem",
    fontSize: "1rem",
    fontWeight: 700,
    color: "#f1c40f",
  },

  reviewCount: {
    fontSize: "0.75rem",
    color: "#6c757d",
    fontWeight: 500,
    marginTop: "-2px",
  },

  // Responsive adjustments (you can use media queries in CSS or libraries like styled-components)
  // Here we use basic mobile-first approach with smaller values
  productCardMobile: {
    width: "calc(50% - 0.8rem)",
  },

  productCardVerySmall: {
    width: "85%",
    maxWidth: "400px",
  },
};

// Note: Pseudo-elements (:before, :after) and :hover don't work directly in inline styles
// We use separate elements or conditional styling for hover effects

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.productSlice);

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
      <main style={{ width: "100vw", padding: 0 }}>
        <HeroSection />

        {/* Newest Arrivals */}
        <div>
          <h3 style={styles.sectionHeader}>Newest Arrivals</h3>

          {loading || products.length === 0 ? (
            <ProductSkeleton count={8} />
          ) : (
            <div style={styles.productsWrapper}>
              {newestArrivals.map((product) => (
                <div
                  key={product._id}
                  style={{
                    ...styles.productCard,
                    // You can add media query logic here with window size or use CSS
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
                    e.currentTarget.style.borderColor = "#000000";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
                    e.currentTarget.style.borderColor = "#e0e0e0";
                  }}
                >
                  {/* Top colorful border on hover */}
                  <div
                    style={{
                      ...styles.topBorder,
                      transform: "scaleX(0)",
                      transition: "transform 0.3s ease",
                    }}
                    className="top-border"
                  />

                  <img
                    onClick={() => navigate(`/product/${product._id}`)}
                    src={product.images[0]?.url}
                    alt={product.name}
                    style={styles.productImage}
                  />

                  <h6 style={styles.productTitle}>{product.name}</h6>

                  <div style={styles.tagsContainer}>
                    <p style={styles.tag}>{product.category}</p>
                    {product.brand && <p style={{ ...styles.tag, ...styles.secondaryTag }}>{product.brand}</p>}
                  </div>

                  <div style={styles.productBottom}>
                    <p style={styles.price}>₹{product.price}</p>

                    <div style={styles.ratingContainer}>
                      <span style={styles.stars}>
                        ⭐ {product.ratings?.toFixed(1) || "0.0"}
                      </span>
                      <span style={styles.reviewCount}>
                        ({product.numOfReviews || 0} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Featured Products */}
        <div>
          <h3 style={styles.sectionHeader}>Featured Products</h3>

          {loading || products.length === 0 ? (
            <ProductSkeleton count={8} />
          ) : (
            <div style={styles.productsWrapper}>
              {products?.map(
                (product) =>
                  product.featured && (
                    <div
                      key={product._id}
                      style={styles.productCard}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-8px)";
                        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
                      }}
                    >
                      <img
                        onClick={() => navigate(`/product/${product._id}`)}
                        src={product.images[0]?.url}
                        alt={product.name}
                        style={styles.productImage}
                      />

                      <h6 style={styles.productTitle}>{product.name}</h6>

                      <div style={styles.tagsContainer}>
                        <p style={styles.tag}>{product.category}</p>
                        {product.brand && <p style={{ ...styles.tag, ...styles.secondaryTag }}>{product.brand}</p>}
                      </div>

                      <div style={styles.productBottom}>
                        <p style={styles.price}>₹{product.price}</p>

                        <div style={styles.ratingContainer}>
                          <span style={styles.stars}>
                            ⭐ {product.ratings?.toFixed(1) || "0.0"}
                          </span>
                          <span style={styles.reviewCount}>
                            ({product.numOfReviews || 0} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          )}
        </div>

        <Footer />
      </main>
    </>
  );
};

export default Home;