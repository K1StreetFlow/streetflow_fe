import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function DetailCart({ id }) {
  return (
    <Link href={`carts/${id}`}>
      <button className="btn bg-info btn-sm text-white">
        <Image
          src="/images/icon/info-circle.svg"
          width={15}
          height={15}
          alt="detail"
        />
      </button>
    </Link>
  );
}
