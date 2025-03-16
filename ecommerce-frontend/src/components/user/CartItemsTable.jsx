import Table from "react-bootstrap/Table";
import image from "../../assets/herosection_img2.jpg";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import {
  addItemsToCart,
  deleteCartItem,
} from "../../redux-toolkit/slices/user.slice";
import { useState } from "react";

function CartItemsTable() {
  const { cartItems } = useSelector((state) => state.userSlice);
  const { user } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const increaseQuantity = (id, quantity, stock) => {
    if (stock <= quantity) {
      return;
    }
    quantity += 1;
    console.log(quantity);
    dispatch(addItemsToCart({ id, quantity }));
  };

  const decreaseQuantity = (id, quantity) => {
    if (1 >= quantity) {
      return;
    }
    quantity -= 1;
    console.log(quantity);
    dispatch(addItemsToCart({ id, quantity }));
  };

  const deleteCartItems = (id) => {
    dispatch(deleteCartItem(id));
    toast.success("Cart item deleted successfully");
  };

  const checkoutHandler = () => {
    if (!user) {
      navigate("/login?redirect=shipping");
      return;
    }

    navigate("/user/shipping");
  };

  return (
    <div style={{ width: "calc(100vw - 200px)", paddingTop: "1rem" }}>
      <Table striped style={{ width: "90%", margin: "auto" }}>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>

        <tbody>
          {cartItems &&
            cartItems.length >= 1 &&
            cartItems.map((item) => {
              return (
                <tr>
                  <td style={{ display: "flex", gap: "10px" }}>
                    <Link to={`/product/${item._id}`}>
                      <img
                        src={item.images[0]?.url}
                        width={40}
                        height={40}
                        style={{ borderRadius: "5px" }}
                        alt=""
                      />
                    </Link>
                  </td>

                  <td>
                    <p style={{ margin: "0", fontWeight: "500" }}>
                      {item.name}
                    </p>
                  </td>

                  <td>
                    <p style={{ margin: "0", color: "red" }}>₹{item.price}</p>
                  </td>

                  <td>
                    <button
                      style={{
                        padding: "1px 5px",
                        borderRadius: "5px",
                        border: "1px solid black",
                      }}
                      onClick={() => decreaseQuantity(item._id, item.quantity)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      style={{
                        width: "60px",
                        margin: "0 5px",
                        padding: "0 5px",
                      }}
                      value={item.quantity}
                      readOnly
                    />
                    <button
                      style={{
                        padding: "1px 5px",
                        borderRadius: "5px",
                        border: "1px solid black",
                      }}
                      onClick={() =>
                        increaseQuantity(item._id, item.quantity, item.stock)
                      }
                    >
                      +
                    </button>
                  </td>

                  <td>
                    <p>{`₹${Math.round(item.price * item.quantity)}`}</p>
                  </td>

                  <td>
                    <Button
                      onClick={() => deleteCartItems(item._id)}
                      size="sm"
                      variant="secondary"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>

        <tfoot>
          <tr>
            <th>
              <p>Gross Total</p>
            </th>
            <th></th>
            <th></th>
            <th></th>
            <th>
              <p>{`₹${Math.round(
                cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )
              )}`}</p>
            </th>
          </tr>
        </tfoot>
      </Table>

      <div style={{ textAlign: "center", margin: "1rem" }}>
        <Button onClick={checkoutHandler} variant="primary">
          Checkout
        </Button>
      </div>
    </div>
  );
}

export default CartItemsTable;
