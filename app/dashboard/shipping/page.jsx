import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOrder from "@/app/dashboard/shipping/TableOrder";

const OrderList = () => {
	return (
		<>
			<Breadcrumb pageName="Order List" />
			<div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
				<TableOrder />
			</div>
		</>
	);
};

export default OrderList;