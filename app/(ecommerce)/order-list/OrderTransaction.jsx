"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { formatDate } from "@/app/utils/formatDate";
import SidebarUser from "../../../components/Sidebar/SidebarUser";
import ModalDetailTransaksi from "../../../components/Order/ModalDetailTransaksi";
import Link from "next/link";

function getImageUrl(filename) {
	return `http://localhost:8000/api/photo_products/view/${filename}`;
}

const OrderTransaction = () => {
	const [orders, setOrders] = useState([]);
	const [selectedStatus, setSelectedStatus] = useState("All");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentModalId, setCurrentModalId] = useState(null);

	const toggleModal = (id) => {
		setCurrentModalId(id);
		setIsModalOpen(!isModalOpen);
	};

	useEffect(() => {
		const fetchOrderById = async (id) => {
			try {
				const res = await fetch(`http://localhost:8000/api/shippings/${id}`, {
					next: {
						revalidate: 0,
					},
				});

				if (!res.ok) {
					throw new Error(`Error fetching data. Status: ${res.status}`);
				}

				const data = await res.json();
				setOrders([data.data]);
				console.log(data);
			} catch (error) {
				console.error(error);
			}
		};

		// Ganti ID sesuai dengan kebutuhan
		const orderId = 1;
		fetchOrderById(orderId);
	}, []);

	const filteredOrders =
		selectedStatus === "All" ? orders : orders?.filter((order) => order.order_list.status_order === selectedStatus);

	return (
		<>
			<div className="flex items-start mt-10 text-[#212121]">
				<div className="w-1/5 border-none rounded-lg pb-8 box ">
					<SidebarUser />
				</div>
				<div className="w-4/5 mb-5 ">
					<h3 className="font-bold ml-6 mb-5 text-xl">Transaction List</h3>
					<div className="box-2">
						<div className="flex mb-4 items-center">
							<div className="mr-4">
								<p className="font-semibold">Status</p>
							</div>
							<div className="w-full items-center space-x-2">
								<button
									onClick={() => setSelectedStatus("All")}
									className={`button-status ${
										selectedStatus === "All" ? "font-bold border-black text-black-2" : "text-[#5e6c84]"
									}`}
								>
									All
								</button>
								<button
									onClick={() => setSelectedStatus("Paid")}
									className={`button-status ${
										selectedStatus === "Paid" ? "font-bold border-black text-black-2" : "text-[#5e6c84]"
									}`}
								>
									Paid
								</button>
								<button
									onClick={() => setSelectedStatus("Packaged")}
									className={`button-status ${
										selectedStatus === "Packaged" ? "font-bold border-black text-black-2" : "text-[#5e6c84]"
									}`}
								>
									Packaged
								</button>
								<button
									onClick={() => setSelectedStatus("Delivered")}
									className={`button-status ${
										selectedStatus === "Delivered" ? "font-bold border-black text-black-2" : "text-[#5e6c84]"
									}`}
								>
									Delivered
								</button>
								<button
									onClick={() => setSelectedStatus("Completed")}
									className={`button-status ${
										selectedStatus === "Completed" ? "font-bold border-black text-black-2" : "text-[#5e6c84]"
									}`}
								>
									Completed
								</button>
								<button
									onClick={() => setSelectedStatus("Canceled")}
									className={`button-status ${
										selectedStatus === "Canceled" ? "font-bold border-black text-black-2" : "text-[#5e6c84]"
									}`}
								>
									Canceled
								</button>
							</div>
						</div>
						{filteredOrders?.map((order, key) => {
							if (order.order_list.status_order === "Unpaid") {
								return (
									<div className="box-payment rounded-sm mb-4" key={key}>
										<Link href="/waitingpayment">
											<div className="flex justify-between items-center">
												<p className="font-normal">Waiting for payment</p>
												<p className="text-sm number-payment">{order.order_list.cart.cart_detail.length}</p>
											</div>
										</Link>
									</div>
								);
							} else if (
								order.order_list.status_order === "Paid" ||
								order.order_list.status_order === "Delivered" ||
								order.order_list.status_order === "Packaged" ||
								order.order_list.status_order === "Completed" ||
								order.order_list.status_order === "Canceled"
							) {
								return (
									<div className="box-3 mb-4" key={key}>
										<div className="flex justify-between mb-4 items-center">
											<div className="inline-flex items-center text-sm">
												<p className="mr-2">{formatDate(order.order_list.payment.createdAt)}</p>
												<p
													className={`inline-flex rounded-sm bg-opacity-10 py-1 px-3 text-sm font-medium mr-2 ${
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
												<p className="mr-2 text-form-strokedark">{order.order_list.code_order}</p>
											</div>
										</div>
										<div className="flex">
											<div className="item-content">
												{order.order_list.cart.cart_detail.slice(0, 1).map((detail) => (
													<div className="flex" key={detail.id}>
														<Image
															src={getImageUrl(detail.product.photo.photo_product)}
															width={100}
															height={100}
															alt="product"
															className="rounded-lg mr-4"
														></Image>
														<div>
															<p className="font-bold">{detail.product.name_product}</p>
															<p className="text-sm text-form-strokedark mb-2">
																{detail.quantity} x Rp
																{detail.product.price_product.toLocaleString("id-ID")}
															</p>
															{order.order_list.cart.cart_detail.length > 1 && (
																<a
																	className="text-sm text-form-strokedark cursor-pointer hover:font-semibold"
																	onClick={() => toggleModal(order.id)}
																>
																	+{order.order_list.cart.cart_detail.length - 1} produk lainnya
																</a>
															)}
														</div>
													</div>
												))}
											</div>
											<div className="border-line pl-5 justify-start items-center w-46">
												<p className="text-form-strokedark">Total Shopping</p>
												<p className="font-bold">Rp{order.order_list.payment.total_payment.toLocaleString("id-ID")}</p>
											</div>
										</div>
										<div className="flex justify-end items-center mt-7 gap-4">
											<button className="font-semibold" onClick={() => toggleModal(order.id)}>
												Transaction Details
											</button>
											{order.order_list.status_order === "Completed" && (
												<button className="button-ulasan">Review</button>
											)}
											{order.order_list.status_order === "Unpaid" && <button className="button-ulasan">Payment</button>}
										</div>
									</div>
								);
							}
						})}
						{isModalOpen && (
							<div className="fixed inset-0 flex items-center justify-center z-50">
								<div className="absolute inset-0 bg-black opacity-50 backdrop-blur-md z-10"></div>
								<div className="bg-white rounded-lg shadow-lg p-6 w-3/5 z-20 max-h-screen flex flex-col h-115">
									<div className="flex justify-between items-center">
										<h2 className="text-2xl font-bold">Transaction Details</h2>
										<button onClick={() => toggleModal(null)} className="text-lg">
											X
										</button>
									</div>
									<div className="overflow-y-auto mt-4">
										<ModalDetailTransaksi id={currentModalId} />
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default OrderTransaction;