import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk("createOrder", async (order) => {
  try {
    const { data } = await axios.post(
      "https://mern-ecommerce-app-backend-one.vercel.app/api/v1/order/new",
      { ...order },
      {
        headers: [
          { "Content-Type": "application/json" },
          { Authorization: `Bearer ${localStorage.getItem("token")}` },
        ],
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error.response?.data.message;
  }
});

export const myOrders = createAsyncThunk("myOrders", async (order) => {
  try {
    const { data } = await axios.get(
      "https://mern-ecommerce-app-backend-one.vercel.app/api/v1/orders/me",
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error.response?.data.message;
  }
});

export const getOrderDetails = createAsyncThunk(
  "getOrderDetails",
  async (id) => {
    try {
      const { data } = await axios.get(
        `https://mern-ecommerce-app-backend-one.vercel.app/api/v1/order/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return error.response?.data.message;
    }
  }
);

export const allProductsSlice = createSlice({
  name: "products",
  initialState: {
    order: {},
    orders: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    // create new order
    builder.addCase(createOrder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.isLoading = false;

      if (action.payload.order) {
        state.order = action.payload.order;
      } else {
        state.error = action.payload;
      }
    });

    // get orders
    builder.addCase(myOrders.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(myOrders.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(myOrders.fulfilled, (state, action) => {
      state.isLoading = false;

      action.payload.orders
        ? (state.orders = action.payload.orders)
        : (state.error = action.payload);
    });

    // get single order details
    builder.addCase(getOrderDetails.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getOrderDetails.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(getOrderDetails.fulfilled, (state, action) => {
      state.isLoading = false;

      action.payload.order
        ? (state.order = action.payload.order)
        : (state.error = action.payload);
    });
  },
});

export default allProductsSlice.reducer;
