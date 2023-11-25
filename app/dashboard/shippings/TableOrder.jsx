"use client";
import { formatDates } from "../../utils/formatDate";
import DetailOrder from "./detailOrder";
import { useEffect, useState } from "react";
import axios from "axios";

// async function getAllOrders() {
//   const res = await fetch(`http://localhost:8000/api/shippings`, {
//     credentials: "include",
//     next: {
//       revalidate: 0,
//     },
//   });
//   return res.json();
// }

// const TableOrder = async () => {
//   const orders = await getAllOrders();
//   console.log(orders);

const TableOrder = () => {
	const [orders, setOrders] = useState([]);

	const handleEditStatus = async (orderId, newStatus) => {
		try {
			const response = await axios.put(
				`http://localhost:8000/api/shippings/updateorder/${orderId}`,
				{
					status_order: newStatus,
					name_courier: "JNE",
				},
				{
					withCredentials: true,
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status === 200) {
				// Update the local state
				setOrders((prevOrders) =>
					prevOrders.map((order) =>
						order.id === orderId ? { ...order, order_list: { ...order.order_list, status_order: newStatus } } : order
					)
				);
			}
		} catch (error) {
			console.error("Error updating order status:", error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("http://localhost:8000/api/shippings", {
					withCredentials: true,
				});
				setOrders(response.data.data);
				console.log("ini response", response);
				console.log("ini respon data", response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
			<div className="max-w-full overflow-x-auto">
				<table className="w-full table-auto">
					<thead>
						<tr className="bg-gray-2 text-left dark:bg-meta-4">
							<th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Order ID</th>
							<th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Customer</th>
							<th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Order</th>
							<th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">Date</th>
							<th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">Amount</th>
							<th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">Status</th>
							<th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
						</tr>
					</thead>
					<tbody>
						{orders?.map((order, key) => (
							<tr key={key}>
								<td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
									<h5 className="font-medium text-black dark:text-white">{order.order_list?.code_order}</h5>
								</td>
								<td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
									<h5 className="font-medium text-black dark:text-white">{order.address.user_customer.fullname}</h5>
								</td>
								<td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
									<h5 className="font-medium text-black dark:text-white">
										{order.order_list?.cart.cart_detail.map((detail) => detail.product.name_product).join(", ")}
									</h5>
								</td>
								<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
									<p className="text-black dark:text-white">{formatDates(order.createdAt)}</p>
								</td>
								<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
									<p className="text-black dark:text-white">
										Rp {order.order_list?.payment.total_payment.toLocaleString("id-ID")}
									</p>
								</td>
								<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
									<select
										className="border border-[#eee] rounded-sm py-2 px-3 text-sm font-medium text-black dark:text-white"
										value={order.order_list?.status_order}
										onChange={(e) => handleEditStatus(order.id, e.target.value)}
									>
										<option value="Paid">Paid</option>
										<option value="Delivered">Delivered</option>
										<option value="Completed">Completed</option>
										<option value="Packaged">Packaged</option>
										<option value="Unpaid">Unpaid</option>
									</select>
								</td>
								<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
									<div className="flex items-center space-x-3.5 justify-center">
										<DetailOrder id={order.id} />
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

export default TableOrder;
