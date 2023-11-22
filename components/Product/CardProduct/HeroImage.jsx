// components/HeroSection.js
import React from 'react';
import Image from 'next/image';

const HeroImage = () => {
  return (
    <>
      <Image
          src="/images/corosel/header.png"
          alt="Slider Image 1"
          className="w-full h-auto rounded-xl object-cover border-none"
          width={1200} // Replace with the actual width of your image
          height={400} // Replace with the actual height of your image
        />
    </>
  );
};

export default HeroImage;
