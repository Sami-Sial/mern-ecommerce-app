import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Sidebar from "../layout/DashboardSidebar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "react-bootstrap/esm/Button";
import CartItemsTable from "./CartItemsTable";
import { useSelector } from "react-redux";
import DashboardTop from "../layout/DashboardTop";
import PageTitle from "../layout/PageTitle";

const UserCart = () => {
  const { user } = useSelector((state) => state.userSlice);
  const { cartItems } = useSelector((state) => state.userSlice);

  return (
    <>
      <PageTitle title={"Ecommerce- Cart"} />
      <Header />
      {user && <DashboardTop />}

      <main>
        <div style={{ display: "flex" }}>
          {user && <Sidebar />}

          {cartItems && cartItems.length ? (
            <div
              className="content-wrapper"
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                width: user ? "calc(100vw - 200px)" : "100vw",
                paddingTop: "3rem",
                maxHeight: "calc(100vh - 3rem)",
              }}
            >
              <h4 style={{ textAlign: "center" }}>Cart Items</h4>
              <CartItemsTable />
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100vw",
                height: "calc(100vh - 10rem)",
              }}
            >
              <ShoppingCartIcon style={{ fontSize: "40px" }} />
              <h4>No items in cart</h4>
            </div>
          )}
        </div>
      </main>

      {/* <Footer /> */}
    </>
  );
};

export default UserCart;
