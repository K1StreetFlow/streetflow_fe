import Image from "next/image";
import AddCartDetail from "./addCartDetail";
import EditCartDetail from "./editCartDetail";
import DeleteCartDetail from "./deleteCartDetail";

async function getAllCartDetails() {
  const res = await fetch("http://localhost:8000/api/cart-details", {
    next: {
      revalidate: 0,
    },
  });
  return res.json({ data: res.data });
}

async function getAllCarts() {
  const res = await fetch("http://localhost:8000/api/carts", {
    next: {
      revalidate: 0,
    },
  });
  return res.json();
}

async function getAllProducts() {
  const res = await fetch("http://localhost:8000/api/products", {
    next: {
      revalidate: 0,
    },
  });
  return res.json();
}

const TableCartDetail = async () => {
  let count = 1;

  const data = await getAllCartDetails();
  const carts = await getAllCarts();
  const products = await getAllProducts();

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <AddCartDetail carts={carts} products={products} />
      </div>

      <div className="py-10 px-10">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>User Customer</th>
              <th>Name Product</th>
              <th>Price Product</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((cart_detail, key) => (
              <tr key={key}>
                <td>{count++}</td>
                <td>{cart_detail.cart.user_customer.fullname}</td>
                <td>{cart_detail.product.name_product}</td>
                <td>{cart_detail.product.price_product}</td>
                <td>{cart_detail.quantity}</td>
                <td>{cart_detail.total_price}</td>
                <td>
                  <div className="flex items-center justify-center space-x-3.5">
                    <EditCartDetail
                      cart_detail={cart_detail}
                      carts={carts}
                      products={products}
                    />
                    <DeleteCartDetail {...cart_detail} />
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

export default TableCartDetail;
