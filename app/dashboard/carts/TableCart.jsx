"use client";
import Image from "next/image";
import DetailCart from "@/app/dashboard/carts/detailCart";
import { useEffect, useState } from "react";

// async function getAllCarts() {
//   const res = await fetch("http://localhost:8000/api/carts", {
//     next: {
//       revalidate: 0,
//     },
//   });
//   return res.json();
// }

// async function getAllCarts() {
//   try {
//     const res = await fetch("http://localhost:8000/api/carts", {
//       credentials: "include",
//       next: {
//         revalidate: 0,
//       },
//     });
//     const data = await res.json();
//     console.log("ini adalah cart: ", data);
//     return data;
//   } catch (error) {
//     console.error("Error fetching carts:", error);
//   }
// }

// const TableCart = async () => {
//   let count = 1;
//   const carts = await getAllCarts();

const TableCart = () => {
  const [carts, setCarts] = useState([]);
  let count = 1;

  const getAllCarts = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/carts", {
        credentials: "include",
        next: {
          revalidate: 0,
        },
      });
      const data = await res.json();
      console.log("ini adalah cart: ", data);
      setCarts(data);
    } catch (error) {
      console.error("Error fetching carts:", error);
    }
  };

  useEffect(() => {
    getAllCarts();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto mt-10">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[30px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11 text-center ">#</th>
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">User Customer</th>
              <th className="min-w-[50] py-4 px-4 font-medium text-black dark:text-white text-center">Total Product</th>
              <th className="min-w-40 py-4 px-4 font-medium text-black dark:text-white ">Grand Price</th>
              <th className="py-4 px-4 font-medium text-black dark:text-white text-center ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(carts) &&
              carts?.map((cart, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                    <p className="text-black dark:text-white">{count++}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{cart.user_customer.fullname}</p>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark ">
                    <p className="text-black dark:text-white text-center ">{cart.total_product}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">Rp {cart.grand_price.toLocaleString("id-ID")}</p>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5 justify-center">
                      <DetailCart id={cart.cart_id} />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableCart;
