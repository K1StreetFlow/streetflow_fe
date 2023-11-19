import React from "react";
import Link from "next/link";

export default function DetailPayment({ id }) {
  return (
    <Link href={`payments/${id}`}>
      <button className="btn bg-success btn-sm text-white">Detail</button>
    </Link>
  );
}
