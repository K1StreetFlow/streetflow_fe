import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { formatDate } from "@/app/utils/formatDate";
import Image from "next/image";

async function getOrderById(id) {
	const res = await fetch(`http://localhost:8000/api/shippings/${id}`, {
		next: {
			revalidate: 0,
		},
	});
	return res.json();
}

function getImageUrl(filename) {
	return `http://localhost:8000/api/photo_products/view/${filename}`;
}

const Order = async ({ params }) => {
	const { data } = await getOrderById(params.id);

	let groupedDetails = data.order_list?.cart.cart_detail.reduce((acc, detail) => {
		let existing = acc.find((item) => item.product.name_product === detail.product.name_product);
		if (existing) {
			existing.quantity += detail.quantity;
		} else {
			acc.push({ ...detail });
		}
		return acc;
	}, []);

	return (
		<>
			<Breadcrumb pageName="Order List" />

			<div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9 ">
				<h2 className="font-bold text-xl">Order Detail</h2>
				<div className="p-5 mt-5 border-b-2 border-gray-200">
					<h3 className="font-semibold mb-3 text-lg">{data.order_list?.status_order}</h3>
					<div className="flex justify-between mb-2">
						<p>Order ID</p>
						<p className="font-semibold">{data.order_list?.code_order}</p>
					</div>
					<div className="flex justify-between">
						<p>Order Payment</p>
						<p className="font-semibold">{formatDate(data.order_list?.payment.createdAt)}</p>
					</div>
				</div>
				<div className="p-5 border-b-2 border-gray-200">
					<h3 className="font-semibold mb-3 text-lg">Product Details</h3>
					{groupedDetails?.map((detail) => (
						<div key={detail.id} className="mb-4">
							<div className="flex border-2 border-gray-200 rounded-md p-4 justify-between">
								<div className="flex w-200 pr-5">
									<Image
										src={getImageUrl(detail.product.photo.photo_product)}
										width={62}
										height={62}
										className="rounded-md mr-4"
										style={{ objectFit: "cover" }}
										alt={detail.product.name_product}
									></Image>
									<div>
										<p className="font-semibold">{detail.product.name_product}</p>
										<p className="text-sm">
											{detail.quantity} x Rp {detail.product.price_product.toLocaleString("id-ID")}
										</p>
									</div>
								</div>
								<div className="text-right">
									<p>Total price</p>
									<p className="font-semibold">
										Rp{(detail.quantity * detail.product.price_product).toLocaleString("id-ID")}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className="p-5 border-b-2 border-gray-200">
					<h3 className="font-semibold mb-3 text-lg">Shipping Info</h3>
					<div className="flex mb-2">
						<p className="w-40">Courier</p>
						<span className="mr-3">:</span>
						<p className="font-semibold">{data.name_courier}</p>
					</div>
					<div className="flex mb-2">
						<p className="w-40">No Receipt</p>
						<span className="mr-3">:</span>
						<p className="font-semibold">{data.receipt_number}</p>
					</div>
					<div className="flex">
						<p className="w-40">Address</p>
						<span className="mr-3">:</span>
						<div>
							<p className="font-semibold">{data.address.user_customer.fullname}</p>
							<p>{data.address.user_customer.phone_number}</p>
							<p>
								{data.address.street}, {data.address.house_number}, {data.address.city}, {data.address.province},
								{data.address.zipcode}
							</p>
						</div>
					</div>
				</div>
				<div className="p-5 border-b-2 border-gray-200">
					<h3 className="font-semibold mb-3 text-lg">Payment details</h3>
					<div className="flex justify-between mb-2 border-b border-gray-200">
						<p className="mb-2">Payment method</p>
						<p>{data.order_list?.payment.method_payment}</p>
					</div>
					<div className="flex justify-between mt-4 mb-2">
						<p>Total price</p>
						<p>Rp {data.order_list?.payment.total_payment.toLocaleString("id-ID")}</p>
					</div>
					<div className="flex justify-between">
						<p>Total Item Discount</p>
						<p>Rp 0</p>
					</div>
					<div className="flex justify-between mt-4 border-t border-gray-200">
						<p className="mt-2">Total Shopping</p>
						<p className="font-semibold mt-2">Rp {data.order_list?.payment.total_payment.toLocaleString("id-ID")}</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Order;