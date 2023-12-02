import React from "react";
import ProductList from "@/components/Product/ProductList";

export const metadata = {
  title: "Home | Streetflow",
};

const page = () => {
  return (
    <>
      <ProductList />
    </>
  );
};

export default page;
