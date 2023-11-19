"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function updateStatusPayment() {
  const router = useRouter();
  async function handleClickUpdate() {
    await fetch(`http://localhost:8000/api/payments/update-status/pending`, {
      next: {
        revalidate: 0,
      },
    });
    router.refresh();
  }

  return (
    <button className="btn bg-info text-white" onClick={handleClickUpdate}>
      Update Status Payment
    </button>
  );
}
