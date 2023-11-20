"use client";

import Image from "next/image";
import React, { useState } from "react";

export default function tableCartCustomer({ carts }) {
  const [cart, setCart] = useState(carts.cart_detail);

  async function handleCheckout() {
    alert("OK");
  }

  const updateQuantity = async (cartItemId, newQuantity) => {
    try {
      const response = await axios.put(`/api/cart/update/${cartItemId}`, {
        quantity: newQuantity,
      });
      const updatedCart = response.data; // Dapatkan data keranjang yang telah diperbarui dari backend
      setCart(updatedCart);
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
          {cart?.map((cart, key) => (
            <tr className="hover" key={key}>
              <td className="hidden pb-4 md:table-cell w-30">
                <a href="#">
                  <Image
                    src="/images/product/product-01.png"
                    width={200}
                    height={200}
                    className="w-20 rounded"
                    alt="Thumbnail"
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
                    {/* <button>Kurang</button> */}
                    {/* <input
                      type="number"
                      defaultValue={2}
                      className="w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black"
                    /> */}
                    {/* <button>Tambah</button> */}

                    <div className="join">
                      <button className="btn join-item">+</button>
                      <span className="btn join-item cursor-default">
                        {cart.quantity}
                      </span>
                      <button className="btn join-item">-</button>
                    </div>

                    {/* <button
                      onClick={() =>
                        updateQuantity(cart.product.id, cart.quantity - 1)
                      }
                    >
                      <span className="text-3xl">-</span>
                    </button>
                    <span className="text-1xl mx-5">{cart.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(cart.product.id, cart.quantity + 1)
                      }
                    >
                      <span className="text-3xl">+</span>
                    </button> */}
                  </div>
                </div>
              </td>
              <td className="text-right">
                <span className="text-sm lg:text-base font-medium">
                  Rp {cart.product.price_product}
                </span>
              </td>
              <td className="text-right">
                <span className="text-sm lg:text-base font-medium">
                  Rp {cart.total_price}
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
          <div>Rp {carts.grand_price}</div>
        </div>
        <button className="btn bg-success  text-white" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </>
  );
}
