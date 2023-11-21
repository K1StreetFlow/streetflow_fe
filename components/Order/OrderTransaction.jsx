"use client";

import Image from "next/image";
import Gambar from "/assets/img/profile.jpg";
import "./style.css";
import React, { useState, useEffect } from "react";
import { formatDate } from "@/app/utils/formatDate";

async function getAllOrders() {
	const res = await fetch(`http://localhost:8000/api/shipping`, {
		next: {
			revalidate: 0,
		},
	});
	return res.json();
}

function getImageUrl(filename) {
	return `http://localhost:8000/api/photo_products/view/${filename}`;
}

const OrderTransaction = () => {
	const [orders, setOrders] = useState([]);
	const [selectedStatus, setSelectedStatus] = useState("All");

	useEffect(() => {
		const fetchOrders = async () => {
			const allOrders = await getAllOrders();
			setOrders(allOrders);
		};

		fetchOrders();
	}, []);

	const filteredOrders =
		selectedStatus === "All"
			? orders.data
			: orders.data?.filter((order) => order.order_list.status_order === selectedStatus);

	return (
		<>
			<div className="flex items-start mt-10">
				<div className="w-1/5 border-none rounded-lg pb-8 box text-[#212121]">
					<div className="flex p-3 items-center">
						<Image src={Gambar} alt="profile" width={48} height={48} className="rounded-lg mr-2"></Image>
						<p className="justify-between font-semibold ">Nama</p>
					</div>
					<div className="flex flex-col px-3 py-4 box-1 w-full justify-between relative">
						<p className="font-bold items-center pb-2">Purchase</p>
						<div className="flex flex-col w-full">
							<a href="" className="pl-4 py-1 cursor-pointer border-none rounded-sm font-normal hover:bg-meta-9">
								Waiting for payment
							</a>
							<a href="" className="pl-4 py-1 cursor-pointer border-none rounded-sm font-normal hover:bg-meta-9">
								Transaction List
							</a>
						</div>
					</div>
				</div>
				<div className="w-4/5 mb-5 text-[#212121]">
					<h3 className="font-bold ml-6 mb-5 text-xl">Transaction List</h3>
					<div className="box-2">
						<div className="flex mb-4 items-center">
							<div className="mr-4">
								<p className="font-semibold">Status</p>
							</div>
							<div className="w-full items-center space-x-2">
								<button onClick={() => setSelectedStatus("All")} className="button-status">
									All
								</button>
								<button onClick={() => setSelectedStatus("Pending")} className="button-status">
									Pending
								</button>
								<button onClick={() => setSelectedStatus("Delivered")} className="button-status">
									Delivered
								</button>
								<button onClick={() => setSelectedStatus("Completed")} className="button-status">
									Completed
								</button>
								<button onClick={() => setSelectedStatus("Canceled")} className="button-status">
									Canceled
								</button>
							</div>
						</div>
						{filteredOrders?.map((order, key) => (
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
										<div className="flex">
											<Image src={Gambar} width={100} height={100} alt="product" className="rounded-lg mr-4"></Image>
											<div>
												<p className="font-bold">{order.order_list.cart_details.product.name_product}</p>
												<p className="text-sm text-form-strokedark">
													{order.order_list.cart_details.quantity} x Rp
													{order.order_list.cart_details.product.price_product.toLocaleString("id-ID")}
												</p>
											</div>
										</div>
									</div>
									<div className="border-line pl-5 justify-start items-center w-46">
										<p className="text-form-strokedark">Total Belanja</p>
										<p className="font-bold">Rp{order.order_list.payment.total_payment.toLocaleString("id-ID")}</p>
									</div>
								</div>
								<div className="flex justify-end items-center mt-7 gap-4">
									<button className="font-semibold">Detail Transaksi</button>
									<button className="button-ulasan">Beri Ulasan</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default OrderTransaction;
