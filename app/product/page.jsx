'use client'
import "../globals.css";
import "../data-tables-css.css";
import "../satoshi.css";
import React, { useState, useEffect } from "react";
import CardSlider from '@/components//Product/CardProduct/CardSlider';
import ProductCard1 from '@/components/Product/CardProduct/ProductCard1';
import ProductCard2 from '@/components/Product/CardProduct/ProductCard2';
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

  const filteredProductsCategory1 = products.filter((product) => product.category && product.category.id === 1);
  const filteredProductsCategory2 = products.filter((product) => product.category && product.category.id === 2);

  return (
    <div className="container mx-auto ">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <CardSlider cards={filteredProductsCategory1.map((product) => <ProductCard1 key={product.id} product={product} />)} />
          <CardSlider cards={filteredProductsCategory2.map((product) => <ProductCard2 key={product.id} product={product} />)} />
        </>
      )}
    </div>
  );
};

export default ProductList;
