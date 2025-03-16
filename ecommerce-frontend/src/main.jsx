import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { store } from "./redux-toolkit/store.js";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <RouterProvider router={router} /> */}
    <GoogleOAuthProvider clientId="833859171596-tb23mu7p887vakeghirfgi36j0v1uuh1.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={true}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      // transition={Bounce}
    />
  </Provider>
);
