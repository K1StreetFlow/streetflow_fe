"use client";
import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import generateOrderId from "@/app/utils/generateOrderId";
import axios from "axios";
import Link from "next/link";

export default function Checkout({ data }) {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [token, setToken] = useState(null);
  const [modal, setModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = () => {
    setModal(!modal);
  };

  const handleAddressChange = (event) => {
    const selectedId = parseInt(event.target.value);
    const address = data.user_customer.address.find(
      (addr) => addr.id === selectedId
    );
    setSelectedAddress(address);
  };

  async function handleCheckout() {
    if (!selectedAddress) {
      setErrorMessage("Please choose your address first.");
      setModal(!modal);
      return;
    }

    const dataPayment = {
      fullname: data.user_customer.fullname,
      code_payment: generateOrderId(data.user_customer.id),
      email: data.user_customer.email,
      total: parseInt(data.grand_price),
    };

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      "http://localhost:8000/api/payments/process-payment",
      dataPayment,
      config
    );

    console.log("Response", response.data);

    if (response.data) {
      localStorage.setItem("orderId", response.data.id);
    }

    setToken(response.data.token);
  }

  useEffect(() => {
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransUrl;

    const midtransClientKey = "SB-Mid-client-biw0_z5pnI4tFfTA";
    scriptTag.setAttribute("data-client-key", midtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  useEffect(() => {
    if (token) {
      try {
        window.snap.pay(token, {
          onSuccess: async (result) => {
            const config = {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            };

            const response = await axios.post(
              "http://localhost:8000/api/payments",
              {
                code_payment: result.order_id,
                status_payment: "Success",
                total_payment: parseInt(result.gross_amount),
                date_payment: result.transaction_time,
                method_payment: result.payment_type,
                va_number: result.va_numbers[0].va_number,
                va_type: result.va_numbers[0].bank,
                pdf_url: result.pdf_url,
                id_cart: data.cart_id,
              },
              config
            );

            if (response.data) {
              const order = await axios.post(
                "http://localhost:8000/api/order/create",
                {
                  id_payment: response.data.data.id,
                  id_cart_details: data.cart_id,
                  id_users_customer: data.user_customer.id,
                  status_order: "Paid",
                  id_address: selectedAddress.id,
                },
                config
              );

              data.cart_detail.map(async (cart) => {
                const checkout = await axios.post(
                  "http://localhost:8000/api/checkout-product/",
                  {
                    id_cart: data.cart_id,
                    id_product: cart.id_product,
                    quantity: cart.quantity,
                    total_price: cart.total_price,
                    id_order: order.data.data.orderList.id,
                  },
                  config
                );
              });

              await axios.delete(
                `http://localhost:8000/api/cart-details/cart/${data.cart_id}`
              );
              setToken("");
              window.location.href = "/order";
            } else {
              console.log("error");
            }
          },
          onPending: async (result) => {
            const config = {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            };
            const response = await axios.post(
              "http://localhost:8000/api/payments",
              {
                code_payment: result.order_id,
                status_payment: "Pending",
                total_payment: parseInt(result.gross_amount),
                date_payment: result.transaction_time,
                method_payment: result.payment_type,
                va_number: result.va_numbers[0].va_number,
                va_type: result.va_numbers[0].bank,
                pdf_url: result.pdf_url,
                id_cart: data.cart_id,
              },
              config
            );

            if (response.data) {
              setToken("");
              const order = await axios.post(
                "http://localhost:8000/api/order/create",
                {
                  id_payment: response.data.data.id,
                  id_cart_details: data.cart_id,
                  status_order: "Unpaid",
                  id_address: selectedAddress.id,
                  id_users_customer: data.user_customer.id,
                },
                config
              );

              data.cart_detail.map(async (cart) => {
                const checkout = await axios.post(
                  "http://localhost:8000/api/checkout-product/",
                  {
                    id_cart: data.cart_id,
                    id_product: cart.id_product,
                    quantity: cart.quantity,
                    total_price: cart.total_price,
                    id_order: order.data.data.orderList.id,
                  },
                  config
                );
              });

              await axios.delete(
                `http://localhost:8000/api/cart-details/cart/${data.cart_id}`
              );
              window.location.href = `/waiting-payment`;
            } else {
              console.log("error");
            }
          },
          onError: (error) => {
            localStorage.setItem("Pembayaran-error", JSON.stringify(error));
            setToken("");
            window.location.reload();
          },
          onClose: () => {
            setErrorMessage("Payment canceled");
            setModal(!modal);
            setToken("");
          },
        });
      } catch (err) {
        alert("Error");
        console.log(err);
      }
    }
  }, [token]);

  return (
    <>
      <div>
        <h1 className="text-4xl text-black font-bold mb-5 ">Checkout Page</h1>
        <hr />
      </div>
      <div className="flex-1 mt-10">
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-black">Shipping Addresses</h1>
        </div>
        {data.user_customer.address.length === 0 && (
          <div className="flex flex-col items-center justify-center w-full h-96">
            <div className="text-lg font-bold text-black">
              You dont have any shipping address
            </div>
            <Link href="/profile">
              <button className="btn bg-[#3C50E0] hover:bg-[#2a379b] text-white mt-10 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add Address
              </button>
            </Link>
          </div>
        )}

        <div className="flex w-full flex-wrap ">
          {data.user_customer.address.map((address, key) => (
            <label key={key} className="mb-5">
              <input
                id="address"
                className="hidden"
                type="radio"
                value={address.id}
                checked={selectedAddress && selectedAddress.id === address.id}
                onChange={handleAddressChange}
              />
              <div
                className={`p-5 w-100 mx-5 rounded-md shadow-6 hover:bg-gray ${
                  selectedAddress && selectedAddress.id === address.id
                    ? "border-2 border-[#3C50E0]"
                    : ""
                } `}
              >
                <div className="">
                  <h1 className="text-black font-bold text-xl ">
                    {data.user_customer.fullname}
                  </h1>
                  <h3 className="text-strokedark font-bold ">
                    {data.user_customer.phone_number}
                  </h3>
                  <div className="flex flex-col mt-2">
                    <div>
                      <span>{address.street}</span>{" "}
                      <span>{address.house_number}</span>
                    </div>
                    <div>
                      <span>{address.city}</span>,{" "}
                      <span>{address.province}</span>
                    </div>
                  </div>
                </div>
              </div>
            </label>
          ))}
        </div>

        <hr className="mt-10" />
        <h2 className=" mt-10 mb-5 font-bold text-2xl text-black">
          Product Detail
        </h2>
        <div>
          <div className="flex flex-col gap-7.5 py-3">
            <div className="flex flex-row gap-5.5  ">
              <table className="table w-full py-15">
                <thead>
                  <tr>
                    <th className="w-30 text-lg font-bold text-black ">
                      Photo
                    </th>
                    <th className="w-1/2 text-lg font-bold text-black">
                      Name Product
                    </th>
                    <th className="w-30 text-center text-lg font-bold text-black">
                      Price Product
                    </th>
                    <th className="w-30 text-center text-lg font-bold text-black">
                      Quantity
                    </th>
                    <th className="w-80 text-right text-lg font-bold text-black">
                      Total Price
                    </th>
                  </tr>
                </thead>
                {data.cart_detail?.map((cart, key) => (
                  <tbody key={key}>
                    <tr>
                      <td>
                        <Image
                          src={`http://localhost:8000/api/photo_products/view/${cart.product.photo.photo_product}`}
                          width={200}
                          height={200}
                          className="w-20 rounded"
                          alt="Thumbnail"
                        />
                      </td>
                      <td className="text-base text-black font-bold">
                        {cart.product.name_product}
                      </td>
                      <td className="text-center text-base text-black">
                        Rp {cart.product.price_product.toLocaleString("id-ID")}
                      </td>
                      <td className="text-center text-base text-black">
                        {cart.quantity}
                      </td>
                      <td className="text-right text-base text-black ">
                        Rp {cart.total_price.toLocaleString("id-ID")}
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>

        <div className="flex justify-end my-20 ">
          <div className="pe-5">
            <div className="mb-5">Grand Total</div>
            {/* <div className="mb-5">Ongkos Pengiriman</div> */}
            <div className="text-xl font-bold text-black">Total</div>
          </div>
          <div className="flex flex-col w-50 items-end">
            <div className="mb-5">
              Rp {data.grand_price.toLocaleString("id-ID")}
            </div>
            {/* <div className="mb-5">-</div> */}
            <div className="text-2xl  font-bold text-[#3C50E0] ">
              Rp {data.grand_price.toLocaleString("id-ID")}
            </div>

            <button
              className="btn bg-[#3C50E0] hover:bg-[#2a379b] text-white mt-10"
              onClick={handleCheckout}
            >
              <Image
                src={"/images/icon/credit-card2-white.svg"}
                width={20}
                height={20}
                alt=""
              />
              Select Payment
            </button>
          </div>
        </div>
      </div>
      {/* Modal Alert */}
      <div>
        <input
          type="checkbox"
          checked={modal}
          onChange={handleChange}
          className="modal-toggle"
        />

        <div className="modal ">
          <div className="modal-box h-1/2 flex justify-center items-center flex-col">
            <div className="mb-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="120"
                height="120"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ed4337"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            </div>
            <h3 className="font-bold text-2xl">{errorMessage}</h3>

            <div className="modal-action">
              <button
                type="button"
                className="btn bg-[#3C50E0] hover:bg-[#2a379b] border-0 text-white px-6"
                onClick={handleChange}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
