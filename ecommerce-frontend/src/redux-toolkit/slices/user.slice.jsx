import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signup = createAsyncThunk(
  "signup",
  async ({ name, email, password, avatar }) => {
    console.log(avatar);
    try {
      const { data } = await axios.post(
        "https://mern-ecommerce-app-backend-bice.vercel.app/api/v1/register",
        { name, email, password, avatar },
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log(data.token);
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      console.log(error);
      return error.response.data?.message
        ? error.response.data.message
        : error.message;
    }
  }
);

export const login = createAsyncThunk("login", async ({ email, password }) => {
  try {
    const { data } = await axios.post(
      "https://mern-ecommerce-app-backend-bice.vercel.app/api/v1/login",
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    console.log(data.token);
    localStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    console.log(error);
    return error.response.data?.message
      ? error.response.data.message
      : error.message;
  }
});

export const loginWithGoogle = createAsyncThunk(
  "loginWithGoogle",
  async (formData) => {
    try {
      const { data } = await axios.post(
        "https://mern-ecommerce-app-backend-bice.vercel.app/api/v1/login/google",
        { ...formData },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(data.token);
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      console.log(error);
      return error.response.data?.message
        ? error.response.data.message
        : error.message;
    }
  }
);

export const logout = createAsyncThunk("logout", async () => {
  try {
    const { data } = await axios.get(
      "https://mern-ecommerce-app-backend-bice.vercel.app/api/v1/logout"
    );

    console.log(data);
    localStorage.setItem("token", "");
    return data;
  } catch (error) {
    console.log(error.message);
    console.log(error.response.data.message);
    return error.response.data.message;
  }
});

export const loadUser = createAsyncThunk("loadUser", async () => {
  try {
    const { data } = await axios.get(
      "https://mern-ecommerce-app-backend-bice.vercel.app/api/v1/me",
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
});

export const updateProfile = createAsyncThunk(
  "updateProfile",
  async ({ name, email, avatar }) => {
    const sendedData = { name, email, avatar };
    console.log(sendedData);
    try {
      const { data } = await axios.put(
        "https://mern-ecommerce-app-backend-bice.vercel.app/api/v1/me/update",
        sendedData,
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
      console.log(error);
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const updatePassword = createAsyncThunk(
  "updatePassword",
  async ({ oldPassword, newPassword, confirmPassword }) => {
    try {
      const { data } = await axios.put(
        `https://mern-ecommerce-app-backend-bice.vercel.app/api/v1/password/update`,
        { oldPassword, newPassword, confirmPassword },
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
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async (email) => {
    try {
      const { data } = await axios.post(
        `https://mern-ecommerce-app-backend-bice.vercel.app/api/v1/password/forgot`,
        { email },
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
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const resetPassword = createAsyncThunk(
  "resetPassword",
  async ({ token, password, confirmPassword }) => {
    try {
      const { data } = await axios.put(
        `https://mern-ecommerce-app-backend-bice.vercel.app/api/v1/password/reset/${token}`,
        { token, password, confirmPassword },
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
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

// add items to cart
export const addItemsToCart = createAsyncThunk(
  "addItemsToCart",
  async ({ id, quantity = 1 }) => {
    try {
      let url =
        "https://mern-ecommerce-app-backend-bice.vercel.app/api/v1/product/" +
        id;
      const { data } = await axios.get(url);

      console.log(data);
      return { ...data.product, quantity };
    } catch (error) {
      console.log(error);
      return error.response?.data.message;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },

  reducers: {
    deleteCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i._id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = { ...action.payload };
      localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
    },
    clearUserState: (state) => {
      state.error = null;
      state.addedToCartSuccess = null;
      state.signupSuccess = false;
      state.signupError = false;
      state.loginSuccess = null;
      state.loginError = null;
      state.passwordUpdateSuccess = false;
    },
  },

  extraReducers: (builder) => {
    // signup
    builder.addCase(signup.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.user) {
        state.user = action.payload.user;
        state.signupSuccess = true;
        state.signupError = null;
      } else {
        state.signupError = action.payload;
      }
    });

    // login
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginError = action.payload;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log("fulfilled");
      if (action.payload.user) {
        state.loginSuccess = true;
        state.user = action.payload.user;
        state.loginError = null;
      } else {
        state.loginError = action.payload;
      }
    });

    // Login with Google
    builder.addCase(loginWithGoogle.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginWithGoogle.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(loginWithGoogle.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.user) {
        state.user = action.payload.user;
        state.loginSuccess = true;
        state.loginError = null;
      } else {
        state.loginError = action.payload;
      }
    });

    // logout
    builder.addCase(logout.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(logout.rejected, (state, action) => {
      console.log("Error ", action.payload);
      console.log("rejected");
      state.error = action.payload;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log("fulfilled");
      if (action.payload.success) {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
        localStorage.setItem("cartItems", []);
      } else {
        state.error = action.payload;
      }
    });

    // load user
    builder.addCase(loadUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      console.log("Error ", action.payload);
      console.log("rejected");
      state.error = action.payload;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log("fulfilled");
      if (action.payload.user) {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
        state.isUpdated = false;
      } else {
        state.error = action.payload;
      }
    });

    // updateProfile
    builder.addCase(updateProfile.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      console.log("Error ", action.payload);
      console.log("rejected");
      state.error = action.payload;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log("fulfilled");
      if (action.payload.user) {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
        state.isUpdated = true;
      } else {
        state.error = action.payload;
      }
    });

    // update password
    builder.addCase(updatePassword.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      console.log("Error ", action.payload);
      console.log("rejected");
      state.error = action.payload;
    });
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log("fulfilled");

      if (action.payload.success) {
        state.error = null;
        state.passwordUpdateSuccess = true;
      } else {
        state.error = action.payload;
      }
    });

    // forgot password
    builder.addCase(forgotPassword.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      console.log("Error ", action.payload);
      console.log("rejected");
      state.error = action.payload;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log("fulfilled");
      if (action.payload.success) {
        state.error = null;
        state.message = action.payload.message;
      } else {
        state.error = action.payload;
      }
    });

    // reset password
    builder.addCase(resetPassword.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      console.log("Error ", action.payload);
      console.log("rejected");
      state.error = action.payload;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log("fulfilled");
      if (action.payload.success) {
        state.error = null;
        state.success = action.payload.success;
      } else {
        state.error = action.payload;
      }
    });

    // add items to cart
    builder.addCase(addItemsToCart.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addItemsToCart.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(addItemsToCart.fulfilled, (state, action) => {
      state.isLoading = false;

      if (action.payload.user) {
        const item = action.payload;
        state.addedToCartSuccess = true;

        const isItemExist = state.cartItems.find((i) => i._id === item._id);

        if (isItemExist) {
          state.cartItems = state.cartItems.map((i) => {
            return i._id == isItemExist._id ? item : i;
          });
        } else {
          state.cartItems.push(action.payload);
        }

        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      } else {
        state.error = action.payload;
      }
    });
  },
});

export const { deleteCartItem, saveShippingInfo, clearUserState } =
  userSlice.actions;
export default userSlice.reducer;
