import React from "react";
import "./stylesheets/CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img width={30} height={30} src={item.images[0]?.url} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: &#x24;${Math.round(item.price)}`}</span>
        <p onClick={() => deleteCartItems(item._id)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
