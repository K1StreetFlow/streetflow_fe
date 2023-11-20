// Gunakan client-side rendering untuk mengakses React di sisi klien
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaCartPlus, FaShoppingCart } from 'react-icons/fa';
import { getAllProducts} from '@/app/dashboard/products/api/ProductApi'

const ProductCard = ({ product }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleAddToCart = () => {
    console.log(`Product ${product.name_product} added to cart`);
    setIsAddedToCart(true);
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 2000);
  };

  const handleBuyNow = () => {
    console.log(`Buy now: ${product.name_product}`);
  };

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <div className="rounded-t-lg overflow-hidden">
          <Image
            src={`http://localhost:8000/api/photo_products/view/${product.photo.photo_product}`}
            width={400}
            height={225}
            alt={product.name_product}
          />
        </div>
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {product.name_product}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-700 dark:text-gray-400">
            ${product.price_product}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-400">
            Stock: {product.stock_product}
          </p>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={handleAddToCart}
            className="bg-primary hover:bg-meta-5 text-white font-bold py-1 px-2 rounded cursor-pointer transition duration-300"
          >
            <FaCartPlus className="mr-2" />
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="bg-success hover:bg-meta-6 text-white font-bold py-1 px-2 rounded cursor-pointer transition duration-300"
          >
            Buy Now
          </button>
          {isAddedToCart && (
            <div className="flex items-center">
              <FaShoppingCart className="text-xl text-primary ml-2" />
              <span className="text-sm ml-1 text-primary">Added to Cart</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto my-8 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
};

export default ProductList;
