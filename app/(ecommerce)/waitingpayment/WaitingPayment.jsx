// "use client";

// import Image from "next/image";
// import React, { useState, useEffect } from "react";
// import { formatDate } from "@/app/utils/formatDate";
// import SidebarUser from "@/components/Sidebar/SidebarUser";
// import ModalDetailTransaksi from "@/components/Order/ModalDetailTransaksi";

// function getImageUrl(filename) {
// 	return `http://localhost:8000/api/photo_products/view/${filename}`;
// }

// const WaitingPayment = ({ token }) => {
// 	const router = useRouter();
// 	const [orders, setOrders] = useState([]);
// 	const [isModalOpen, setIsModalOpen] = useState(false);
// 	const [currentModalId, setCurrentModalId] = useState(null);

// 	const toggleModal = (id) => {
// 		setCurrentModalId(id);
// 		setIsModalOpen(!isModalOpen);
// 	};

// 	useEffect(() => {
// 		if (!token) {
// 			router.push("/login");
// 		}

// 		const fetchData = async () => {
// 			try {
// 				const response = await fetch("http://localhost:8000/api/order/user/orderList", {
// 					method: "GET",
// 					headers: {
// 						"Content-Type": "application/json",
// 						accept: "application/json",
// 						cookie: `tokenCustomer=${token}`,
// 					},
// 					credentials: "include",
// 				});
// 				const result = await response.json();
// 				console.log("API Response:", result);

// 				if (result && result.data) {
// 					setOrders(result.data);
// 				} else {
// 					console.error("Invalid response format:", result);
// 				}
// 			} catch (error) {
// 				console.error("Error fetching data:", error);
// 			}
// 		};

// 		fetchData();
// 		const interval = setInterval(fetchData, 1000);
// 		return () => clearInterval(interval);
// 	}, [token]);

// 	const filteredOrders = orders.filter(
// 		(order) => order.status_order === "Unpaid" || order.status_order === "Pending"
// 	);

// 	return (
// 		<>
// 			<div className="flex items-start mt-10">
// 				<div className="w-1/5 border-none rounded-lg pb-8 box text-[#212121]">
// 					<SidebarUser />
// 				</div>
// 				<div className="w-4/5 mb-5 text-[#212121]">
// 					<div className="box-2">
// 						<div className="flex mb-4 items-center">
// 							<div className="mr-4">
// 								<p className="font-semibold">Waiting Payment</p>
// 							</div>
// 						</div>
// 						{filteredOrders?.map((order, key) => (
// 							<div className="box-3 mb-4" key={key}>
// 								<div className="flex justify-between mb-4 items-center">
// 									<div className="inline-flex items-center text-sm">
// 										<p className="mr-2">{formatDate(order.payment.date_payment)}</p>
// 										<p
// 											className={`inline-flex rounded-sm bg-opacity-10 py-1 px-3 text-sm font-medium mr-2 ${
// 												order.status_order === "Unpaid"
// 													? "text-danger bg-danger"
// 													: "text-secondary bg-secondary"
// 											}`}
// 										>
// 											{order.status_order}
// 										</p>
// 										<p className="mr-2 text-form-strokedark">{order.code_order}</p>
// 									</div>
// 								</div>
// 								<div className="flex">
// 									<div className="item-content">
// 										{order.cart.cart_detail.slice(0, 1).map((detail) => (
// 											<div className="flex flex-row" key={detail.id}>
// 												<Image
// 													src={getImageUrl(detail.product.photo.photo_product)}
// 													width={100}
// 													height={100}
// 													alt="product"
// 													className="rounded-lg mr-4"
// 												></Image>
// 												<div>
// 													<p className="font-bold">{detail.product.name_product}</p>
// 													<p className="text-sm text-form-strokedark mb-2">
// 														{detail.quantity} x Rp
// 														{detail.product.price_product.toLocaleString("id-ID")}
// 													</p>
// 													{order.cart.cart_detail.length > 1 && (
// 														<a
// 															className="text-sm text-form-strokedark cursor-pointer hover:font-semibold"
// 															onClick={() => toggleModal(order.id)}
// 														>
// 															+{order.cart.cart_detail.length - 1} produk lainnya
// 														</a>
// 													)}
// 												</div>
// 												<div className="border-line ml-20 pl-5 justify-start">
// 													<p>Code Payment</p>
// 													<p className="font-bold">{order.payment.va_number}</p>
// 												</div>
// 											</div>
// 										))}
// 									</div>
// 									<div className="border-line pl-5 justify-start items-center w-46">
// 										<p className="text-form-strokedark">Total Belanja</p>
// 										<p className="font-bold">Rp{order.payment.total_payment.toLocaleString("id-ID")}</p>
// 									</div>
// 								</div>
// 								<div className="flex justify-end items-center mt-7 gap-4">
// 									<button className="font-semibold" onClick={() => toggleModal(order.id)}>
// 										Transaction Details
// 									</button>
// 									<button className="button-bayar">Cara Bayar</button>
// 									{order.status_order === "Unpaid" && <button className="button-ulasan">Payment</button>}
// 								</div>
// 							</div>
// 						))}
// 						{isModalOpen && (
// 							<div className="fixed inset-0 flex items-center justify-center z-50">
// 								<div className="absolute inset-0 bg-black opacity-50 backdrop-blur-md z-10"></div>
// 								<div className="bg-white rounded-lg shadow-lg p-6 w-3/5 z-20 max-h-screen flex flex-col h-115">
// 									<div className="flex justify-between items-center">
// 										<h2 className="text-2xl font-bold">Transaction Details</h2>
// 										<button onClick={() => toggleModal(null)} className="text-lg">
// 											X
// 										</button>
// 									</div>
// 									<div className="overflow-y-auto mt-4">
// 										<ModalDetailTransaksi id={currentModalId} />
// 									</div>
// 								</div>
// 							</div>
// 						)}
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	);
// };

// export default WaitingPayment;
