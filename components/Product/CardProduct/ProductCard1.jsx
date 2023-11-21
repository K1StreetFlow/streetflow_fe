// ProductCard1.jsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

const ProductCard1 = ({ product }) => {
  if (!product || !product.category || product.category.id !== 1) {
    return null;
  }

  return (
    <div>
      
      <div className="max-w-xs gap-3 ms-3 bg-white rounded-lg overflow-hidden shadow-md mx-auto">
        <Link href={`/detail/${product.id}`}>
          <div className="block">
            <div className="overflow-hidden">
              <Image
                src={`http://localhost:8000/api/photo_products/view/${product.photo.photo_product}`}
                width={200}
                height={200}
                alt={product.name_product}
                objectFit="cover"
              />
            </div>
          </div>
        </Link>
        <div className="p-4">
          <Link href={`/detail/${product.id}`}>
            <div className="block">
              <h5 className="text-md font-bold tracking-tight text-black dark:text-white">
                {product.name_product}
              </h5>
            </div>
          </Link>
          <div className="flex justify-between items-center">
            <p className="text-meta-7 dark:text-gray-400">
              ${product.price_product}
            </p>
            <p className="text-body dark:text-boxdark">
              Stock: {product.stock_product}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard1;