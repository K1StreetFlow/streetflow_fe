import Image from "next/image";
import React from "react";
import Address from "./Address";

async function getCartById(id) {
  const res = await fetch(`http://localhost:8000/api/carts/${id}`);
  return res.json();
}

async function getAllCarts() {
  const res = await fetch("http://localhost:8000/api/carts/2", {
    next: {
      revalidate: 0,
    },
  });
  return res.json();
}

const Checkout = async () => {
  // const data = await getCartById(params.id);
  const data = await getAllCarts();
  return (
    <div className="flex justify-center my-6">
      <div className="flex flex-col w-full h-120 p-20 mt-20 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5">
        <div>
          <h1 className="text-4xl text-black font-bold mb-5 ">Checkout Page</h1>
          <hr />
        </div>
        <div className="flex-1 mt-20">
          <Address data={data} />

          <hr className="mt-10" />
          <h2 className=" mt-10 mb-5 font-bold text-2xl text-black">
            Product Detail
          </h2>
          <div>
            <div className="flex flex-col gap-7.5 py-3">
              <div className="flex flex-row gap-5.5  ">
                <table className="table w-full py-15">
                  <thead>
                    <tr>
                      <th className="w-30 text-lg font-bold text-black ">
                        Photo
                      </th>
                      <th className="w-1/2 text-lg font-bold text-black">
                        Name Product
                      </th>
                      <th className="w-30 text-center text-lg font-bold text-black">
                        Price Product
                      </th>
                      <th className="w-30 text-center text-lg font-bold text-black">
                        Quantity
                      </th>
                      <th className="w-auto text-right text-lg font-bold text-black">
                        Total Price
                      </th>
                    </tr>
                  </thead>
                  {data.cart_detail?.map((cart, key) => (
                    <tbody>
                      <tr>
                        <td>
                          <Image
                            src="/images/product/product-01.png"
                            width={200}
                            height={200}
                            className="w-20 rounded"
                            alt="Thumbnail"
                          />
                        </td>
                        <td className="text-base text-black font-bold">
                          {cart.product.name_product}
                        </td>
                        <td className="text-center text-base text-black">
                          Rp{" "}
                          {cart.product.price_product.toLocaleString("id-ID")}
                        </td>
                        <td className="text-center text-base text-black">
                          {cart.quantity}
                        </td>
                        <td className="text-right text-base text-black">
                          Rp {cart.total_price.toLocaleString("id-ID")}
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>

          <div className="flex justify-end my-20 ">
            <div className="pe-5">
              <div className="mb-5">Grand Total</div>
              <div className="mb-5">Ongkos Pengiriman</div>
              <div className="text-xl font-bold text-black">Total</div>
            </div>
            <div className="flex flex-col w-50 items-end">
              <div className="mb-5">
                Rp {data.grand_price.toLocaleString("id-ID")}
              </div>
              <div className="mb-5">-</div>
              <div className="text-2xl font-bold text-black">
                Rp {data.grand_price.toLocaleString("id-ID")}
              </div>
              <button className="btn btn-primary text-white mt-10 ">
                Pilih metode pembayaran
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
