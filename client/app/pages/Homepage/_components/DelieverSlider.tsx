import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
import slide1 from "../../../../assets/slides/slide1.jpg";
import slide2 from "../../../../assets/slides/slide2.jpg";
import slide3 from "../../../../assets/slides/slide3.jpg";
import slide4 from "../../../../assets/slides/slide4.jpg";
import slide5 from "../../../../assets/slides/slide5.jpg";
import slide6 from "../../../../assets/slides/slide6.jpg";
const items = [
  {
    src: slide1,
    altText: "Slide 1",
    caption: "Slide 1",
    key: 0,
  },
  {
    src: slide2,
    altText: "Slide 2",
    key: "1",
    caption: "",
  },
  {
    src: slide3,
    altText: "Slide 3",
    caption: "Slide 3",
    key: 2,
  },
  {
    src: slide4,
    altText: "Slide 3",
    caption: "Slide 3",
    key: 3,
  },
  {
    src: slide5,
    altText: "Slide 3",
    caption: "Slide 3",
    key: 4,
  },
  {
    src: slide6,
    altText: "Slide 3",
    caption: "Slide 3",
    key: 5,
  },
];

export const DeliverSlider = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.key}
      >
        <img src={item.src} alt={item.altText} loading="lazy" />
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });

  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
};

export default DeliverSlider;
