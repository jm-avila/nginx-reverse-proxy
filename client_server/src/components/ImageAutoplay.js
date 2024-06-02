import React from "react";
import { Carousel } from "antd";

export function ImageAutoplay({ imageSrc }) {
  const seconds = 5;

  return (
    <div className="custom-carousel">
      <Carousel
        autoplay
        autoplaySpeed={seconds * 1000}
        dotPosition="bottom"
        dots
      >
        {imageSrc.map((src, i) => {
          return <img alt="" key={i} src={src} />;
        })}
      </Carousel>
    </div>
  );
}
