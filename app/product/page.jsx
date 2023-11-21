'use client'
import "../globals.css";
import "../data-tables-css.css";
import "../satoshi.css";
import React, { useState, useEffect } from "react";
import CardSlider from '@/components//Product/CardProduct/CardSlider';
import ProductCard1 from '@/components/Product/CardProduct/ProductCard1';
import ProductCard2 from '@/components/Product/CardProduct/ProductCard2';
import ProductCard3 from '@/components/Product/CardProduct/ProductCard3';
import { getAllProducts } from '@/app/dashboard/products/api/ProductApi';
import Loader from "@/components/common/Loader";

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
  const filteredProductsCategory3 = products.filter((product) => product.category && product.category.id === 3);

  return (
    <div className="container mx-auto ">
      {loading ? (
          <Loader />
      ) : (
        <>
          <CardSlider cards={filteredProductsCategory1.map((product) => <ProductCard1 key={product.id} product={product} />)} />
          <CardSlider cards={filteredProductsCategory2.map((product) => <ProductCard2 key={product.id} product={product} />)} />
          <CardSlider cards={filteredProductsCategory3.map((product) => <ProductCard3 key={product.id} product={product} />)} />
        </>
      )}
    </div>
  );
};

export default ProductList;
