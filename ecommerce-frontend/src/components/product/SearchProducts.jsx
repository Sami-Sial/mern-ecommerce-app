import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import axios from "axios";
import "./stylesheets/products.css";
import PageTitle from "../layout/PageTitle";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loader";
import { toast } from "react-toastify";
import ProductSkeleton from "../skeletons/ProductSkeleton";
import Footer from "../layout/Footer";

const SearchProducts = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const searchHandler = async () => {
    if (!search.trim()) {
      setProducts([]);
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/products/searched?search_query=${search}`
      );

      setProducts(data.products);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }

    setLoading(false);
  };

  // 🔥 Debounce search
  useEffect(() => {
    const delay = setTimeout(() => {
      searchHandler();
    }, 300);

    return () => clearTimeout(delay);
  }, [search]);

  return (
    <>
      <PageTitle title="Ecommerce | Search Products" />
      <Header />

      <main className="content-wrapper search-page">
        {/* SEARCH HERO */}
        <div className="search-hero">
          <h2>Find What You’re Looking For 🛍️</h2>
          <p>
            Explore top-quality products across multiple categories.
            Start typing to discover the best deals instantly.
          </p>

          <input
            className="search-input"
            type="text"
            placeholder="Search products, brands, categories..."
            value={search}
            onChange={handleInputChange}
          />
        </div>

        <h4 className="results-title">Search Results Just For You ✨</h4>

        {/* CENTERED LOADER */}
        {loading ? (
          <ProductSkeleton count={8} />
        ) : (
          <div className="products-wrapper">
            {products && products.length > 0 ? (
              products.map((product) => (
                <div className="product" key={product._id}>
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    onClick={() => navigate("/product/" + product._id)}
                  />

                  <h6>{product.name}</h6>

                  <span>
                    <p>{product.category}</p>
                    {product.brand && <p>{product.brand}</p>}
                  </span>

                  <div className="product-bottom">
                    <p className="product-price">${product.price}</p>

                    <p
                      className={`stock-status ${product.stock > 0 ? "in" : "out"
                        }`}
                    >
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </p>
                  </div>
                </div>
              ))
            ) : search.trim() ? (
              <div className="empty-state">
                <h4>😕 No products found</h4>
                <p>
                  Try searching with different keywords or explore popular
                  categories.
                </p>
              </div>
            ) : null}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default SearchProducts;
