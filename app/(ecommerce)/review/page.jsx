import React from "react";
import "../../satoshi.css";
import "../../globals.css";
import ReviewPages from "@/components/Reviews/Reviews-list";
import { cookies } from "next/headers";

export const metadata = {
  title: "Review | Streetflow",
};

async function getUserOrder() {
  const cookieStore = cookies();
  const token = cookieStore.get("tokenCustomer");

  const res = await fetch("http://localhost:8000/api/order/user/orderList", {
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

const Review = async () => {
  const orderdata = await getUserOrder();
  const cookieStore = cookies();
  const token = cookieStore.get("tokenCustomer");
  const reviewdata = await getUserReview();
  return (
    <>
      <div className="container mx-auto px-4">
        <ReviewPages
          orderdata={orderdata}
          token={token.value}
          review={reviewdata}
        />
      </div>
    </>
  );
};

export default Review;
