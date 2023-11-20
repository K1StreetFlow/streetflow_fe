import DataTable from "react-data-table-component";
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

	const columns = [
		{
			name: "Product Name",
			selector: (row) => row.order_list.cart_details.product.name_product,
			sortable: true,
		},
		{
			name: "Order Date",
			selector: (row) => formatDates(row.createdAt),
			sortable: true,
		},
		{
			name: "Total Payment",
			selector: (row) => `Rp ${row.order_list.payment.total_payment.toLocaleString("id-ID")}`,
			sortable: true,
		},
		{
			name: "Order Status",
			selector: (row) => row.order_list.status_order,
			sortable: true,
			cell: (row) => (
				<p
					className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
						row.order_list.status_order === "Paid" || row.order_list.status_order === "Delivered"
							? "text-success bg-success"
							: row.status_order === "Unpaid"
							? "text-danger bg-danger"
							: ""
					}`}
				>
					{row.order_list.status_order}
				</p>
			),
		},
		// Add more columns as needed
	];

	return (
		<div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
			<div className="max-w-full overflow-x-auto">
				<DataTable title="Orders" columns={columns} data={orders} pagination paginationPerPage={10} />
			</div>
		</div>
	);
};

export default TableOrder;
