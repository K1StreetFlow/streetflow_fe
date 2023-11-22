"use client";
import "../../globals.css";
import "../../data-tables-css.css";
import "../../satoshi.css";
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import ProductCard from "@/components/Product/CardProduct/ProductCard";
import { getAllProducts } from "@/app/dashboard/products/api/ProductApi";
import { useSpring, animated } from "react-spring";
import HeroImage from "@/components/Product/CardProduct/HeroImage";
import Image from 'next/image';
import {
  FaChevronUp,
} from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearchSubmit} className="mb-4 mt-10">
      <div className="flex justify-center mx-auto p-3 w-90 bg-transparent shadow-xl border-b-2  py-2 rounded-xl">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Cari Product"
          className="appearance-none bg-transparent text-bla border-none w-full  mr-3 py-1 px-2 focus:outline-none"
        />
        <button
          type="submit"
          className=" bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm  text-black py-1 px-2 rounded"
        >
          <FaSearch className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};

const AllProduct = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [showScrollButton, setShowScrollButton] = useState(false);
  const productListAnimation = useSpring({
    opacity: 1,
    translateY: 0,
    from: { opacity: 0, translateY: 200 },
    config: { duration: 900 },
  });
  const renderNoProductsMessage = () => {
    if (currentProducts.length === 0 && !loading) {
      return  <Image
      src="/images/product/9170826.jpg"
      alt="Slider Image 1"
      className=" mx-auto rounded-xl bg-transparent"
      width={500} // Replace with the actual width of your image
      height={100} // Replace with the actual height of your image
    />;
    }
    return null;
  };

  // State for filtering
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

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
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    toggleSelected("categories", category);
  };

  // Handle color change
  const handleColorChange = (color) => {
    toggleSelected("colors", color);
  };

  // Handle size change
  const handleSizeChange = (size) => {
    toggleSelected("sizes", size);
  };

  // Handle search
  const handleSearch = (term) => {
    setCurrentPage(1);
    setSearchTerm(term);
  };

  // Toggle selected items
  const toggleSelected = (type, item) => {
    switch (type) {
      case "categories":
        setSelectedCategories((prev) =>
          prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
        );
        break;
      case "colors":
        setSelectedColors((prev) =>
          prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
        );
        break;
      case "sizes":
        setSelectedSizes((prev) =>
          prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
        );
        break;
      default:
        break;
    }
  };

  // Filter products based on selected criteria and search term
  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category.name_category_products);
    const colorMatch =
      selectedColors.length === 0 ||
      selectedColors.includes(product.colour_product);
    const sizeMatch =
      selectedSizes.length === 0 ||
      selectedSizes.includes(product.size_product);
    const searchMatch =
      searchTerm === "" ||
      product.name_product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description_product
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return categoryMatch && colorMatch && sizeMatch && searchMatch;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Render pagination buttons
  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          className={`mx-1 px-4 py-2 rounded ${
            i === currentPage ? "bg-primary text-white" : "bg-secondary"
          }`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <>
      <animated.div style={productListAnimation}>
        <div className="container mx-auto mt-10">
          <HeroImage />
          <div className="mt-4">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="flex flex-wrap items-center justify-between mb-4">
            <div className="w-full md:w-1/4 p-4 md:mb-0">
              <div className="shadow-lg w-full h-auto p-10 mt-6">
                <h2 className="text-4xl text-black-2 font-semibold mb-4">
                  Category
                </h2>

                {/* Categories */}
                <div className="mb-4 text-black-2">
                  <h3 className="text-lg font-semibold mb-2">Clothing Items</h3>
                  <label className="block text-base">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes("baju")}
                      onChange={() => handleCategoryChange("baju")}
                      className="mr-2 h-6 w-6"
                    />
                    Baju
                  </label>
                  <label className="block text-base">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes("celana")}
                      onChange={() => handleCategoryChange("celana")}
                      className="mr-2 h-6 w-6"
                    />
                    Celana
                  </label>
                  <label className="block text-base">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes("jaket")}
                      onChange={() => handleCategoryChange("jaket")}
                      className="mr-2 h-6 w-6"
                    />
                    Jaket
                  </label>
                </div>

                {/* Colors */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Colors</h3>
                  <label className="block text-base">
                    <input
                      type="checkbox"
                      checked={selectedColors.includes("Blue")}
                      onChange={() => handleColorChange("Blue")}
                      className="mr-2 h-6 w-6"
                    />
                    Blue
                  </label>
                  <label className="block text-base">
                    <input
                      type="checkbox"
                      checked={selectedColors.includes("Black")}
                      onChange={() => handleColorChange("Black")}
                      className="mr-2 h-6 w-6"
                    />
                    Black
                  </label>
                  <label className="block text-base">
                    <input
                      type="checkbox"
                      checked={selectedColors.includes("Gray")}
                      onChange={() => handleColorChange("Gray")}
                      className="mr-2 h-6 w-6"
                    />
                    Gray
                  </label>
                </div>

                {/* Sizes */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Sizes</h3>
                  <label className="block text-base">
                    <input
                      type="checkbox"
                      checked={selectedSizes.includes("L")}
                      onChange={() => handleSizeChange("L")}
                      className="mr-2 h-6 w-6"
                    />
                    L
                  </label>
                  <label className="block text-base">
                    <input
                      type="checkbox"
                      checked={selectedSizes.includes("S")}
                      onChange={() => handleSizeChange("S")}
                      className="mr-2 h-6 w-6"
                    />
                    S
                  </label>
                  <label className="block text-base">
                    <input
                      type="checkbox"
                      checked={selectedSizes.includes("M")}
                      onChange={() => handleSizeChange("M")}
                      className="mr-2 h-6 w-6"
                    />
                    M
                  </label>
                  <label className="block text-base">
                    <input
                      type="checkbox"
                      checked={selectedSizes.includes("XL")}
                      onChange={() => handleSizeChange("XL")}
                      className="mr-2 h-6 w-6"
                    />
                    XL
                  </label>
                </div>
              </div>
            </div>
            <div className="w-full md:w-3/4">
              <div className="max-w-280 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {renderNoProductsMessage()}
            </div>
          </div>
          <div className="flex justify-center my-4">
            {renderPaginationButtons()}
          </div>
        </div>
      </animated.div>
      {showScrollButton && (
        <div
          className="fixed bottom-8 right-8 bg-primary p-3 rounded-full text-white cursor-pointer hover:bg-primary-dark transition"
          onClick={scrollToTop}
        >
          <FaChevronUp size="2em" />
        </div>
      )};
    </>
  );
};

export default AllProduct;
