import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetch filtered products
export const fetchFilteredProducts = createAsyncThunk(
  "fetchFilteredProducts",
  async ({ category, brand, price, ratings, currentPage }) => {
    try {
      const { data } = await axios.get(
        `https://mern-ecommerce-app-backend-bice.vercel.app/api/v1/products/filtered?category=${category}&brand=${brand}&price=${price}&ratings=${ratings}&currentPage=${currentPage}`
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return error.response?.data?.message || error.message;
    }
  }
);

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  try {
    const { data } = await axios.get(
      "https://mern-ecommerce-app-backend-bice.vercel.app/api/v1/products"
    );
    return data;
  } catch (error) {
    console.log(error);
    return error.response?.data?.message || error.message;
  }
});

// fetch product details
export const fetchProductDetails = createAsyncThunk(
  "fetchProductDetails",
  async (id) => {
    try {
      const { data } = await axios.get(
        `https://mern-ecommerce-app-backend-bice.vercel.app/api/v1/product/${id}`
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return error.response?.data?.message || error.message;
    }
  }
);

// add new review
export const newReview = createAsyncThunk(
  "newReview",
  async ({ rating, comment, productId }) => {
    try {
      const { data } = await axios.put(
        "https://mern-ecommerce-app-backend-bice.vercel.app/api/v1/review",
        { rating, comment, productId },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return error.response?.data.message;
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    totalPages: 0,
    isLoading: false,
    product: {},
    error: null,
  },

  reducers: {
    clearProductState: (state) => {
      state.error = null;
      state.reviewSuccess = null;
    },
  },

  extraReducers: (builder) => {
    // fetch products with filters
    builder.addCase(fetchFilteredProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFilteredProducts.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(fetchFilteredProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.products) {
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
      } else {
        state.error = action.payload;
      }
    });

    // fetch products with filters
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;

      action.payload.products
        ? (state.products = action.payload.products)
        : (state.error = action.payload);
    });

    // fetch product details
    builder.addCase(fetchProductDetails.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductDetails.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
      state.isLoading = false;

      if (action.payload.product) {
        state.product = action.payload.product;
      } else {
        state.error = action.payload;
      }
    });

    // add new review
    builder.addCase(newReview.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(newReview.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(newReview.fulfilled, (state, action) => {
      state.isLoading = false;
      action.payload.success
        ? (state.reviewSuccess = action.payload.success)
        : (state.error = action.payload);
    });
  },
});

export const { clearProductState } = productSlice.actions;

export default productSlice.reducer;
