import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/v1/products": "https://mern-ecommerce-app-backend-one.vercel.app",
      "/api/v1/product": "https://mern-ecommerce-app-backend-one.vercel.app",
      "/api/v1/login": "https://mern-ecommerce-app-backend-one.vercel.app",
      "/api/v1/logout": "https://mern-ecommerce-app-backend-one.vercel.app",
      "/api/v1/register": "https://mern-ecommerce-app-backend-one.vercel.app",
      "/api/v1/me": "https://mern-ecommerce-app-backend-one.vercel.app",
      "/api/v1/me/update": "https://mern-ecommerce-app-backend-one.vercel.app",
      "/api/v1/password/forgot":
        "https://mern-ecommerce-app-backend-one.vercel.app",
      "/api/v1/password/update":
        "https://mern-ecommerce-app-backend-one.vercel.app",
      "/api/v1/stripeapikey":
        "https://mern-ecommerce-app-backend-one.vercel.app",
      "/api/v1/process/payment":
        "https://mern-ecommerce-app-backend-one.vercel.app",
      "/api/v1/order/new": "https://mern-ecommerce-app-backend-one.vercel.app",
      "/api/v1/review": "https://mern-ecommerce-app-backend-one.vercel.app",
      "/api/v1/admin/products":
        "https://mern-ecommerce-app-backend-one.vercel.app",
      "/api/v1/admin/product/new":
        "https://mern-ecommerce-app-backend-one.vercel.app",
      "/api/v1/orders/me": "https://mern-ecommerce-app-backend-one.vercel.app",
      "/api/v1/admin/orders":
        "https://mern-ecommerce-app-backend-one.vercel.app",
      "/api/v1/admin/users":
        "https://mern-ecommerce-app-backend-one.vercel.app",
      "/api/v1/admin/order":
        "https://mern-ecommerce-app-backend-one.vercel.app",
      "/api/v1/order": "https://mern-ecommerce-app-backend-one.vercel.app",
      "/api/v1/admin/product":
        "https://mern-ecommerce-app-backend-one.vercel.app",
      "/api/v1/admin/user": "https://mern-ecommerce-app-backend-one.vercel.app",
    },
  },
  plugins: [react()],
});
