import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import axios from "axios";

async function getOrderById(id) {
  const res = await fetch(`http://localhost:8000/api/shippings/${id}`);
  return res.json();
}

// async function getCheckoutProductByOrderId(id) {
//   const res = await fetch(
//     `http://localhost:8000/api/checkout-product/order/${id}`
//   );
//   return res.json();
// }
// async function getOrderById(id) {
//   const res = await fetch(`http://localhost:8000/api/shippinhs/${id}`);
//   return res.json();
// }

function getImageUrl(filename) {
  return `http://localhost:8000/api/photo_products/view/${filename}`;
}

const ModalDetailTransaksi = ({ id }) => {
  const [data, setData] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/checkout-product/order/${id}`,
          {
            withCredentials: true,
          }
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    getOrderById(id).then((data) => setData(data));
  }, [id]);

  if (!data) return null;

  return (
    <div>
      <div className="p-5 border-b-4 border-y-meta-9">
        <h3
          className={`inline-flex rounded-sm bg-opacity-10 py-1 px-3 text-base font-medium mb-3 ${
            data.data.order_list.status_order === "Paid"
              ? "text-primary bg-primary"
              : data.data.order_list.status_order === "Delivered"
              ? "text-[#F3B664] bg-[#F1EB90]"
              : data.data.order_list.status_order === "Completed"
              ? "text-success bg-success"
              : data.data.order_list.status_order === "Packaged"
              ? "text-warning bg-warning"
              : data.data.order_list.status_order === "Unpaid"
              ? "text-danger bg-danger"
              : "text-secondary bg-secondary"
          }`}
        >
          {data.data.order_list.status_order}
        </h3>
        <div className="flex justify-between mb-2">
          <p>Order ID</p>
          <p className="font-semibold">#{data.data.order_list.code_order}</p>
        </div>
        <div className="flex justify-between">
          <p>Order Payment</p>
          <p className="font-semibold">
            {data.data.order_list.payment.code_payment}
          </p>
        </div>
      </div>
      <div className="p-5 border-b-4 border-y-meta-9">
        <h3 className="font-semibold mb-3 text-lg">Product Details</h3>
        {product?.map((detail, index) => (
          <div
            key={index}
            className="flex border border-meta-9 rounded-md p-4 justify-between mb-2"
          >
            <div className="flex mb-2 w-200 pr-5">
              <Image
                src={getImageUrl(detail.product.photo.photo_product)}
                width={62}
                height={62}
                className="rounded-md mr-4"
                alt={"ada"}
              ></Image>
              <div>
                <p className="font-semibold">{detail.product.name_product}</p>
                <p className="text-sm">
                  {detail.quantity} x Rp
                  {detail.product.price_product.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p>Total price</p>
              <p className="font-semibold text-sm">
                Rp
                {detail.product.price_product *
                  detail.quantity.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-5 border-b-4 border-y-meta-9">
        <h3 className="font-semibold mb-3 text-lg">Shipping Info</h3>
        <div className="flex mb-2">
          <p className="w-40">Courier</p>
          <span className="mr-3">:</span>
          <p className="font-semibold">{data.data.name_courier}</p>
        </div>
        <div className="flex mb-2">
          <p className="w-40">No Receipt</p>
          <span className="mr-3">:</span>
          <p className="font-semibold">{data.data.receipt_number}</p>
        </div>
        <div className="flex">
          <p className="w-40">Address</p>
          <span className="mr-3">:</span>
          <div>
            <p className="font-semibold">
              {data.data.address.user_customer.fullname}
            </p>
            <p>{data.data.address.user_customer.phone_number}</p>
            <p>
              {data.data.address.street}, {data.data.address.house_number},{" "}
              {data.data.address.city}, {data.data.address.province},
              {data.data.address.zipcode}
            </p>
          </div>
        </div>
      </div>
      <div className="p-5 border-gray-200">
        <h3 className="font-semibold mb-3 text-lg">Payment details</h3>
        <div className="flex justify-between mb-2 border-b border-y-meta-9">
          <p className="mb-2">Payment method</p>
          <p>{data.data.order_list.payment.method_payment}</p>
        </div>
        <div className="flex justify-between mt-4 mb-2">
          <p>Total price</p>
          <p>
            Rp{" "}
            {data.data.order_list.payment.total_payment.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="flex justify-between">
          <p>Total Item Discount</p>
          <p>Rp 0</p>
        </div>
        <div className="flex justify-between mt-4 border-t border-y-meta-9">
          <p className="mt-2">Total Shopping</p>
          <p className="font-semibold mt-2">
            Rp{" "}
            {data.data.order_list.payment.total_payment.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModalDetailTransaksi;
