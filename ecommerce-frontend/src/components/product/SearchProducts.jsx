import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import axios from "axios";
import "./stylesheets/products.css";
import PageTitle from "../layout/PageTitle";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProductSkeleton from "../skeletons/ProductSkeleton";
import Footer from "../layout/Footer";
import StarIcon from "@mui/icons-material/Star";
import Button from "react-bootstrap/Button";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";

const SearchProducts = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const navigate = useNavigate();

  const searchHandler = async () => {
    if (!search.trim()) {
      setProducts([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/products/searched?search_query=${search}`
      );
      setProducts(data.products || []);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Debounce
  useEffect(() => {
    const timer = setTimeout(searchHandler, 400);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <>
      <PageTitle title="Ecommerce | Search Products" />
      <Header />

      <main className="search-page">
        {/* HERO */}
        <div className="search-hero">
          <h2>Find What You're Looking For 🛍️</h2>
          <p>Start typing to discover products instantly</p>

          <input
            className="search-input"
            type="text"
            placeholder="Search products, brands, categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* RESULTS HEADER */}
        {hasSearched && !loading && products.length > 0 && (
          <div className="products-header">
            <div>
              <h2>Search Results</h2>
              <p>{products.length} products found</p>
            </div>

            <div className="view-toggle">
              <button
                className={`view-btn-toggle ${
                  viewMode === "grid" ? "active" : ""
                }`}
                onClick={() => setViewMode("grid")}
              >
                <GridViewIcon />
              </button>
              <button
                className={`view-btn-toggle ${
                  viewMode === "list" ? "active" : ""
                }`}
                onClick={() => setViewMode("list")}
              >
                <ViewListIcon />
              </button>
            </div>
          </div>
        )}

        {/* CONTENT */}
        <div className="results-wrapper">
          {loading && <ProductSkeleton count={8} />}

          {!loading && hasSearched && products.length === 0 && (
            <div className="empty-state">
              <h3>😕 No products found</h3>
              <p>Try different keywords</p>
            </div>
          )}

          {!loading && products.length > 0 && (
            <div className={`products-${viewMode}`}>
              {products.map((product) => (
                <div
                  className={`product-card ${viewMode}-view`}
                  key={product._id}
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <div className="product-image-wrapper">
                    <img
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
                      <p className="product-price">${product.price}</p>

                      <div className="product-rating">
                        <div className="rating-stars">
                          <StarIcon sx={{ fontSize: 14 }} />
                          <span>{product.ratings?.toFixed(1) || "0.0"}</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      className="view-product-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${product._id}`);
                      }}
                    >
                      View Product
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default SearchProducts;
