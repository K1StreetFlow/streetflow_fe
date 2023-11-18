"use client";
import Image from "next/image";
import ButtonDetail from "../ButtonDetail";
import ButtonDelete from "../ButtonDelete";
import ButtonAdd from "../ButtonAdd";
import ButtonEdit from "../ButtonEdit";

import { fetchDataCart } from "@/app/api/carts/api";

const TableCart = ({ data }) => {
  let count = 1;

  const handleDeleteCart = async (id) => {
    try {
      confirm("Are you sure want to delete this cart?");
      console.log(id);
      // const response = await fetchDataCart.deleteDataCart();
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <ButtonAdd title={"Create Cart"} route={"carts/create"} />
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">#</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Customer Name</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Total Product</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Total Price</p>
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <p className="font-medium">Action</p>
        </div>
      </div>

      {data?.map((cart, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">{count++}</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <Image
              src="/images/user/user-01.png"
              alt="Brand"
              width={48}
              height={48}
            />
            <p className="text-sm text-black dark:text-white ml-2">
              {cart.user_customer.fullname}
            </p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {cart.total_product}
            </p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">
              $ {cart.grand_price}
            </p>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <div className="flex items-center space-x-3.5">
              <ButtonDetail route={`carts/${cart.cart_id}`} />
              <ButtonEdit />
              <ButtonDelete />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableCart;
