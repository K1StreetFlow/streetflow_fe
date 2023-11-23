'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProductById } from "../dashboard/products/api/ProductApi";

const ProductDetail = () => {
  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!productId) {
          throw new Error('Invalid productId');
        }

        const response = await getProductById(parseInt(productId, 10));
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching product details: {error.message}</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div>
      <h1>Product Detail Page</h1>
      <p>Product ID: {productId}</p>
      <p>Name: {product.name_product}</p>
      <p>Description: {product.description_product}</p>
      <p>Price: ${product.price_product}</p>
      <p>Stock: {product.stock_product}</p>
      <p>Size: {product.size_product}</p>
      <p>Colour: {product.colour_product}</p>
      <p>Category: {product.category.name_category_products}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default ProductDetail;
