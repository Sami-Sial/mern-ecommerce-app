import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Sidebar from "../layout/DashboardSidebar";
import CartItemsTable from "./CartItemsTable";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import emptyCart from "../../assets/EmptyCart.png";

import PageTitle from "../layout/PageTitle";
import "./stylesheets/UserCart.css";

const UserCart = () => {
  const { user } = useSelector((state) => state.userSlice);
  const { cartItems } = useSelector((state) => state.userSlice);

  return (
    <>
      <PageTitle title={"Ecommerce- Cart"} />
      <Header />

      <main>
        <div style={{ display: "flex" }}>
          {/* {user && <Sidebar />} */}

          {cartItems && cartItems.length ? (
            <div id="user-cart">
              <CartItemsTable />
            </div>
          ) : (
            <div className="cart-empty-state-wrapper">
              <div className="cart-empty-state-content">
                <div className="cart-empty-img-box">
                  <img
                    src={emptyCart}
                    alt="Empty Shopping Cart"
                    className="cart-empty-illustration"
                  />
                </div>
                <h2 className="cart-empty-title">No Items in Cart</h2>
                <p className="cart-empty-subtitle">
                  Your shopping cart is waiting to be filled with amazing products!
                </p>
                <Link to="/" className="cart-empty-action-btn">
                  View Products
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default UserCart;