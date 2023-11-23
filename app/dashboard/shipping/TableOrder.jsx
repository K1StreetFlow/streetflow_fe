import { formatDates } from "@/app/utils/formatDate";
import DetailOrder from "@/app/dashboard/shipping/detailOrder";

async function getAllOrders() {
	const res = await fetch(`http://localhost:8000/api/shipping`, {
		next: {
			revalidate: 0,
		},
	});
	return res.json();
}

const TableOrder = async () => {
	const orders = await getAllOrders();

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
						{orders.data?.map((order, key) => (
							<tr key={key}>
								<td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
									<h5 className="font-medium text-black dark:text-white">{order.order_list.code_order}</h5>
								</td>
								<td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
									<h5 className="font-medium text-black dark:text-white">{order.address.users_customer.fullname}</h5>
								</td>
								<td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
									<h5 className="font-medium text-black dark:text-white">
									{order.order_list.cart.cart_detail.map((detail) => detail.product.name_product).join(', ')}
									</h5>
								</td>
								<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
									<p className="text-black dark:text-white">{formatDates(order.createdAt)}</p>
								</td>
								<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
									<p className="text-black dark:text-white">
										Rp {order.order_list.payment.total_payment.toLocaleString("id-ID")}
									</p>
								</td>
								<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
									<p
										className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
											order.order_list.status_order === "Paid"
												? "text-primary bg-primary"
												: order.order_list.status_order === "Delivered"
												? "text-[#F3B664] bg-[#F1EB90]"
												: order.order_list.status_order === "Completed"
												? "text-success bg-success"
												: order.order_list.status_order === "Packaged"
												? "text-warning bg-warning"
												: order.order_list.status_order === "Unpaid"
												? "text-danger bg-danger"
												: "text-secondary bg-secondary"
										}`}
									>
										{order.order_list.status_order}
									</p>
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
