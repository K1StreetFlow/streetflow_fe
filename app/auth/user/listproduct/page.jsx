"use client"
import React, { useState, useEffect } from 'react';
import ProductSlider from '../../../../components/Form/CardSlider';
import ProductCard1 from '../../../../components/Form/ProductCard1'; // Update the import
import { getAllProducts } from '@/app/dashboard/products/api/ProductApi';

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

  const filteredProducts = products.filter((product) => product.category && product.category.id === 1);

  return (
    <div className="max-w-screen-lg mx-auto my-8">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ProductSlider cards={filteredProducts.map((product) => <ProductCard1 key={product.id} product={product} />)} />
      )}
    </div>
  );
};

export default ProductList;
