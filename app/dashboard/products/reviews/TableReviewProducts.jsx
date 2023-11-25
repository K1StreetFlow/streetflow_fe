"use client";
import Image from "next/image";
// import AddReview from "@/app/dashboard/products/reviews/addReviewProducts";
import EditReview from "@/app/dashboard/products/reviews/editReviewProducts";
import DeleteReview from "@/app/dashboard/products/reviews/deleteReviewProducts";
import DetailReview from "@/app/dashboard/products/reviews/detailReviewProducts";
import { useState, useEffect } from "react";
import axios from "axios";

// async function getAllReviewProducts() {
//   const res = await fetch("http://localhost:8000/api/review-products", {
//     credentials: "include",
//     next: {
//       revalidate: 0,
//     },
//   });
//   return res.json();
// }

// async function getAllCustomer() {
//   const res = await fetch("http://localhost:8000/api/user", {
//     credentials: "include",
//     next: {
//       revalidate: 0,
//     },
//   });
//   return res.json();
// }

// async function getAllProducts() {
//   const res = await fetch("http://localhost:8000/api/products", {
//     credentials: "include",
//     next: {
//       revalidate: 0,
//     },
//   });
//   return res.json();
// }

// async function getAllOrderList() {
//   const res = await fetch("http://localhost:8000/api/order", {
//     credentials: "include",
//     next: {
//       revalidate: 0,
//     },
//   });
//   return res.json();
// }

// const TableReviewProducts = async () => {
//   let count = 1;

//   const reviews = await getAllReviewProducts();
//   const users = await getAllCustomer();
//   const products = await getAllProducts();
//   const order_list = await getAllOrderList();

//console.log(reviews);

const TableReviewProducts = () => {
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviewsResponse = await axios.get("http://localhost:8000/api/review-products", {
          withCredentials: true,
        });
        console.log("Reviews Data:", reviewsResponse.data);
        setReviews(reviewsResponse.data);

        const usersResponse = await axios.get("http://localhost:8000/api/user", {
          withCredentials: true,
        });
        console.log("Users Data:", usersResponse.data);
        setUsers(usersResponse.data);

        const productsResponse = await axios.get("http://localhost:8000/api/products", {
          withCredentials: true,
        });
        console.log("Products Data:", productsResponse.data);
        setProducts(productsResponse.data);

        const orderListResponse = await axios.get("http://localhost:8000/api/order", {
          withCredentials: true,
        });
        console.log("Order List Data:", orderListResponse.data);
        setOrderList(orderListResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs once when the component mounts

  let count = 1;

  // Continue with the rest of your component logic, using the state variables

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">{/* <AddReview users={users} products={products} order_list={order_list} /> */}</div>

      <div className="py-10 px-10">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="py-4 px-4 font-medium text-black dark:text-white">#</th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Customer Name</th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Product Name</th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Code Order</th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.data?.map((review, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h6 className="font-medium text-black dark:text-white">{review?.id}</h6>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h5 className="font-medium text-black dark:text-white">{review?.users_customer?.fullname}</h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h5 className="font-medium text-black dark:text-white">{review?.products?.name_product}</h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h5 className="font-medium text-black dark:text-white">{review?.order_list?.code_order}</h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center justify-center space-x-3.5">
                    <DetailReview id={review?.id} />
                    <EditReview review={review} users={users} products={products} order_list={orderList} />
                    <DeleteReview {...review} />
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

export default TableReviewProducts;
