"use client"
import React, { useState, useEffect } from "react";
import ProductCard from "@/components/Product/CardProduct/ProductCard";
import { getAllProducts } from '@/app/dashboard/products/api/ProductApi';
import Loader from "@/components/common/Loader";
import HeroImage from "@/components/Product/CardProduct/HeroImage";

const AllProduct = () => {
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
    <div className="container mx-auto mt-10">
      {loading ? (
        // Display loading indicator if data is still loading
        <Loader/>
      ) : (
        <>
          <HeroImage />
          <div className="max-w-280 mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllProduct;
