import React from "react";
import Checkout from "./Checkout";

async function getCartById(id) {
  const res = await fetch(`http://localhost:8000/api/carts/${id}`);
  return res.json();
}

async function getAllCarts() {
  const res = await fetch("http://localhost:8000/api/carts/2", {
    next: {
      revalidate: 0,
    },
  });
  return res.json();
}

const page = async () => {
  const data = await getAllCarts();

  return (
    <div className="flex justify-center my-6">
      <div className="flex flex-col w-full h-120 p-20 mt-20 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5">
        <Checkout data={data} />
      </div>
    </div>
  );
};

export default page;
