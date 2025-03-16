import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard.jsx";
import "./stylesheets/ProductDetails.css";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import PageTitle from "../layout/PageTitle";
import { toast } from "react-toastify";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useParams } from "react-router-dom";
import ProductCarousel from "./ProductCarousel.jsx";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Loader from "../layout/Loader.jsx";

import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart } from "../../redux-toolkit/slices/user.slice.jsx";
import {
  fetchProductDetails,
  newReview,
  clearProductState,
} from "../../redux-toolkit/slices/product.slice";
import { clearUserState } from "../../redux-toolkit/slices/user.slice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewModalShow, setReviewModalShow] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { product, error, reviewSuccess, loading } = useSelector(
    (state) => state.productSlice
  );
  const { addedToCartSuccess } = useSelector((state) => state.userSlice);

  const submitReview = () => {
    if (!rating || !comment) {
      return toast.error("All fields are required to submit review.");
    }
    let productId = id;
    dispatch(newReview({ rating, comment, productId }));

    setReviewModalShow(false);
  };

  const increaseQuantity = () => {
    if (product.stock <= quantity) {
      toast.error("Product is out of stock");
      return;
    }

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addProductsToCart = () => {
    if (product.stock <= 0) {
      toast.error("Product is out of stock");
      return;
    }
    dispatch(addItemsToCart({ id, quantity }));
  };

  useEffect(() => {
    dispatch(fetchProductDetails(id));

    if (reviewSuccess) {
      toast.success("Review submitted successfully");
      dispatch(clearProductState());
    }

    if (addedToCartSuccess) {
      toast.success("Product added to cart.");
      dispatch(clearUserState());
    }

    if (error) {
      toast.error(error);
      dispatch(clearProductState());
    }
  }, [dispatch, id, reviewSuccess, error, addedToCartSuccess]);

  return (
    <>
      <PageTitle title={"Product Details"} />
      <Header />

      <main>
        {/* product details */}
        {loading ? (
          <Loader />
        ) : (
          <>
            {product && (
              <>
                <div className="product-details">
                  <div>
                    <ProductCarousel product={product} />
                  </div>

                  <div style={{ maxWidth: "60vw", minWidth: "40vw" }}>
                    <h5>{product.name}</h5>
                    <span style={{ display: "flex", gap: "1rem" }}>
                      <p>Category : {product.category}</p>
                      <p>Brand : {product.brand}Adidas</p>
                    </span>
                    <p style={{ color: "red" }}>
                      Price : &#x24;{product.price}
                    </p>
                    <Stack spacing={1}>
                      <Rating
                        name="half-rating-read"
                        defaultValue={product.ratings}
                        precision={0.5}
                        readOnly
                      />
                    </Stack>
                    {product.stock >= 1 ? (
                      <p style={{ color: "green" }}>Status : In Stock</p>
                    ) : (
                      <p style={{ color: "red" }}>Status : Out Of Stcok</p>
                    )}
                    <p>Description : {product.description}</p>

                    <br />

                    <Button
                      size="sm"
                      variant="dark"
                      onClick={() => setReviewModalShow(true)}
                    >
                      Add Review
                    </Button>

                    <div style={{ marginTop: "20px", fontWeight: "bold" }}>
                      <p>Shop Now</p>
                      <button
                        style={{ padding: "2px 5px", borderRadius: "5px" }}
                        onClick={decreaseQuantity}
                      >
                        -
                      </button>
                      <input
                        style={{
                          width: "100px",
                          margin: "0 10px",
                          padding: "0 10px",
                        }}
                        readOnly
                        type="number"
                        value={quantity}
                      />
                      <button
                        style={{
                          padding: "2px 5px",
                          borderRadius: "5px",
                          marginRight: "15px",
                        }}
                        onClick={increaseQuantity}
                      >
                        +
                      </button>

                      <Button
                        size="sm"
                        variant="dark"
                        onClick={addProductsToCart}
                      >
                        Add To Cart
                      </Button>
                    </div>
                  </div>
                </div>

                {/* reviews */}
                <h5 style={{ textAlign: "center", marginTop: "1rem" }}>
                  Reviews
                </h5>

                {product.reviews && product.reviews[0] ? (
                  <div className="reviews">
                    {product.reviews && (
                      <Carousel
                        indicators={false}
                        variant="dark"
                        style={{
                          width: "50vw",
                          height: "auto",
                          border: "1px solid black",
                          borderRadius: "10px",
                          padding: "10px",
                          margin: "1rem auto",
                        }}
                      >
                        {product.reviews.map((review) => (
                          <Carousel.Item>
                            <ReviewCard key={review._id} review={review} />
                          </Carousel.Item>
                        ))}
                      </Carousel>
                    )}
                  </div>
                ) : (
                  <p style={{ textAlign: "center", fontSize: "18px" }}>
                    No Reviews Yet
                  </p>
                )}

                {/* review modal */}
                <Modal
                  show={reviewModalShow}
                  onHide={() => setReviewModalShow(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Add Review</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <Stack spacing={1}>
                      Rating
                      <Rating
                        name="half-rating"
                        defaultValue={rating}
                        onChange={(e) => setRating(e.target.value)}
                        precision={0.5}
                      />
                    </Stack>
                    <label htmlFor="comment">Comment</label> <br />
                    <textarea
                      name=""
                      style={{
                        width: "400px",
                        height: "150px",
                        padding: "10px",
                        fontSize: "17px",
                      }}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      id="comment"
                    >
                      Comment
                    </textarea>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button variant="secondary" onClick={submitReview}>
                      Submit Review
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            )}
          </>
        )}
      </main>

      <Footer />
    </>
  );
};

export default ProductDetails;
