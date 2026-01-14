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
    <div className="filter-sidebar">
      <h5>Filters</h5>

      <div>
        <h6>Category</h6>
        {categories &&
          categories.map((category) => (
            <div className="checkbox" key={category}>
              <input
                type="checkbox"
                onChange={(e) => handleCategoryFilters(category)}
                id={category}
              />
              <label htmlFor={category}>{category}</label>
            </div>
          ))}
      </div>

      <div>
        <h6>Price Range</h6>
        <Slider
          value={price}
          onChange={(e, newPrice) => setPrice(newPrice)}
          valueLabelDisplay="auto"
          aria-labelledby="price-slider"
          size="medium"
          min={0}
          max={10000}
        />
        <div className="filter-value-display">
          <span>Min: ₹0</span>
          <span>Max: ₹{price}</span>
        </div>
      </div>

      <div>
        <h6>Ratings</h6>
        <Slider
          value={ratings}
          onChange={(e, newRating) => {
            setRatings(newRating);
          }}
          aria-labelledby="rating-slider"
          valueLabelDisplay="auto"
          min={0}
          max={5}
          step={0.5}
          size="medium"
          marks={[
            { value: 0, label: "0★" },
            { value: 5, label: "5★" },
          ]}
        />
        <div className="filter-value-display">
          <span>⭐ {ratings.toFixed(1)} & above</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
