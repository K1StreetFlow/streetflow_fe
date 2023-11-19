import Image from "next/image";
import AddCart from "@/app/dashboard/carts/addCart";
import EditCart from "@/app/dashboard/carts/editCart";
import DeleteCart from "@/app/dashboard/carts/deleteCart";
import DetailCart from "@/app/dashboard/carts/detailCart";

async function getAllCarts() {
  const res = await fetch("http://localhost:8000/api/carts", {
    next: {
      revalidate: 0,
    },
  });
  return res.json();
}

async function getAllCustomers() {
  const res = await fetch("http://localhost:8000/api/user", {
    next: {
      revalidate: 0,
    },
  });
  return res.json();
}

const TableCart = async () => {
  let count = 1;

  const users = await getAllCustomers();
  const carts = await getAllCarts();

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <AddCart users={users} />
      </div>

      <div className="py-10 px-10">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>User Customer</th>
              <th>Total Product</th>
              <th>Grand Price</th>
              <th className="flex justify-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {carts?.map((cart, key) => (
              <tr key={key}>
                <td>{count++}</td>
                <td>{cart.user_customer.fullname}</td>
                <td>{cart.total_product}</td>
                <td>{cart.grand_price}</td>
                <td>
                  <div className="flex items-center justify-center space-x-3.5">
                    <DetailCart id={cart.cart_id} />
                    <EditCart cart={cart} users={users} />
                    <DeleteCart {...cart} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableCart;
