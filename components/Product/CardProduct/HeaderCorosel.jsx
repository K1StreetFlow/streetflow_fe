// components/Header.js
import React from 'react';
import Carousel from './Corosel';

const  HeaderCorosel = () => {
  const headerImages = [
    'https://source.unsplash.com/1200x400/?fashion,clothing',
    'https://source.unsplash.com/1200x400/?fashion,clothing',
    'https://source.unsplash.com/1200x400/?fashion,model',
  ];

  return (
    <>
      <Carousel images={headerImages} />
    </>
  );
};

export default HeaderCorosel;
