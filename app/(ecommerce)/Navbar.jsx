import Image from "next/image";
import React, { use } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import DropdownUser from "./DropdownUser";

export default function Navbar() {
  const [cart, setCart] = useState({});
  const [showCartIcon, setShowCartIcon] = useState(true);
  const pathname = usePathname();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Periksa apakah pengguna sedang berada di halaman checkout
    if (pathname === "/carts") {
      setShowCartIcon(false);
    } else if (pathname === "/carts/checkout") {
      setShowCartIcon(false);
    } else if (pathname.includes("/waiting-payment")) {
      setShowCartIcon(false);
    } else {
      setShowCartIcon(true);
    }
  }, [pathname]);

  const fetchToken = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/user/token", {
        withCredentials: true,
      });
      const userData = response.data.decodedToken;

      setUserData(userData);
    } catch (error) {
      console.error("Error fetching or decoding token:", error);
    }
  };

  const updateToken = async () => {
    await fetchToken();
  };

  useEffect(() => {
    updateToken();
    fetchToken();
  }, []);

  useEffect(() => {
    // Fungsi untuk mengambil data dari backend
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/carts/user/cart",
          {
            next: {
              revalidate: 0,
            },
          }
        );
        const result = await response.json();
        setCart(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li className="text-black font-bold">
              <a>Home</a>
            </li>
            <li>
              <a>About</a>
            </li>
            <li>
              <a>Store</a>
            </li>
          </ul>
        </div>
        <a className="cursor-pointer p-5">
          <Image
            src="/images/logo/streetflow-logo.svg"
            width={200}
            height={200}
            className="w-40 rounded "
            alt="Logo Streetflow"
          />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a>Store</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end me-5">
        <div className="flex flex-row me-5">
          {showCartIcon && (
            <>
              <Link href="/carts">
                <Image
                  src="/images/icon/shop-cart-bold.svg"
                  width={30}
                  height={30}
                />
              </Link>
              {cart.total_product > 0 && (
                <span className="badge bg-[#3C50E0] py-2 text-white font-bold ">
                  {cart.total_product}
                </span>
              )}
            </>
          )}
        </div>
        {userData ? (
          <DropdownUser user={userData} />
        ) : (
          // <a className="btn">Logout</a>
          <Link href="/auth/user/login">
            <a className="btn">Login</a>
          </Link>
        )}
      </div>
    </div>
  );
}
