import React from "react";
import Link from "next/link";

export default function DetailCart({ id }) {
  return (
    <Link href={`carts/${id}`}>
      <button className="btn bg-success btn-sm text-white">Detail</button>
    </Link>
  );
}
