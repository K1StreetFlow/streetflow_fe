'use client'
import "../../globals.css";
import "../../data-tables-css.css";
import "../../satoshi.css";
import { useState, useEffect } from "react";
import ProductSlider from '../../../components/Product/CardProduct/CardSlider';
import ProductCard1 from '../../../components/Product/CardProduct/ProductCard1';
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
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-bold mb-6 text-start">Category Baju</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ProductSlider cards={filteredProducts.map((product) => <ProductCard1 key={product.id} product={product} />)} />
      )}
    </div>
  );
};

export default ProductList;

