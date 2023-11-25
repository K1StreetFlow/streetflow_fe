"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

import { formatDate } from "@/app/utils/formatDate";

const Payment = ({ params }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/payments/${params.id}`,
          {
            withCredentials: true,
          }
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.id]); // Menerapkan useEffect setiap kali params.id berubah

  if (!data) {
    // Menampilkan indikator loading atau pesan bahwa data sedang dimuat
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9 ">
        <h2 className="mb-5 font-bold text-xl">Customer Detail</h2>
        <div className="flex flex-col gap-7.5">
          <div className="flex flex-row gap-5.5 ">
            <div className="w-full sm:w-1/2">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <div className="relative">
                <h3>{data?.cart?.user_customer?.fullname || "N/A"}</h3>
              </div>
            </div>

            <div className="w-full sm:w-1/2">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="email"
              >
                Username
              </label>

              <h3>{data?.cart?.user_customer?.username || "N/A"}</h3>
            </div>
            <div className="w-full sm:w-1/2">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>

              <h3>{data?.cart?.user_customer?.phone_number || "N/A"}</h3>
            </div>
          </div>
          <div className="flex flex-col gap-5.5 sm:flex-row">
            <div className="w-[32%]">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="fullName"
              >
                Gender
              </label>
              <div className="relative">
                <h3>{data?.cart?.user_customer?.gender || "N/A"}</h3>
              </div>
            </div>
            <div className="w-110">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="fullName"
              >
                Email
              </label>
              <div className="relative">
                <h3>{data?.cart?.user_customer?.email || "N/A"}</h3>
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-10" />
        <h2 className="mb-5 mt-10 font-bold text-xl">Payment Detail</h2>
        <div className="flex flex-col gap-7.5 mb-20">
          <div className="flex flex-row gap-5.5 ">
            <div className="w-full sm:w-1/2">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="fullName"
              >
                Payment Method
              </label>
              <div className="relative">
                <h3>{data?.method_payment || "N/A"}</h3>
              </div>
            </div>

            <div className="w-full sm:w-1/2">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="email"
              >
                Total Payment
              </label>

              <h3>Rp {data?.total_payment || "N/A"}</h3>
            </div>
            <div className="w-full sm:w-1/2">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="email"
              >
                Total Payment
              </label>

              <h3>Rp {data?.total_payment || "N/A"}</h3>
            </div>
            <div className="w-full sm:w-1/2">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="phoneNumber"
              >
                Status Payment
              </label>

              <p
                className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                  data?.status_payment === "Success"
                    ? "text-success bg-success"
                    : data?.status_payment === "Failed"
                    ? "text-danger bg-danger"
                    : "text-warning bg-warning"
                }`}
              >
                {data?.status_payment || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-5.5 sm:flex-row mt-5">
            <div className="w-[32%]">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="fullName"
              >
                Date Payment
              </label>
              <div className="relative">
                <h3>{formatDate(data?.date_payment || "N/A")}</h3>
              </div>
            </div>
            <div className="w-1/3">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="fullName"
              >
                Code Payment
              </label>
              <div className="relative">
                <h3>{data?.code_payment || "N/A"}</h3>
              </div>
            </div>
            <div className="w-1/3">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="fullName"
              >
                Virtual Account Type
              </label>
              <div className="relative">
                <h3>{data?.va_type || "N/A"}</h3>
              </div>
            </div>
            <div className="w-1/3">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="fullName"
              >
                Virtual Account
              </label>
              <div className="relative">
                <h3>{data?.va_number || "N/A"}</h3>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Link href={"/waiting-payment"}>
            <button className="btn btn-error text-white">Back</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Payment;
