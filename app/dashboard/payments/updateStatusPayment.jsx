"use client";

import React from "react";

export default function updateStatusPayment() {
  async function handleClickUpdate() {
    alert("Maintenance");
    // const res = await fetch(
    //   `https://api.sandbox.midtrans.com/v2/TES10/status`,
    //   {
    //     next: {
    //       revalidate: 0,
    //     },
    //     headers: {
    //       Authorization:
    //         "Basic " +
    //         Buffer.from(
    //           "SB-Mid-server-QzTg7Mjwxg-ael0bQkI7F8C6" + ":"
    //         ).toString("base64"),
    //     },
    //   }
    // );
    // const midtransData = await res.json();
    // console.log(res.json(midtransData));
  }

  return (
    <button className="btn bg-info text-white" onClick={handleClickUpdate}>
      Update Status Payment
    </button>
  );
}
