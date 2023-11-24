import Image from "next/image";

async function getAllCartDetails() {
  const res = await fetch("http://localhost:8000/api/cart-details", {
    next: {
      revalidate: 0,
    },
  });
  return res.json({ data: res.data });
}

const TableCartDetail = async () => {
  let count = 1;
  const data = await getAllCartDetails();

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-10 px-10 max-w-full overflow-x-auto">
        <table className="w-full table-auto mt-10">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[30px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11 text-center ">
                #
              </th>
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">
                User Customer
              </th>
              <th className="min-w-[50] py-4 px-4 font-medium text-black dark:text-white text-center">
                Photo Product
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Name Product
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white text-center ">
                Price Product
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white text-center ">
                Quantity
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Total Price
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((cart_detail, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                  <p className="text-black dark:text-white">{count++}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {cart_detail.cart.user_customer.fullname}
                  </p>
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark ">
                  <p className="text-black dark:text-white text-center ">
                    <Image
                      src={"/images/product/product-03.png"}
                      width={100}
                      height={100}
                      className="rounded "
                    />
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {cart_detail.product.name_product}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white text-center ">
                    Rp{" "}
                    {cart_detail.product.price_product.toLocaleString("id-ID")}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white text-center ">
                    {cart_detail.quantity}
                  </p>
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5 justify-center">
                    Rp {cart_detail.total_price.toLocaleString("id-ID")}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>User Customer</th>
              <th>Photo Product</th>
              <th>Name Product</th>
              <th>Price Product</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((cart_detail, key) => (
              <tr key={key}>
                <td>{count++}</td>
                <td>{cart_detail.cart.user_customer.fullname}</td>
                <td>
                  <Image
                    src={"/images/product/product-03.png"}
                    width={100}
                    height={100}
                    className="rounded "
                  />
                </td>
                <td>{cart_detail.product.name_product}</td>
                <td>
                  Rp {cart_detail.product.price_product.toLocaleString("id-ID")}
                </td>
                <td>{cart_detail.quantity}</td>
                <td>Rp {cart_detail.total_price.toLocaleString("id-ID")}</td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    </div>
  );
};

export default TableCartDetail;