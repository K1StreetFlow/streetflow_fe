"use client";

import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function tableCartCustomer({ carts }) {
  const [cartDetail, setCartDetail] = useState();
  const [cart, setCart] = useState(carts);

  useEffect(() => {
    // Fungsi untuk mengambil data dari backend
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/carts/2", {
          next: {
            revalidate: 0,
          },
        });
        const result = await response.json();
        setCartDetail(result.cart_detail);
        setCart(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  const updateQuantity = async (cartItemId, newQuantity) => {
    try {
      console.log("cartItemId", cartItemId);
      console.log("newQuantity", newQuantity);
      await axios.put(`http://localhost:8000/api/cart-details/${cartItemId}`, {
        quantity: newQuantity,
      });
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  return (
    <>
      <table className="table w-full text-sm lg:text-base" cellSpacing={0}>
        <thead>
          <tr className="h-12 uppercase">
            <th className="hidden md:table-cell" />
            <th className="text-left">Product</th>
            <th className="lg:text-right text-left pl-5 lg:pl-0">
              <span className="lg:hidden" title="Quantity">
                Qtd
              </span>
              <span className="hidden lg:inline">Quantity</span>
            </th>
            <th className="text-right">Price Product</th>
            <th className="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {cartDetail?.map((cart, key) => (
            <tr className="hover" key={key}>
              <td className="hidden pb-4 md:table-cell w-30">
                <a href="#">
                  <Image
                    src="/images/product/product-01.png"
                    width={200}
                    height={200}
                    className="w-20 rounded"
                    alt={cart.product.name_product}
                  />
                </a>
              </td>
              <td className="w-50">
                <a href="#">
                  <p className="mb-2 md:ml-4 ">{cart.product.name_product}</p>
                  <form action="" method="POST">
                    <button type="submit" className="text-gray-700 md:ml-4">
                      <small>(Remove item)</small>
                    </button>
                  </form>
                </a>
              </td>
              <td className="justify-center md:justify-end md:flex mt-6">
                <div className="w-20 h-10">
                  <div className="relative flex flex-row w-full h-8">
                    <div className="join">
                      <button
                        onClick={() =>
                          updateQuantity(cart.id, cart.quantity - 1)
                        }
                        disabled={cart.quantity <= 1}
                        className="btn btn-sm rounded-full  join-item"
                      >
                        -
                      </button>
                      <span className="mx-5">{cart.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(cart.id, cart.quantity + 1)
                        }
                        disabled={cart.quantity >= cart.product.stock_product}
                        className="btn btn-sm rounded-full  join-item"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </td>
              <td className="text-right">
                <span className="text-sm lg:text-base font-medium">
                  Rp {cart.product.price_product.toLocaleString("id-ID")}
                </span>
              </td>
              <td className="text-right">
                <span className="text-sm lg:text-base font-medium">
                  Rp {cart.total_price.toLocaleString("id-ID")}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr className="pb-6 mt-6" />
      <div className="flex justify-end">
        <div className="flex flex-col me-10">
          <div>Total Price</div>
          <div className="font-bold text-lg">
            Rp {cart.grand_price.toLocaleString("id-ID")}
          </div>
        </div>

        <Link href={"carts/checkout"}>
          <button className="btn bg-primary  text-white">Checkout</button>
        </Link>
      </div>
    </>
  );
}
