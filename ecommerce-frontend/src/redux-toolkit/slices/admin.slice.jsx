import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllOrders = createAsyncThunk(
  "getAllOrders",
  async (currentPage) => {
    try {
      const { data } = await axios.get(
        `https://mern-ecommerce-app-backend-bice.vercel.app/api/v1/admin/orders?currentPage=${currentPage}`,
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

export const processOrder = createAsyncThunk("processOrder", async (id) => {
  try {
    const { data } = await axios.put(
      `https://mern-ecommerce-app-backend-bice.vercel.app/api/v1/admin/order/${id}`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error.response?.data.message;
  }
});

export const deleteOrder = createAsyncThunk("deleteOrder", async (id) => {
  try {
    const { data } = await axios.delete(
      `https://mern-ecommerce-app-backend-bice.vercel.app/api/v1/admin/order/${id}`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error.response?.data.message;
  }
});

export const getAllUsers = createAsyncThunk(
  "getAllUsers",
  async (currentPage) => {
    try {
      const { data } = await axios.get(
        `https://mern-ecommerce-app-backend-bice.vercel.app/api/v1/admin/users?currentPage=${currentPage}`,
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

export const deleteUser = createAsyncThunk("deleteUser", async (id) => {
  try {
    const { data } = await axios.delete(
      "https://mern-ecommerce-app-backend-bice.vercel.app/api/v1/admin/user/" +
        id,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error.response?.data.message;
  }
});

export const updateUserRole = createAsyncThunk(
  "updateUserRole",
  async ({ id, role }) => {
    try {
      const { data } = await axios.put(
        "https://mern-ecommerce-app-backend-bice.vercel.app/api/v1/admin/user/" +
          id,
        { id, role },
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
  }
);

export const getAdminProducts = createAsyncThunk(
  "getAdminProducts",
  async (currentPage) => {
    try {
      const { data } = await axios.get(
        `https://mern-ecommerce-app-backend-bice.vercel.app/api/v1/admin/products?currentPage=${currentPage}`,
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

export const createProduct = createAsyncThunk(
  "createProduct",
  async ({ name, price, description, category, stock, images }) => {
    console.log(images);
    try {
      const { data } = await axios.post(
        "https://mern-ecommerce-app-backend-bice.vercel.app/api/v1/admin/product/new",
        { name, price, description, category, stock, images },
        {
          headers: [
            { "Content-Type": "multipart/form-data" },
            { Authorization: `Bearer ${localStorage.getItem("token")}` },
          ],
        }
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
      console.log(error.response.data.message);
      return error.response?.data.message;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "updateProduct",
  async ({ myForm, id }) => {
    console.log(myForm);
    try {
      const { data } = await axios.put(
        "https://mern-ecommerce-app-backend-bice.vercel.app/api/v1/admin/product/" +
          id,
        myForm,
        {
          headers: [
            { "Content-Type": "multipart/form-data" },
            { Authorization: `Bearer ${localStorage.getItem("token")}` },
          ],
        }
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
      console.log(error.response.data.message);
      return error.response?.data.message;
    }
  }
);

export const deleteProduct = createAsyncThunk("deleteProduct", async (id) => {
  try {
    const { data } = await axios.delete(
      `https://mern-ecommerce-app-backend-bice.vercel.app/api/v1/admin/product/${id}`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.message);
    console.log(error.response.data.message);
    return error.response?.data.message;
  }
});

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    products: [],
    orders: [],
    users: [],
    isLoading: false,
    error: null,
    productsCount: null,
    totalUsersPages: null,
    totalAdminProdutsPages: null,
    totalOrdersPages: null,
  },

  reducers: {
    clearAdminState: (state) => {
      state.deleteOrderSuccess = false;
      state.orderProcessSuccess = false;
      state.error = null;
      state.productDeleteSuccess = false;
      state.userRoleUpdateSuccess = false;
      state.createProductSuccess = false;
      state.deleteUserSuccess = false;
    },
  },

  extraReducers: (builder) => {
    // get all orders admin
    builder.addCase(getAllOrders.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllOrders.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.isLoading = false;

      if (action.payload.orders) {
        state.orders = action.payload.orders;
        state.totalOrdersPages = action.payload.totalOrdersPages;
      } else {
        state.error = action.payload;
      }
    });

    // process order
    builder.addCase(processOrder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(processOrder.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(processOrder.fulfilled, (state, action) => {
      state.isLoading = false;

      if (action.payload?.success) {
        state.orderProcessSuccess = true;
      } else {
        state.error = action.payload;
      }
    });

    // delete order
    builder.addCase(deleteOrder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteOrder.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      state.isLoading = false;

      if (action.payload?.success) {
        state.deleteOrderSuccess = true;
      } else {
        state.error = action.payload;
      }
    });

    // get all users admin
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;

      if (action.payload.users) {
        state.users = action.payload.users;
        state.totalUsersPages = action.payload.totalUsersPages;
      } else {
        state.error = action.payload;
      }
    });

    // delete user admin
    builder.addCase(deleteUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;

      if (action.payload?.success) {
        state.deleteUserSuccess = true;
      } else {
        state.error = action.payload;
      }
    });

    // update user role admin
    builder.addCase(updateUserRole.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserRole.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(updateUserRole.fulfilled, (state, action) => {
      state.isLoading = false;

      if (action.payload?.success) {
        state.userRoleUpdateSuccess = true;
      } else {
        state.error = action.payload;
      }
    });

    // get all products admin
    builder.addCase(getAdminProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAdminProducts.rejected, (state, action) => {
      console.log("Error ", action.payload);
      state.error = action.payload;
      console.log("rejected", state.error);
    });
    builder.addCase(getAdminProducts.fulfilled, (state, action) => {
      state.isLoading = false;

      if (action.payload?.products) {
        state.products = action.payload.products;
        state.totalAdminProdutsPages = action.payload.totalAdminProdutsPages;
      } else {
        state.error = action.payload;
      }
    });

    // create product admin
    builder.addCase(createProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      console.log("Error ", action.payload);
      state.error = action.payload;
      console.log("rejected", state.error);
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.isLoading = false;

      if (action.payload.newProduct) {
        state.createProductSuccess = true;
      } else {
        state.error = action.payload;
      }
    });

    // update product admin
    builder.addCase(updateProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      console.log("Error ", action.payload);
      state.error = action.payload;
      console.log("rejected", state.error);
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.isLoading = false;

      if (action.payload?.product) {
        // state.product = action.payload.product;
      } else {
        state.error = action.payload;
      }
    });

    // delete product admin
    builder.addCase(deleteProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.isLoading = false;

      if (action.payload?.success) {
        state.productDeleteSuccess = true;
      } else {
        state.error = action.payload;
      }
    });
  },
});

export const { clearAdminState } = adminSlice.actions;

export default adminSlice.reducer;
