"use client";
import "@/app/globals.css";
import "@/app/satoshi.css";
import React, { useState, useEffect } from "react";
import { FaSearch, FaChevronUp } from "react-icons/fa";
import { useSpring, animated } from "react-spring";
import Image from "next/image";
import ProductCard from "@/components/Product/CardProduct/ProductCard";
import HeroImage from "@/components/Product/CardProduct/HeroImage";
import { getAllProducts } from "@/app/dashboard/products/api/ProductApi";

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

const Sidebar = ({
  handleCategoryChange,
  handleColorChange,
  handleSizeChange,
  selectedCategories,
  selectedColors,
  selectedSizes,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const sidebarAnimation = useSpring({
    width: isOpen ? 300 : 0,
    opacity: isOpen ? 1 : 0,
    from: { width: 0, opacity: 0 },
  });

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <animated.div
      style={sidebarAnimation}
      className="w-full md:w-1/4 p-4 md:mb-0"
    >
      <button
        className="text-2xl font-semibold mb-4 md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? "Tutup" : "Buka"} Sidebar
      </button>
      <div className="shadow-lg w-full h-auto p-10 mt-6">
        <h2 className="text-4xl text-black-2 font-semibold mb-4">Category</h2>
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
              checked={selectedColors.includes("Grey")}
              onChange={() => handleColorChange("Grey")}
              className="mr-2 h-6 w-6"
            />
            Grey
          </label>
        </div>

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
    </animated.div>
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
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarAnimation = useSpring({
    transform: showSidebar ? "translateX(0%)" : "translateX(100%)",
  });
  useEffect(() => {
    document.body.style.overflow = showSidebar ? "hidden" : "auto";
  }, [showSidebar]);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const renderNoProductsMessage = () => {
    if (currentProducts.length === 0 && !loading) {
      return (
        <Image
          src="/images/product/9170826.jpg"
          alt="Slider Image 1"
          className=" mx-auto rounded-xl bg-transparent"
          width={500} // Replace with the actual width of your image
          height={100} // Replace with the actual height of your image
        />
      );
    }
    return null;
  };

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
      setShowScrollButton(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);

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

  const handleCategoryChange = (category) => {
    toggleSelected("categories", category);
  };

  const handleColorChange = (color) => {
    toggleSelected("colors", color);
  };

  const handleSizeChange = (size) => {
    toggleSelected("sizes", size);
  };

  const handleSearch = (term) => {
    setCurrentPage(1);
    setSearchTerm(term);
  };

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          className={`mx-1 px-4 py-2 rounded ${
            i === currentPage ? "bg-primary text-white" : "bg-meta-9 text-black"
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
          <div className="flex  flex-wrap items-start justify-between mb-4">
            <Sidebar
              handleCategoryChange={handleCategoryChange}
              handleColorChange={handleColorChange}
              handleSizeChange={handleSizeChange}
              selectedCategories={selectedCategories}
              selectedColors={selectedColors}
              selectedSizes={selectedSizes}
            />
            <div className="w-full md:w-3/4 mx-auto">
              <div className="max-w-280 mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
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
          className="fixed bottom-8 z-50 right-8 bg-primary p-3 rounded-full text-white cursor-pointer hover:bg-primary transition"
          onClick={scrollToTop}
        >
          <FaChevronUp size="2em" />
        </div>
      )}
    </>
  );
};

export default AllProduct;
