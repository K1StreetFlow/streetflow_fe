import Link from "next/link";
import Image from "next/image";
import SidebarCustomer from "@/components/Sidebar/SidebarCustomer";
import {formatDate} from "../../utils/formatDate";
import axios from "axios";
import { cookies } from "next/headers";
// async function getPaymentById(code_payment) {
//   const res = await fetch(
//     `http://localhost:8000/api/payments/status-order/${code_payment}`,
//     {
//       next: {
//         revalidate: 0,
//       },
//     }
//   );
//   return res.json();
// }

// async function updatePayemnt(code_payment) {
//   await fetch(
//     `http://localhost:8000/api/payments/update-status/${code_payment}`,
//     {
//       next: {
//         revalidate: 0,
//       },
//     }
//   );
// }

async function getUserOrder() {
	const cookieStore = cookies();
	const token = cookieStore.get("tokenCustomer");

	const res = await fetch("http://localhost:8000/api/order/user/orderList", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			accept: "application/json",
			cookie: `tokenCustomer=${token.value}`,
		},

		credentials: "include",
	});

	return res.json();
}

async function getPaymentById(id) {
	const res = await fetch(`http://localhost:8000/api/payments/${id}`, {
		next: {
			revalidate: 0,
		},
	});
	return res.json();
}

async function getAllPayment() {
	const res = await fetch(`http://localhost:8000/api/payments`, {
		next: {
			revalidate: 0,
		},
	});
	return res.json();
}

const page = async ({ params }) => {
	const order = await getUserOrder();
	// console.log("ORDERRR", order);

	const { data } = await getAllPayment();

	console.log(data.data);

	return (
		<div className="flex items-start mt-10">
			<div className="w-1/5 ml-7 border-none rounded-lg pb-8 box text-[#212121]">
				<SidebarCustomer />
			</div>
			<div className="w-4/5 mb-5 text-[#212121]">
				<div className="box-2 ">
					<div className="flex mb-4 items-center">
						<div className="mr-4">
							<p className="font-semibold">Waiting Payment</p>
						</div>
					</div>
					{data.length ? (
						data.map((payment, key) => (
							<div className="box-3 mb-4" key={key}>
								<div className="flex justify-between mb-4 items-center ">
									<div className="inline-flex items-center ">
										<p className="mr-2">{formatDate(payment.date_payment)}</p>
										<p
											className={`inline-flex rounded-sm bg-opacity-10 py-1 px-3 text-sm font-medium mr-2 ${
												payment.status_payment === "Failed" ? "text-danger bg-danger" : "text-secondary bg-secondary"
											}`}
										>
											{payment.status_payment}
										</p>
										<p className="mr-2 text-form-strokedark">
											{/* {order.order_list.code_order}
											 */}
											code fetchOrderById
										</p>
									</div>
								</div>
								<div className="flex">
									<div className="item-content">
										{/* {order.order_list.cart.cart_detail
                      .slice(0, 1)
                      .map((detail) => ( */}
										<div
											className="flex flex-row"
											//  key={detail.id}
										>
											<div>
												<p className="font-bold">
													{/* {detail.product.name_product} */}
													nama product
												</p>
												<p className="text-sm text-form-strokedark mb-2">
													{/* {detail.quantity} */} Quantity x Rp
													{/* {detail.product.price_product.toLocaleString(
                                "id-ID"
                              )} */}
													price product
												</p>
												{/* {order.order_list.cart.cart_detail.length > 1 && ( */}
												<a
													className="text-sm text-form-strokedark cursor-pointer hover:font-semibold"
													// onClick={() => toggleModal(order.id)}
												>
													+{/* {order.order_list.cart.cart_detail.length - 1}{" "} */}
													produk lainnya
												</a>
												{/* )} */}
											</div>
											<div className="border-line ml-20 pl-5 justify-start">
												<p>Code Payment</p>
												<p className="font-bold">
													va number
													{/* {order.order_list.payment.va_number} */}
												</p>
											</div>
										</div>
										{/* ))} */}
									</div>
									<div className="border-line pl-5 justify-start items-center w-46">
										<p className="text-form-strokedark">Total Belanja</p>
										<p className="font-bold">
											Rp
											{/* {order.order_list.payment.total_payment.toLocaleString(
                        "id-ID"
                      )} */}
											total payment
										</p>
									</div>
								</div>
								<div className="flex justify-end items-center mt-7 gap-4">
									<button
										className="font-semibold"
										// onClick={() => toggleModal(order.id)}
									>
										Transaction Details
									</button>
									<button className="button-bayar">Cara Bayar</button>
									{/* {order.order_list.status_order === "Unpaid" && ( */}
									<button className="button-ulasan">Payment</button>
									{/* )} */}
								</div>
							</div>
						))
					) : (
						<p>Belum ada data</p>
					)}
					{/* ))} */}
				</div>
			</div>
		</div>
	);
};
export default page;
