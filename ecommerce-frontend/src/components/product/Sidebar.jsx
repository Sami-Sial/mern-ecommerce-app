import React, { useEffect, useRef, useState } from "react";
import "./stylesheets/Sidebar.css";
import { useDispatch } from "react-redux";
import { fetchFilteredProducts } from "../../redux-toolkit/slices/product.slice";
import Slider from "@mui/material/Slider";

const Sidebar = ({ currentPage }) => {
  const dispatch = useDispatch();
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [brandFilters, setBrandFilters] = useState([]);
  const [ratings, setRatings] = useState(0);
  const [price, setPrice] = useState(0);
  console.log(currentPage);

  const categories = [
    "men's clothing",
    "women's clothing",
    "electronics",
    "beauty",
    "furniture",
    "groceries",
    "jewelery",
    "fragrances",
  ];
  // const brands = ["nike", "adidas", "puma", "levis", "zara"];

  const handleCategoryFilters = (selectedCategory) => {
    if (categoryFilters.includes(selectedCategory)) {
      let filters = categoryFilters.filter((el) => el !== selectedCategory);
      setCategoryFilters(filters);
    } else {
      setCategoryFilters([...categoryFilters, selectedCategory]);
    }
  };

  const handleBrandFilters = (selectedBrand) => {
    if (brandFilters.includes(selectedBrand)) {
      let filters = brandFilters.filter((el) => el !== selectedBrand);
      setBrandFilters(filters);
    } else {
      setBrandFilters([...brandFilters, selectedBrand]);
    }
  };

  useEffect(() => {
    const category = categoryFilters.join(",");
    const brand = brandFilters.join(",");

    dispatch(
      fetchFilteredProducts({ category, brand, price, ratings, currentPage })
    );
  }, [categoryFilters, brandFilters, price, ratings, currentPage]);

  return (
    <div className="sidebar">
      <h5 style={{ marginBottom: "1rem" }}>Filters</h5>

      <div style={{ marginBottom: "20px" }}>
        <h6>Category</h6>
        {categories &&
          categories.map((category) => (
            <div className="checkbox">
              <input
                type="checkbox"
                onChange={(e) => handleCategoryFilters(category)}
                id={category}
              />
              <label htmlFor={category}>{category}</label>
            </div>
          ))}
      </div>

      {/* <div style={{ marginBottom: "20px" }}>
        <h6>Brand</h6>
        {brands &&
          brands.map((brand) => (
            <div className="checkbox">
              <input
                type="checkbox"
                onChange={(e) => handleBrandFilters(brand)}
                id={brand}
              />
              <label htmlFor={brand}>{brand}</label>
            </div>
          ))}
      </div> */}

      <div style={{ marginBottom: "20px" }}>
        <h6>Price</h6>
        <Slider
          value={price}
          onChange={(e, newPrice) => setPrice(newPrice)}
          valueLabelDisplay="auto"
          aria-labelledby="continuous-slider"
          size="small"
          min={0}
          max={1000}
          color="danger"
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h6>Ratings</h6>
        <Slider
          value={ratings}
          onChange={(e, newRating) => {
            setRatings(newRating);
          }}
          aria-labelledby="continuous-slider"
          valueLabelDisplay="auto"
          min={0}
          max={5}
          color="danger"
          size="small"
        />
      </div>
    </div>
  );
};

export default Sidebar;
