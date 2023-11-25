"use client";
import {formatDate} from "@/app/utils/formatDate";
import Image from "next/image";
import DetailPayment from "@/app/dashboard/payments/detailPayment";
import DeletePayment from "@/app/dashboard/payments/deletePayment";
import { useEffect, useState } from "react";
import axios from "axios";

const TablePayment = () => {
  const [payments, setPayments] = useState([]);
  let count = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/payments", {
          withCredentials: true,
        });
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto mt-10">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[20px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">#</th>
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Name</th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Method Payment</th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">VA Type</th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Total Payment</th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Status</th>
              <th className="py-4 px-4 font-medium text-black dark:text-white text-center ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.data?.map((payment, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                  <p className="text-black dark:text-white">{count++}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{payment.cart.user_customer.fullname}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">{payment.method_payment}</h5>
                  <p className="text-sm">{formatDate(payment.date_payment)}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{payment.va_type}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">Rp {payment.total_payment.toLocaleString("id-ID")}</p>
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      payment.status_payment === "Success" ? "text-success bg-success" : payment.status_payment === "Failed" ? "text-danger bg-danger" : "text-warning bg-warning"
                    }`}
                  >
                    {payment.status_payment}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <DetailPayment id={payment.id} />
                    <DeletePayment {...payment} />
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

export default TablePayment;
