import React from "react";
import Rating from "@mui/material/Rating";

const ReviewCard = ({ review }) => {
  // Fallback avatar if you don't have user profile pictures yet
  const defaultAvatar = "https://via.placeholder.com/48?text=U";

  return (
    <div className="review-card">
      <div className="review-header">
        <img
          src={review.avatar || defaultAvatar}
          alt={review.name}
          className="review-avatar"
        />
        <div className="review-meta">
          <h6 className="review-name">{review.name}</h6>
          <Rating
            name="review-rating"
            value={review.rating}
            precision={0.5}
            readOnly
            size="small"
          />
        </div>
      </div>

      <div className="review-comment">
        {review.comment}
      </div>

      {review.createdAt && (
        <div className="review-date">
          {new Date(review.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      )}
    </div>
  );
};

export default ReviewCard;