import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOrder from "@/app/dashboard/shipping/TableOrder";
import TableOrderBeta from "@/app/dashboard/shipping/TableOrderBeta";

const OrderList = () => {
	return (
		<>
			<Breadcrumb pageName="Order List" />
			<div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
				<TableOrder />
				<TableOrderBeta />
			</div>
		</>
	);
};

export default OrderList;
