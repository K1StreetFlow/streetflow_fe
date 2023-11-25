"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

// async function getCartById(id) {
//   const res = await fetch(`http://localhost:8000/api/carts/${id}`);
//   return res.json();
// }

// const Details = async ({ params }) => {
//   const data = await getCartById(params.id);
//   let count = 1;
//   console.log(data.cart_detail);

const Details = ({ params }) => {
  const [data, setData] = useState(null);
  let count = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/carts/${params.id}`, {
          withCredentials: true,
        });
        setData(response.data);
        console.log(response.data.cart_detail);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Cleanup function to clear data when component unmounts
    return () => {
      setData(null);
    };
  }, [params.id]);

  return (
    <>
      <Breadcrumb pageName="Details" />

      <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9 ">
        <h2 className="mb-2 font-bold text-xl text-primary">Customer Detail</h2>
        <div className="flex flex-col gap-7.5">
          <div className="flex flex-row gap-5.5 ">
            <div className="w-full sm:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="fullName">
                Full Name
              </label>
              <div className="relative">{data?.user_customer?.fullname ? <h3>{data.user_customer.fullname}</h3> : <span>N/A</span>}</div>
            </div>

            <div className="w-full sm:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="email">
                Username
              </label>

              <h3>{data?.user_customer?.username ?? "N/A"}</h3>
            </div>
            <div className="w-full sm:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="phoneNumber">
                Phone Number
              </label>

              <h3>{data?.user_customer?.phone_number || "N/A"}</h3>
            </div>
          </div>
          <div className="flex flex-col gap-5.5 sm:flex-row">
            <div className="w-[32%]">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="fullName">
                Gender
              </label>
              <div className="relative">
                <h3>{data?.user_customer?.gender || "N/A"}</h3>
              </div>
            </div>
            <div className="w-110">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="fullName">
                Email
              </label>
              <div className="relative">
                <h3>{data?.user_customer?.email || "N/A"}</h3>
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-10" />
        <h2 className=" mt-10 font-bold text-xl bg-slate-950 text-primary">Product Detail</h2>
        {data?.cart_detail?.map((cart, key) => (
          <div key={key}>
            <div className="flex flex-col gap-7.5 py-10">
              <div className="font-bold bg-slate-800">
                <h3>Product {count++}</h3>
                <hr className="w-20 mt-1 " />
              </div>
              <div className="flex flex-row gap-5.5 ">
                <div className="w-full sm:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="productName">
                    Product Name
                  </label>
                  <div className="relative">
                    <h3>{cart?.product?.name_product || "N/A"}</h3>
                  </div>
                </div>

                <div className="w-full sm:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="category">
                    Category
                  </label>

                  <h3>{cart?.product?.id_category_product || "N/A"}</h3>
                </div>
                <div className="w-full sm:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="priceProduct">
                    Price Product
                  </label>

                  <h3>Rp {cart?.product?.price_product || "N/A"}</h3>
                </div>
              </div>
              <div className="flex flex-col gap-5.5 sm:flex-row">
                <div className="w-[32%]">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="quantity">
                    Quantity
                  </label>
                  <div className="relative">
                    <h3>{cart?.quantity || "N/A"}</h3>
                  </div>
                </div>
                <div className="w-1/3">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="totalPrice">
                    Total Price
                  </label>
                  <div className="relative">
                    <h3>Rp {cart?.total_price || "N/A"}</h3>
                  </div>
                </div>
                <div className="w-1/3">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="totalPrice">
                    Photo Product
                  </label>
                  <div className="relative">
                    <h3>{cart?.product?.id_photo_product || "N/A"}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <Link href="/dashboard/carts">
          <button className="btn btn-error text-white">Back</button>
        </Link>
      </div>
    </>
  );
};

export default Details;
