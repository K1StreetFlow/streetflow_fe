// ProductCard1.jsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <div className="w-full mx-2 my-4 bg-white box rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <Link href={`/product/detail/${product.id}`}>
        <div>
          <Image
            src={`http://localhost:8000/api/photo_products/view/${product.photo.photo_product}`}
            width={320} // Adjust the width as needed
            height={100} // Adjust the height as needed
            alt={product.name_product}
            className="object-fill"
          />
        </div>
      </Link>
      <div className="px-2 py-2">
      <p  className="text-xs">stretflow</p>
        <Link href={`/product/detail/${product.id}`}>
          <div className="block text-sm font-bold text-black   mb-1">
            {product.name_product}
          </div>
        </Link>
        <p className="text-meta-1 text-xs">
          RP.{product.price_product.toLocaleString("id-ID")} 
        </p>
        <p className="text-xs"> Stock: {product.stock_product}</p>
      </div>
    </div>
  );
};

export default ProductCard;
