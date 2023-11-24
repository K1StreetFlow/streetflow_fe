// components/Carousel.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Image from 'next/image'; // Import next/image
import Link from 'next/link';

const NextArrow = (props) => {
  const { onClick } = props;
  return <FaArrowRight className="slick-arrow slick-next z-99999" onClick={onClick} />;
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return <FaArrowLeft className="slick-arrow slick-prev z-99999" onClick={onClick} />;
};

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots) => (
      <div className="mb-[-15px]">
        <ul>{dots}</ul>
      </div>
    ),
    customPaging: () => <div className="slick-dot"></div>,
  };

  return (
    <Slider {...settings} className="border-none">
      <div className="border-none">
        <Image
          src="/images/corosel/carousel1.svg"
          alt="Slider Image 1"
          className="w-full h-auto rounded-xl object-cover border-none"
          width={1200} // Replace with the actual width of your image
          height={400} // Replace with the actual height of your image
        />
      </div>
      <div className="border-none">
        <Image
          src="/images/corosel/carousel2.svg"
          alt="Slider Image 2"
          className="w-full h-auto rounded-xl object-cover border-none"
          width={1200} // Replace with the actual width of your image
          height={400} // Replace with the actual height of your image
        />
      </div>
      <div className="border-none">
        <Image
          src="/images/corosel/corosel3.png"
          alt="Slider Image 3"
          className="w-full h-auto rounded-xl object-cover border-none"
          width={1200} // Replace with the actual width of your image
          height={400} // Replace with the actual height of your image
        />
      </div>
    </Slider>
  );
};

export default Carousel;
