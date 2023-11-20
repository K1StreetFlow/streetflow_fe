"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ProductCard1 from '../../../../components/Form/ProductCard1';

const DetailProductPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch product data from your API
    const fetchProduct = async () => {
      try {
        const response = await fetch('your-api-endpoint-for-product-details');
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const handleAddToCart = () => {
    // Implement your add to cart logic here
    console.log('Added to cart:', product);
  };

  const handleBuyNow = () => {
    // Implement your buy now logic here
    console.log('Buy now:', product);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: Large Image */}
        <div className="md:col-span-1">
          <Image
            src={`http://localhost:8000/api/photo_products/view/${product.photo.photo_product}`}
            width={500}
            height={500}
            alt={product.name}
            objectFit="cover"
          />
        </div>

        {/* Column 2: Product Details */}
        <div className="md:col-span-1">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-lg font-bold mb-4">${product.price}</p>
          <p className="text-gray-700 mb-4">Stock: {product.stock}</p>
          {/* Add more product details as needed */}
        </div>

        {/* Column 3: Payment Card */}
        <div className="md:col-span-1">
          <ProductCard1 product={product} />
          <div className="mt-4">
            {/* Add UI for selecting size, quantity, etc. */}
            {/* Add buttons for Add to Cart and Buy Now */}
            <button onClick={handleAddToCart} className="bg-blue-500 text-white px-4 py-2 mr-2">
              Add to Cart
            </button>
            <button onClick={handleBuyNow} className="bg-green-500 text-white px-4 py-2">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProductPage;
