import "./app.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Loader from "./components/layout/Loader";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "./redux-toolkit/slices/user.slice";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ProtectUserRoute from "./components/protect/ProtectUserRoute.jsx";
import ProtectAdminRoute from "./components/protect/ProtectAdminRoute.jsx";
import axios from "axios";
import UserProfile from "./components/user/UserProfile.jsx";

// components Imports
const HomePage = lazy(() => import("./components/home/Home"));
const ProductsPage = lazy(() => import("./components/product/Products.jsx"));
const ProductDetailsPage = lazy(() =>
  import("./components/product/ProductDetails")
);
const SearchPage = lazy(() =>
  import("./components/product/SearchProducts.jsx")
);

// user components
const SignupPage = lazy(() => import("./components/user/Signup.jsx"));
const LoginPage = lazy(() => import("./components/user/Login.jsx"));
const ProfilePage = lazy(() => import("./components/user/UserProfile.jsx"));
const FavouriteProductsPage = lazy(() =>
  import("./components/user/FavouriteProducts.jsx")
);
const UserCartPage = lazy(() => import("./components/user/UserCart.jsx"));
const MyOrderPage = lazy(() => import("./components/user/MyOrders.jsx"));
const UserDahboardPage = lazy(() => import("./components/user/UserDashboard"));
const UpdateProfilePage = lazy(() => import("./components/user/UpdateProfile"));
const ForgotPasswordPage = lazy(() =>
  import("./components/user/ForgotPassword")
);
const UpdatePasswordPage = lazy(() =>
  import("./components/user/UpdatePassword")
);
const ResetPasswordPage = lazy(() => import("./components/user/ResetPassword"));
// cart components
const CartPage = lazy(() => import("./components/user/UserCart"));
const ShippingPage = lazy(() => import("./components/user/cart/Shipping.jsx"));
const ConfirmOrderPage = lazy(() =>
  import("./components/user/cart/ConfirmOrder.jsx")
);
const PaymentSuccessPage = lazy(() =>
  import("./components/user/cart/PaymentSuccess.jsx")
);
const PaymentFailurePage = lazy(() =>
  import("./components/user/cart/PaymentFailure.jsx")
);
// admin components
const AdminDashboardPage = lazy(() =>
  import("./components/admin/AdminDashboard.jsx")
);
const ProductsListPage = lazy(() =>
  import("./components/admin/ProductsList.jsx")
);
const UsersListPage = lazy(() => import("./components/admin/UsersList.jsx"));
const NewProductPage = lazy(() => import("./components/admin/NewProduct.jsx"));
const UpdateProductPage = lazy(() =>
  import("./components/admin/UpdateProduct.jsx")
);
const OrderListPage = lazy(() => import("./components/admin/OrderList.jsx"));
const ProcessOrderPage = lazy(() =>
  import("./components/admin/ProcessOrder.jsx")
);

// not found
const NotFound = lazy(() => import("./components/NotFound.jsx"));

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.userSlice);
  console.log(user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  // Routes
  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/products", element: <ProductsPage /> },
    { path: "/product/:id", element: <ProductDetailsPage /> },
    { path: "/products/search", element: <SearchPage /> },
    // user routes
    { path: "/signup", element: <SignupPage /> },
    { path: "/login", element: <LoginPage /> },
    {
      path: "/user/password/update",
      element: (
        <ProtectUserRoute>
          <UpdatePasswordPage />
        </ProtectUserRoute>
      ),
    },
    {
      path: "/admin/password/update",
      element: (
        <ProtectAdminRoute>
          <UpdatePasswordPage />
        </ProtectAdminRoute>
      ),
    },
    {
      path: "/password/forgot",
      element: <ForgotPasswordPage />,
    },
    {
      path: "/password/reset/:token",
      element: <ResetPasswordPage />,
    },
    {
      path: "/user/profile",
      element: (
        <ProtectUserRoute>
          <ProfilePage />
        </ProtectUserRoute>
      ),
    },
    {
      path: "/user/dashboard",
      element: (
        <ProtectUserRoute>
          <UserDahboardPage />
        </ProtectUserRoute>
      ),
    },
    {
      path: "/user/products/favourite",
      element: (
        <ProtectUserRoute>
          <FavouriteProductsPage />
        </ProtectUserRoute>
      ),
    },

    {
      path: "/user/orders",
      element: (
        <ProtectUserRoute>
          <MyOrderPage />
        </ProtectUserRoute>
      ),
    },

    // cart routes
    { path: "/user/cart", element: <UserCartPage /> },
    { path: "/user/profile/update", element: <UpdateProfilePage /> },
    { path: "/user/shipping", element: <ShippingPage /> },
    { path: "/user/order/confirm", element: <ConfirmOrderPage /> },
    { path: "/user/payment/success", element: <PaymentSuccessPage /> },
    { path: "/user/payment/failure", element: <PaymentFailurePage /> },

    // admin routes
    {
      path: "/admin/dashboard",
      element: (
        <ProtectAdminRoute>
          <AdminDashboardPage />
        </ProtectAdminRoute>
      ),
    },
    {
      path: "/admin/profile",
      element: (
        <ProtectAdminRoute>
          <UserProfile />
        </ProtectAdminRoute>
      ),
    },
    {
      path: "/admin/products",
      element: (
        <ProtectAdminRoute>
          <ProductsListPage />
        </ProtectAdminRoute>
      ),
    },
    {
      path: "/admin/users",
      element: (
        <ProtectAdminRoute>
          <UsersListPage />
        </ProtectAdminRoute>
      ),
    },
    {
      path: "/admin/product/create",
      element: (
        <ProtectAdminRoute>
          <NewProductPage />
        </ProtectAdminRoute>
      ),
    },
    {
      path: "/admin/edit_product/:id",
      element: (
        <ProtectAdminRoute>
          <UpdateProductPage />
        </ProtectAdminRoute>
      ),
    },
    {
      path: "/admin/orders",
      element: (
        <ProtectAdminRoute>
          <OrderListPage />
        </ProtectAdminRoute>
      ),
    },
    {
      path: "/admin/process_order/:id",
      element: (
        <ProtectAdminRoute>
          <ProcessOrderPage />
        </ProtectAdminRoute>
      ),
    },
    // not found
    { path: "*", element: <NotFound /> },
  ]);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </>
  );
}

export default App;
