import React from "react";

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
  console.log(data.user_customer);
  let count = 1;
  return (
    <div className="flex justify-center my-6">
      <div className="flex flex-col w-full h-120 p-20 mt-20 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5">
        <div className="flex-1 mt-20">
          <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9 ">
            <h2 className="mb-2 font-bold text-xl text-primary">
              Alamat Pengiriman
            </h2>
            <div className="flex flex-col gap-7.5">
              <div className="flex flex-row gap-5.5 ">
                {data.user_customer.address.map((address, key) => (
                  <div className="w-full sm:w-1/2  p-10 hover:bg-primary ">
                    <div>
                      <h2>{data.user_customer.fullname}</h2>
                      <h4>{data.user_customer.phone_number}</h4>
                      <p>
                        <span>
                          {address.street}
                          {address.house_number}
                          <br />
                          {address.city},{address.province}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <hr className="mt-10" />
            <h2 className=" mt-10 font-bold text-xl bg-slate-950 text-primary">
              Product Detail
            </h2>
            {data.cart_detail?.map((cart, key) => (
              <div>
                <div className="flex flex-col gap-7.5 py-3">
                  <div className="font-bold bg-slate-800">
                    <h3>Product {count++}</h3>
                    <hr className="w-20 mt-1 " />
                  </div>
                  <div className="flex flex-row gap-5.5  ">
                    <table className="table w-full py-15">
                      <thead>
                        <tr>
                          <th className="w-30">Photo</th>
                          <th className="w-1/2">Name Product</th>
                          <th className="w-30 text-center">Price Product</th>
                          <th className="w-30 text-center">Quantity</th>
                          <th className="w-auto text-right">Total Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td></td>
                          <td>Hodie Hitam Mulus</td>
                          <td className="text-center">Rp 56.000</td>
                          <td className="text-center">2</td>
                          <td className="text-right">Rp 112.000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-end my-20 ">
              <div className="pe-5">
                <div className="mb-5">Grand Total</div>
                <div className="mb-5">Ongkos Pengiriman</div>
                <div>Total</div>
              </div>
              <div className="flex flex-col w-50 items-end">
                <div className="mb-5">Rp 130.000</div>
                <div className="mb-5">Rp 12.000</div>
                <div className="text-2xl font-bold text-primary">
                  Rp 120.000.0
                </div>
                <button className="btn btn-success text-white mt-10 ">
                  Pilih metode pembayaran
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
