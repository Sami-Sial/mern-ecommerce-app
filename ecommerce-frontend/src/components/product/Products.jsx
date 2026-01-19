import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFilteredProducts } from "../../redux-toolkit/slices/product.slice";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Sidebar from "./Sidebar";
import "./stylesheets/products.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import PageTitle from "../layout/PageTitle";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Offcanvas from "react-bootstrap/Offcanvas";
import Loader from "../layout/Loader";
import { toast } from "react-toastify";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import ProductSkeleton from "../skeletons/ProductSkeleton";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  const { totalPages, products, isLoading, error } = useSelector(
    (state) => state.productSlice
  );

  useEffect(() => {
    dispatch(fetchFilteredProducts({ page: currentPage }));

    if (error) toast.error(error);
  }, [dispatch, currentPage, error]);

  return (
    <>
      <PageTitle title="ShopVerse | Products" />
      <Header />

      <main className="products-page">
        {/* SIDEBAR */}
        <aside className="sidebar-wrapper">
          <Sidebar currentPage={currentPage} />
        </aside>

        {/* PRODUCTS */}
        <section className="products-area">
          <div className="products-header">
            <div>
              <h2>Shop the Collection</h2>
              <p>Trending now • Best picks • Top brands 🔥</p>
            </div>

            <div className="header-controls">
              {/* VIEW TOGGLE */}
              <div className="view-toggle">
                <button
                  className={`view-btn-toggle ${viewMode === "grid" ? "active" : ""}`}
                  onClick={() => setViewMode("grid")}
                  title="Grid View"
                >
                  <GridViewIcon sx={{ fontSize: 20 }} />
                </button>
                <button
                  className={`view-btn-toggle ${viewMode === "list" ? "active" : ""}`}
                  onClick={() => setViewMode("list")}
                  title="List View"
                >
                  <ViewListIcon sx={{ fontSize: 20 }} />
                </button>
              </div>

              <Button
                id="responsive-filter"
                size="sm"
                onClick={() => setShowFilters(true)}
              >
                All Filters
              </Button>
            </div>
          </div>

          {isLoading ? (
            <ProductSkeleton />
          ) : (
            <>
              <div className={`products-${viewMode}`}>
                {products?.map((product) => (
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
                        <p className="product-price">
                          ${product.price}
                        </p>

                        <div className="product-rating">
                          <div className="rating-stars">
                            <StarIcon sx={{ fontSize: 14 }} />
                            <span>
                              {product.ratings?.toFixed(1) || "0.0"}
                            </span>
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

              {totalPages > 1 && (
                <div className="pagination-wrapper">
                  <Stack spacing={2}>
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={(e, page) => setCurrentPage(page)}
                    />
                  </Stack>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      {/* MOBILE FILTERS */}
      <Offcanvas
        placement="start"
        show={showFilters}
        onHide={() => setShowFilters(false)}
      >
        <Offcanvas.Header closeButton />
        <Offcanvas.Body>
          <Sidebar currentPage={currentPage} />
        </Offcanvas.Body>
      </Offcanvas>

      <Footer />
    </>
  );
};

export default Products;