import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOrder from "./TableOrder";

const OrderList = () => {
	return (
		<>
			<Breadcrumb pageName="Order List" />
			<div className="flex flex-wrap">
				<TableOrder />
			</div>
		</>
	);
};

export default OrderList;
