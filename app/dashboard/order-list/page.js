"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Tables from "@/components/Tables/TableOrder";

const OrderList = () => {
	return (
		<>
			<Breadcrumb pageName="OrderList" />
			<div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
				<Tables />
			</div>
		</>
	);
};

export default OrderList;
