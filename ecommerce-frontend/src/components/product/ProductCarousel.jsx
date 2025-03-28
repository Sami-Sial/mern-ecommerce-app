import Carousel from "react-bootstrap/Carousel";

function ProductCarousel({ product }) {
  return (
    <>
      <Carousel variant="dark">
        {product?.images?.map((image) => (
          <Carousel.Item>
            <img src={image.url} alt="" />
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}

export default ProductCarousel;
