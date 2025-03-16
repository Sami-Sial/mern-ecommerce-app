import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/product.slice";
import userSlice from "./slices/user.slice";
import orderSlice from "./slices/order.slice";
import adminSlice from "./slices/admin.slice";

export const store = configureStore({
    reducer: {
        productSlice,
        userSlice,
        orderSlice,
        adminSlice
    },
})