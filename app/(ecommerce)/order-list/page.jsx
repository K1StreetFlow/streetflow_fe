<<<<<<< HEAD
import "../../satoshi.css";
import "../../globals.css";
import OrderTransaction from "./OrderTransaction";

export const metadata = {
	title: "Order | Streetflow",
};

const DetailTrasanksi = () => {
	return (
		<>
			<div className="container mx-auto px-4">
				<OrderTransaction />
			</div>
		</>
	);
};

export default DetailTrasanksi;
=======
import axios from "axios";

async function getOrderListById() {
  // const res = await fetch("http://localhost:8000/api/carts/2", {
  //   cache: "no-store",
  // });
  // return res.json();

  const res = await axios.get("http://localhost:8000/api/order/1");
  return res.data;
}
const page = async () => {
  const order_list = await getOrderListById();

  console.log(order_list);

  return (
    <div className="flex justify-center my-6">
      <div className="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5">
        <div className="flex-1 justify-center">
          <h1>Halaman Order List</h1>
        </div>
      </div>
    </div>
  );
};

export default page;
>>>>>>> 7895ca8446f646cc2ee398d4ef40008a9f27221d
