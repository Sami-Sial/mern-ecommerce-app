import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import img1 from "../../assets/herosection_img1.jpg";
import img2 from "../../assets/herosection_img2.jpg";
import img3 from "../../assets/herosection_img3.jpg";
import img4 from "../../assets/herosection_img4.jpg";

function HomeCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      style={{ backgroundColor: "black" }}
      activeIndex={index}
      onSelect={handleSelect}
      variant="dark"
    >
      <Carousel.Item>
        <img style={{ width: "100vw", height: "60vh" }} src={img1} alt="" />
      </Carousel.Item>

      <Carousel.Item>
        <img style={{ width: "100vw", height: "60vh" }} src={img2} alt="" />
      </Carousel.Item>

      <Carousel.Item>
        <img style={{ width: "100vw", height: "60vh" }} src={img3} alt="" />
      </Carousel.Item>

      <Carousel.Item>
        <img style={{ width: "100vw", height: "60vh" }} src={img4} alt="" />
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;
