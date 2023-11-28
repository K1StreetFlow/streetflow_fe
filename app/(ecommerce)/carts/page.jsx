import React from "react";
import TableCartCustomer from "@/app/(ecommerce)/carts/tableCart";
import { cookies } from "next/headers";

async function getAllCarts() {
  const cookieStore = cookies();
  const token = cookieStore.get("tokenCustomer");

  const res = await fetch("http://localhost:8000/api/carts/user/cart", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      cookie: `tokenCustomer=${token.value}`,
    },

    credentials: "include",
  });

  return res.json();
}

const Carts = async () => {
  const cookieStore = cookies();
  let token = cookieStore.get("tokenCustomer");

  const carts = await getAllCarts();

  return (
    <div className="flex justify-center my-6">
      <div className="flex flex-col w-full h-120 p-20 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5">
        <div>
          <h1 className="text-4xl text-black font-bold mb-5 ">Cart</h1>
          <hr />
        </div>
        <div className="flex-1 mt-20 ">
          <TableCartCustomer carts={carts} token={token.value} />
        </div>
      </div>
    </div>
  );
};

export default Carts;
