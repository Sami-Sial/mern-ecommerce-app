import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  addItemsToCart,
  deleteCartItem,
} from "../../redux-toolkit/slices/user.slice";

function CartItemsTable() {
  const { cartItems } = useSelector((state) => state.userSlice);
  const { user } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const increaseQuantity = (id, quantity, stock) => {
    if (stock <= quantity) {
      toast.warning("Maximum stock reached");
      return;
    }
    quantity += 1;
    dispatch(addItemsToCart({ id, quantity }));
  };

  const decreaseQuantity = (id, quantity) => {
    if (1 >= quantity) {
      return;
    }
    quantity -= 1;
    dispatch(addItemsToCart({ id, quantity }));
  };

  const deleteCartItems = (id) => {
    dispatch(deleteCartItem(id));
    toast.success("Item removed from cart");
  };

  const checkoutHandler = () => {
    if (!user) {
      navigate("/login?redirect=shipping");
      return;
    }
    navigate("/user/shipping");
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-image-wrapper">
          <img
            src={emptyCart}
            alt="Empty Shopping Cart"
            className="empty-cart-image"
          />
        </div>
        <h2 className="empty-cart-title">No Items in Cart</h2>
        <p className="empty-cart-text">Your shopping cart is waiting to be filled with amazing products!</p>
        <Link to="/" className="shop-now-link">
          View Products
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1 className="cart-title">Shopping Cart</h1>
        <p className="item-count">
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
        </p>
      </div>

      <div className="cart-content">
        <div className="items-section">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <Link to={`/product/${item._id}`} className="image-link">
                <img
                  src={item.images[0]?.url}
                  alt={item.name}
                  className="cart-product-image"
                />
              </Link>

              <div className="item-details">
                <Link to={`/product/${item._id}`} className="product-name">
                  {item.name}
                </Link>
                <p className="product-price">₹{item.price.toLocaleString()}</p>
                {item.stock <= 5 && (
                  <span className="low-stock">
                    Only {item.stock} left in stock
                  </span>
                )}
              </div>

              <div className="quantity-section">
                <div className="quantity-control">
                  <button
                    className="quantity-btn"
                    onClick={() => decreaseQuantity(item._id, item.quantity)}
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() =>
                      increaseQuantity(item._id, item.quantity, item.stock)
                    }
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="subtotal-section">
                <p className="subtotal">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>

              <button
                className="delete-btn"
                onClick={() => deleteCartItems(item._id)}
                aria-label="Remove item"
              >
                <DeleteIcon fontSize="small" />
              </button>
            </div>
          ))}
        </div>

        <div className="summary-section">
          <div className="summary-card">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-row">
              <span className="summary-label">Subtotal</span>
              <span className="summary-value">
                ₹{totalAmount.toLocaleString()}
              </span>
            </div>

            <div className="summary-row">
              <span className="summary-label">Shipping</span>
              <span className="summary-free">Free</span>
            </div>

            <div className="divider"></div>

            <div className="summary-row">
              <span className="total-label">Total</span>
              <span className="total-value">
                ₹{totalAmount.toLocaleString()}
              </span>
            </div>

            <button className="checkout-btn" onClick={checkoutHandler}>
              Proceed to Checkout
            </button>

            <Link to="/" className="continue-shopping-link">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItemsTable;