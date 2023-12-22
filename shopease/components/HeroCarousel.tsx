"use client"

import Image from "next/image";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const heroImage = [
  { imageUrl: "/assets/images/hero-1.svg", alt: "smartwatch" },
  { imageUrl: "/assets/images/hero-2.svg", alt: "bag" },
  { imageUrl: "/assets/images/hero-3.svg", alt: "lamp" },
  { imageUrl: "/assets/images/hero-4.svg", alt: "air fryer" },
  { imageUrl: "/assets/images/hero-5.svg", alt: "chair" },
];

const HeroCarousel = () => {
  return (
    <div>
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={2000}
        showArrows={false}
        showStatus={false}
      >
        {heroImage.map((image) => (
          <div key={image.alt}>
            {/* Use the Image component with dynamic src */}
            <Image
              src={image.imageUrl}
              alt={image.alt}
              width={484}
              height={484}
              className="object-contain"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
