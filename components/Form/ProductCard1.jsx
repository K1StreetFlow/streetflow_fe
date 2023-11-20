// ProductCard1.jsx
import React from 'react';
import Image from 'next/image';

const ProductCard1 = ({ product }) => {
  // Menyaring produk hanya jika memiliki kategori dengan ID 1
  if (!product || !product.category || product.category.id !== 1) {
    return null; // Jika kategori bukan 1, maka tidak menampilkan card
  }

  return (
    <div className="max-w-full sm:max-w-xs md:max-w-md gap-2 lg:max-w-full bg-white rounded-lg overflow-hidden shadow-md dark:bg-gray-800 dark:border-gray-700 col-span-12 mb-4">
      <a href="#" className="block gap-2">
        <div className="rounded-t-xl overflow-hidden gap-2 ms-3">
          <Image
            src={`http://localhost:8000/api/photo_products/view/${product.photo.photo_product}`}
            width={200}
            height={200}
            alt={product.name_product}
            objectFit="cover"
          />
        </div>
      </a>
      <div className="p-4">
        <a href="#" className="block">
          <h5 className="mb-2 text-md font-bold tracking-tight text-black dark:text-white">
            {product.name_product}
          </h5>
        </a>
        <div className="flex justify-between items-center">
          <p className="text-sm text-meta-7 dark:text-gray-400">
            ${product.price_product}
          </p>
          <p className="text-sm text-body dark:text-boxdark">
            Stock: {product.stock_product}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard1;
