import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOrder from "./TableOrder";

const OrderList = () => {
	return (
		<>
			<Breadcrumb pageName="Order List" />
			<div className="">
				<TableOrder />
			</div>
		</>
	);
};

export default OrderList;
