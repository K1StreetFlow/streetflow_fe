"use client";
import React, { useState, useEffect } from "react";

export default function Address({ data }) {
  const [selectedAddress, setSelectedAddress] = useState({});
  console.log(" SELECTED ADDRESWS", selectedAddress);

  const handleAddressChange = (event) => {
    const selectedId = parseInt(event.target.value);

    const address = data.user_customer.address.find(
      (addr) => addr.id === selectedId
    );

    setSelectedAddress(address);
  };

  return (
    <>
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-black">Shipping Addresses</h1>
      </div>
      <div className=" flex justify-center ">
        {data.user_customer.address.map((address, key) => (
          <label key={key}>
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
                  ? "border-2 border-success"
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
                    <span>{address.city}</span>, <span>{address.province}</span>
                  </div>
                </div>
              </div>
            </div>
          </label>
        ))}
      </div>
    </>
  );
}
