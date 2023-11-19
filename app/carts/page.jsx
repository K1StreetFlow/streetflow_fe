import React from "react";
import TableCart from "../dashboard/carts/TableCart";

import TableCartCustomer from "@/app/carts/tableCart";

export default function Carts() {
  return (
    <div className="flex justify-center my-6">
      <div className="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5">
        <div className="flex-1">
          <TableCartCustomer />
          <hr className="pb-6 mt-6" />
        </div>
      </div>
    </div>
  );
}
