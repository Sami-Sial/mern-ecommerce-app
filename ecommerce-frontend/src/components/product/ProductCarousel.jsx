import Carousel from "react-bootstrap/Carousel";

function ProductCarousel({ product }) {
  return (
    <>
      <Carousel variant="dark" style={{ width: "30vw", height: "300px" }}>
        {product?.images?.map((image) => (
          <Carousel.Item>
            <img
              style={{ width: "100%", height: "300px" }}
              src={image.url}
              alt=""
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}

export default ProductCarousel;
