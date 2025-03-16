import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import React from "react";
import image from "../../assets/ecommerce-logo.png";

const ReviewCard = ({ review }) => {
  return (
    <div
      className="reviewCard"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <img
          src={image}
          width={30}
          height={30}
          style={{
            border: "1px solid black",
            borderRadius: "50%",
            padding: "2px",
          }}
          alt="User"
        />
        {review.name}
      </div>

      <Rating
        name="half-rating-read"
        defaultValue={review.rating}
        precision={0.5}
        readOnly
      />

      <span style={{ marginTop: "10px" }}>Comment : {review.comment}</span>
    </div>
  );
};

export default ReviewCard;
