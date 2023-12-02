import React from "react";
import "../../satoshi.css";
import "../../globals.css";
import OrderTransaction from "./OrderTransaction";
import { cookies } from "next/headers";

export const metadata = {
  title: "Transaction List | Streetflow",
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

const DetailTrasanksi = async () => {
  const orderdata = await getUserOrder();
  const cookieStore = cookies();
  const token = cookieStore.get("tokenCustomer");
  return (
    <>
      <div className="container mx-auto px-4">
        <OrderTransaction orderdata={orderdata} token={token.value} />
      </div>
    </>
  );
};

export default DetailTrasanksi;
