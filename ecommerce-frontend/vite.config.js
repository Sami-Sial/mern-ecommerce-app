import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/v1/products": "http://localhost:8080",
      "/api/v1/product": "http://localhost:8080",
      "/api/v1/login": "http://localhost:8080",
      "/api/v1/logout": "http://localhost:8080",
      "/api/v1/register": "http://localhost:8080",
      "/api/v1/me": "http://localhost:8080",
      "/api/v1/me/update": "http://localhost:8080",
      "/api/v1/password/forgot": "http://localhost:8080",
      "/api/v1/password/update": "http://localhost:8080",
      "/api/v1/stripeapikey": "http://localhost:8080",
      "/api/v1/process/payment": "http://localhost:8080",
      "/api/v1/order/new": "http://localhost:8080",
      "/api/v1/review": "http://localhost:8080",
      "/api/v1/admin/products": "http://localhost:8080",
      "/api/v1/admin/product/new": "http://localhost:8080",
      "/api/v1/orders/me": "http://localhost:8080",
      "/api/v1/admin/orders": "http://localhost:8080",
      "/api/v1/admin/users": "http://localhost:8080",
      "/api/v1/admin/order": "http://localhost:8080",
      "/api/v1/order": "http://localhost:8080",
      "/api/v1/admin/product": "http://localhost:8080",
      "/api/v1/admin/user": "http://localhost:8080",
    },
  },
  plugins: [react()],
});
