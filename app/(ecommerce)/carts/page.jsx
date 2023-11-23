import React from "react";
import TableCartCustomer from "@/app/(ecommerce)/carts/tableCart";
import axios from "axios";

async function getAllCarts() {
  const res = await fetch("http://localhost:8000/api/carts/2", {
    next: {
      revalidate: 0,
    },
  });
  return res.json();

  // const res = await axios.get("http://localhost:8000/api/carts/2");
  // return res.data;
}

const Carts = async () => {
  const carts = await getAllCarts();
  return (
    <div className="flex justify-center my-6">
      <div className="flex flex-col w-full h-120 p-20 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5">
        <div>
          <h1 className="text-4xl text-black font-bold mb-5 ">Cart</h1>
          <hr />
        </div>
        <div className="flex-1 mt-20 ">
          {/* <TableCartCustomer carts={carts} /> */}
        </div>
      </div>
    </div>
  );
};

export default Carts;
