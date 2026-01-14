import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/v1/products": "${import.meta.env.VITE_BACKEND_BASE_URL}",
      "/api/v1/product": "${import.meta.env.VITE_BACKEND_BASE_URL}",
      "/api/v1/login": "${import.meta.env.VITE_BACKEND_BASE_URL}",
      "/api/v1/logout": "${import.meta.env.VITE_BACKEND_BASE_URL}",
      "/api/v1/register": "${import.meta.env.VITE_BACKEND_BASE_URL}",
      "/api/v1/me": "${import.meta.env.VITE_BACKEND_BASE_URL}",
      "/api/v1/me/update": "${import.meta.env.VITE_BACKEND_BASE_URL}",
      "/api/v1/password/forgot": "${import.meta.env.VITE_BACKEND_BASE_URL}",
      "/api/v1/password/update": "${import.meta.env.VITE_BACKEND_BASE_URL}",
      "/api/v1/stripeapikey": "${import.meta.env.VITE_BACKEND_BASE_URL}",
      "/api/v1/process/payment": "${import.meta.env.VITE_BACKEND_BASE_URL}",
      "/api/v1/order/new": "${import.meta.env.VITE_BACKEND_BASE_URL}",
      "/api/v1/review": "${import.meta.env.VITE_BACKEND_BASE_URL}",
      "/api/v1/admin/products": "${import.meta.env.VITE_BACKEND_BASE_URL}",
      "/api/v1/admin/product/new": "${import.meta.env.VITE_BACKEND_BASE_URL}",
      "/api/v1/orders/me": "${import.meta.env.VITE_BACKEND_BASE_URL}",
      "/api/v1/admin/orders": "${import.meta.env.VITE_BACKEND_BASE_URL}",
      "/api/v1/admin/users": "${import.meta.env.VITE_BACKEND_BASE_URL}",
      "/api/v1/admin/order": "${import.meta.env.VITE_BACKEND_BASE_URL}",
      "/api/v1/order": "${import.meta.env.VITE_BACKEND_BASE_URL}",
      "/api/v1/admin/product": "${import.meta.env.VITE_BACKEND_BASE_URL}",
      "/api/v1/admin/user": "${import.meta.env.VITE_BACKEND_BASE_URL}",
    },
  },
  plugins: [react()],
});
