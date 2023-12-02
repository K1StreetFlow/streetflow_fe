import React from "react";
import "@/app/satoshi.css";
import "@/app/globals.css";
import ReviewPages from "@/components/Reviews/Reviews.jsx";
import { cookies } from "next/headers";

export const metadata = {
  title: "Review | Streetflow",
};

async function getUserOrder(orderId) {
  const cookieStore = cookies();
  const token = cookieStore.get("tokenCustomer");

  const res = await fetch(`http://localhost:8000/api/order/${orderId}`, {
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

async function getUserReview() {
  const cookieStore = cookies();
  const token = cookieStore.get("tokenCustomer");

  const res = await fetch(
    `http://localhost:8000/api/review-products/user/review`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        cookie: `tokenCustomer=${token.value}`,
      },

      credentials: "include",
    }
  );

  return res.json();
}

const Review = async ({ params }) => {
  const orderId = params.orderId;
  const orderdata = await getUserOrder(orderId);
  const reviewdata = await getUserReview();
  const cookieStore = cookies();
  const token = cookieStore.get("tokenCustomer");
  return (
    <>
      <div className="container mx-auto px-4">
        <ReviewPages
          orderdata={orderdata.data}
          token={token.value}
          orderId={orderId}
          review={reviewdata}
        />
      </div>
    </>
  );
};

export default Review;
