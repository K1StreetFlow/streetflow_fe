import React from "react";
import Image from "next/image";

export default function ButtonEdit() {
  return (
    <button className="hover:text-primary">
      <Image
        src="/images/icon/edit.png"
        width={20}
        height={20}
        className="hover:text-primary"
      />
    </button>
  );
}
