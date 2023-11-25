"use client";
import "@/app/globals.css";

import "@/app/satoshi.css";
import React, { useEffect, useState } from "react";
import { getProductById } from "@/app/dashboard/products/api/ProductApi";
import { FaShoppingCart, FaCheck } from "react-icons/fa";
import LoginModal from "@/components/Product/modalproduct/LoginModal";
import Loader from "@/components/common/Loader";
import { useRouter } from "next/navigation";
import axios from "axios";

const ProductPage = ({ params }) => {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleImageClick = () => {
    setShowImageModal(true);
  };


  const handleAddToCart = async () => {
    // if (!isLoggedIn) {
    //   // Jika pengguna belum login, tampilkan modal login
    //   setShowModalLogin(true);
    // } else {
    // Jika pengguna sudah login, hitung total harga

    // console.log(cart.data.cart_detail);

    const totalPrice = calculateTotalPrice(product.price_product, quantity);
    // Update displayPayment
    document.getElementById("displayPayment").innerText = totalPrice
      .toFixed(2)
      .toLocaleString("id-ID");
    // console.log("Total Pembayaran:", totalPrice);

    const cart = await axios.get("http://localhost:8000/api/carts/user/cart/", {
      withCredentials: true,
    });

    const cart_detail = cart.data.cart_detail;

    // Periksa apakah id_product sudah ada di cart_detail
    const existingItemIndex = cart.data.cart_detail.findIndex(
      (item) => item.id_product === product.id
    );

    if (existingItemIndex !== -1) {
      // Jika id_product sudah ada, update quantity
      await axios.put(
        `http://localhost:8000/api/cart-details/${cart.data.cart_id}/${product.id}`,
        {
          quantity: quantity,
        }
      );
    } else {
      // Jika id_product belum ada, tambahkan item baru ke cart_detail
      await axios.post("http://localhost:8000/api/cart-details", {
        id_cart: cart.data.cart_id,
        id_product: id,
        quantity: quantity,
      });
    }

    // console.log(result);

    // router.push("/carts");
  };

  const handlePurchase = (price, quantity, stock) => {
    if (!isLoggedIn) {
      // Jika pengguna belum login, tampilkan modal login
      setShowModalLogin(true);
    } else {
      // Jika pengguna sudah login, lakukan validasi stok
      if (quantity > stock) {
        console.log("Jumlah pembelian melebihi stok yang tersedia.");
      } else {
        // Jika jumlah pembelian valid, lakukan logika pembelian
        const totalPrice = calculateTotalPrice(price, quantity);
        console.log("Product purchased! Total Price: $" + totalPrice);
        // Tambahkan logika pembelian atau tindakan lainnya di sini
      }
    }
  };
  
  const calculateTotalPrice = (price, quantity) => {
    return price * quantity;
  };
  

  const handleLogin = () => {
    // Implementasi logika login disini
    // Setelah login berhasil, atur state isLoggedIn menjadi true
    setIsLoggedIn(true);
    // Tutup modal login jika digunakan
    setShowModalLogin(false);
  };

  if (!product) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto my-8 grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-8">
      {/* Kolom 1: Gambar Produk */}
      <div className="col-span-12 lg:col-span-4 hover:cursor-pointer"  onClick={handleImageClick} >
        <img
          src={`http://localhost:8000/api/photo_products/view/${product.photo.photo_product}`}
          alt={product.name_product}
          className="w-full h-auto rounded-md shadow-md transition-transform transform hover:scale-105"
        />
      </div>

      {/* Kolom 2: Deskripsi Produk */}
      <div className="col-span-12 lg:col-span-4 mt-5 lg:mt-10 grid grid-cols-1  gap-2">
        <div className="flex flex-col mb-4">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-black-2 mb-2 flex items-center">
            {product.name_product}
          </h1>
          <div className="flex items-center mb-2">
            <FaShoppingCart className="text-gray-600 mr-2" />
            <p className="text-gray-600">Terjual 4</p>
          </div>
          <div className="text-3xl lg:text-4xl text-meta-1 font-bold mb-2">
            RP.{product.price_product.toLocaleString("id-ID")}
          </div>
          <div className="font-normal text-black text-sm lg:text-lg">
            <p className="font-bold lg:text-title-lg text-black-2">
              Detail Produk
            </p>
            <p>Stok: {product.stock_product}</p>
            <p>Size: {product.size_product}</p>
            <p>Warna: {product.colour_product}</p>
            <p>Category :{product.category.name_category_products}</p>
          </div>
          <p className="font-bold lg:text-title-lg text-black-2 mt-2">
            Deskripsi Produk
          </p>
          <p className=" text-black text-sm lg:text-lg">
            {product.description_product}
          </p>
        </div>
      </div>

      {/* Kolom 3: Form Jumlah Pembelian dan Tombol */}
      <div className="col-span-12 lg:col-span-4  ">
        <div className="flex flex-col bg-white p-4 rounded-md shadow-md">
          <label htmlFor="quantity" className="text-gray-600 mb-2">
            Jumlah Pembelian:
          </label>
          <div className="flex items-center mb-2">
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              max={product.stock_product}
              className="border border-separate w-24 border-secondary rounded-md px-3 py-2 mr-2"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <p className="text-gray-600 text-right">
              Total Stock: {product.stock_product}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600 mb-1">Jumlah Pembayaran:</p>
            <p className="ms-30">RP.</p>
            <span id="displayPayment" className="text-lg font-semibold">
              0.00 
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <button
              className="bg-primary text-white px-6 py-3 rounded flex items-center"
              onClick={() => handleAddToCart()}
            >
              <FaShoppingCart className="text-2xl mr-2 flex-shrink-0" />
              Add to Cart
            </button>
            <button
              className="bg-meta-3 text-white px-6 py-3 rounded transition duration-300 hover:bg-green-600 flex items-center"
              onClick={() => handlePurchase()}
            >
              <FaCheck className="text-2xl mr-2 flex-shrink-0" />
              Beli Sekarang
            </button>
          </div>
        </div>
      </div>
      {showImageModal && (
        <div className="fixed inset-0 z-999999 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-90"></div>
          <div className="relative z-10">
            {/* Modal content */}
            <div className="bg-white p-4 rounded-md shadow-md">
              {/* Display detailed image */}
              <img
                src={`http://localhost:8000/api/photo_products/view/${product.photo.photo_product}`}
                alt={product.name_product}
                className="w-full h-full rounded-md"
              />

              {/* Close button */}
              <button
                onClick={() => setShowImageModal(false)}
                className="mt-4 px-3 py-2 bg-primary text-white rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal Login
      <LoginModal
        isOpen={showModalLogin}
        onClose={() => setShowModalLogin(false)}
        onLogin={() => handleLogin()}
      /> */}
    </div>
  );
};

export default ProductPage;
