import React from "react";
import Image from "next/image";

export default function ButtonEdit() {
  return (
    <button className="text-red-500">
      <Image src="/images/icon/edit.png" width={18} height={18} />
    </button>
  );
}
