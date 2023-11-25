"use client";
import "@/app/globals.css";
import "@/app/satoshi.css";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import CardSlider from "@/components//Product/CardProduct/CardSlider";
import ProductCard1 from "@/components/Product/CardProduct/ProductCard1";
import ProductCard2 from "@/components/Product/CardProduct/ProductCard2";
import ProductCard3 from "@/components/Product/CardProduct/ProductCard3";
import ProductCard from "@/components/Product/CardProduct/ProductCard";
import { getAllProducts } from "@/app/dashboard/products/api/ProductApi";
import Loader from "@/components/common/Loader";
import Carousel from "@/components/Product/CardProduct/Corosel";
import { useSpring, animated } from "react-spring";
import {
  FaShoppingCart,
  FaStar,
  FaCheck,
  FaEye,
  FaChevronUp,
} from "react-icons/fa";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const productsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const handleScroll = () => {
      // Jika posisi scroll lebih besar dari 200px, tampilkan tombol; sebaliknya sembunyikan
      setShowScrollButton(window.scrollY > 200);
    };

    // Menambahkan event listener untuk mendeteksi scroll
    window.addEventListener("scroll", handleScroll);

    // Membersihkan event listener ketika komponen dilepas
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const paginatedProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const filteredProductsCategory1 = products.filter(
    (product) => product.category && product.category.id === 1
  );
  const filteredProductsCategory2 = products.filter(
    (product) => product.category && product.category.id === 2
  );
  const filteredProductsCategory3 = products.filter(
    (product) => product.category && product.category.id === 3
  );

  const getCategoryName = (categoryData) =>
    categoryData?.name_category_products || "Uncategorized";

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const productListAnimation = useSpring({
    opacity: 1,
    translateY: 0,
    from: { opacity: 0, translateY: 200 },
    config: { duration: 900 },
  });

  return (
    <>
      <div className="container mx-auto mt-10">
        {loading ? (
          <Loader />
        ) : (
          <>
            <animated.div style={productListAnimation}>
              <Carousel />
              {/* Carousel component */}

              {/* Section for Category 1 */}
              <div className="flex items-center mb-4 bg-primary w-60 p-3 text-white mt-5 rounded-ee-xl">
                <FaShoppingCart className="mr-1" size="2em" />
                <h2 className="text-2xl font-bold">
                  {getCategoryName(filteredProductsCategory1[0]?.category)}{" "}
                  Products
                </h2>
              </div>
              <CardSlider
                cards={filteredProductsCategory1.map((product) => (
                  <ProductCard1 key={product.id} product={product} />
                ))}
              />

              <div className="flex items-center mb-4 bg-meta-8 w-60 p-3 text-white mt-5 rounded-ee-xl">
                <FaStar className="mr-1" size="2em" />
                <h2 className="text-2xl font-bold">
                  {getCategoryName(filteredProductsCategory2[0]?.category)}{" "}
                  Products
                </h2>
              </div>
              <CardSlider
                cards={filteredProductsCategory2.map((product) => (
                  <ProductCard2 key={product.id} product={product} />
                ))}
              />

              {/* Section for Category 3 */}
              <div className="flex items-center mb-4 bg-black w-60 p-3 text-white mt-5 rounded-ee-xl">
                <FaCheck className="mr-1" size="2em" />
                <h2 className="text-2xl font-bold">
                  {getCategoryName(filteredProductsCategory3[0]?.category)}{" "}
                  Products
                </h2>
              </div>
              <CardSlider
                cards={filteredProductsCategory3.map((product) => (
                  <ProductCard3 key={product.id} product={product} />
                ))}
              />
            </animated.div>
          </>
        )}
      </div>
      <div className="flex justify-center mb-4 w-full text-black-2 mt-4 text-center transition-transform transform-gover hover:scale-110">
        <Link href="/product/listproduct/" className="flex items-center">
          <FaEye className="mb-1 mr-2" size="2em" />
          <h2 className="text-2xl font-bold mb-2 mr-2 ">All Products</h2>
          <span>Lihat Selengkapnya</span>
        </Link>
      </div>
      <div className="max-w-280 mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mb-4 mx-auto text-center w-60  text-white mt-4 flex items-center">
        <Link
          href="/product/listproduct/"
          className="flex items-center justify-center"
        >
          <button className="text-1xl bg-meta-1 py-2 rounded-lg px-5 font-bold mb-2 mr-2">
            Lihat Semua Koleksi
          </button>
        </Link>
      </div>
      {showScrollButton && (
        <div
          className="fixed bottom-8 z-30 right-8 bg-primary p-3 rounded-full text-white cursor-pointer hover:bg-primary-dark transition"
          onClick={scrollToTop}
        >
          <FaChevronUp size="2em" />
        </div>
      )}
      ;
    </>
  );
};

export default ProductList;
