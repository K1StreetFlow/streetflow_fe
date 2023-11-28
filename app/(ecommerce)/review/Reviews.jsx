"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { formatDate } from "@/app/utils/formatDate";
import SidebarCustomer from "../../../components/Sidebar/SidebarCustomer";
import ModalDetailTransaksi from "../../../components/Order/ModalDetailTransaksi";
import Modal from "react-modal";

function getImageUrl(filename) {
	return `http://localhost:8000/api/photo_products/view/${filename}`;
}

const ReviewPages = ({ orderdata, token }) => {
	const router = useRouter();
	const [orders, setOrders] = useState([]);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [reviewMessage, setReviewMessage] = useState("");
	const [reviewNumber, setReviewNumber] = useState(0);
	const [productId, setProductId] = useState(null);
	const [orderListId, setOrderListId] = useState(null);
	const [orderStatus, setOrderStatus] = useState(null);
	const [customerId, setCustomerId] = useState(null);

	const openModal = (order, detail) => {
		setProductId(detail.product.id);
		setOrderListId(order.id);
		setOrderStatus(order.status_order); // Save the order status
		setCustomerId(order.id_users_customer); // Save the customer id
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};

	const submitReview = async (event) => {
		event.preventDefault();

		const review = {
			id_users_customer: customerId,
			id_products: productId,
			id_order_list: orderListId,
			status_order: orderStatus,
			message_review: reviewMessage,
			number_review: reviewNumber,
		};

		try {
			const response = await fetch("http://localhost:8000/api/review-products/user", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					accept: "application/json",
					cookie: `tokenCustomer=${token}`,
				},
				credentials: "include",
				body: JSON.stringify(review),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			// Do something with the response data
			console.log(data);

			closeModal();
		} catch (error) {
			console.error("Failed to submit review:", error);
		}
	};

	useEffect(() => {
		if (!token) {
			router.push("/login");
		}

		const fetchData = async () => {
			try {
				const response = await fetch("http://localhost:8000/api/order/user/orderList", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						accept: "application/json",
						cookie: `tokenCustomer=${token}`,
					},
					credentials: "include",
				});
				const result = await response.json();
				console.log("API Response:", result);

				if (result && result.data) {
					setOrders(result.data);
				} else {
					console.error("Invalid response format:", result);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
		const interval = setInterval(fetchData, 1000);
		return () => clearInterval(interval);
	}, [token]);

	const completedOrders = orders.filter((order) => order.status_order === "Completed");

	return (
		<>
			<div className="flex items-start mt-10 text-[#212121]">
				<div className="w-1/5 border-none rounded-lg pb-8 box ">
					<SidebarCustomer />
				</div>
				<div className="w-4/5 mb-5 ">
					<h3 className="font-bold ml-6 mb-5 text-xl">Review List</h3>
					<div className="box-2">
						{completedOrders.map((order, key) => (
							<div className="box-3 mb-4" key={key}>
								<div className="flex justify-between mb-4 items-center">
									<div className="inline-flex items-center text-sm">
										<p className="mr-2">{formatDate(order.payment.createdAt)}</p>
										<p className="inline-flex rounded-sm bg-opacity-10 py-1 px-3 text-sm font-medium mr-2 text-success bg-success">
											{order.status_order}
										</p>
										<p className="mr-2 text-form-strokedark">{order.code_order}</p>
									</div>
								</div>
								<div className="flex">
									<div className="item-content">
										{order.cart.cart_detail.map((detail) => (
											<div className="flex justify-between mb-2" key={detail.id}>
												<div className="flex items-center">
													<Image
														src={getImageUrl(detail.product.photo.photo_product)}
														width={100}
														height={100}
														alt="product"
														className="rounded-lg mr-4"
													></Image>
													<p className="font-bold">{detail.product.name_product}</p>
												</div>
												<div className="border-line pl-5 flex items-center justify-center w-46">
													<button className="button-ulasan" onClick={() => openModal(order, detail)}>
														Review
													</button>
												</div>
											</div>
										))}

										<Modal
											isOpen={modalIsOpen}
											onRequestClose={closeModal}
											contentLabel="Review Modal"
											className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800 bg-opacity-50"
										>
											<div className="bg-white rounded-lg max-w-md mx-auto md:mt-24">
												<div className="flex flex-col items-start p-4">
													<div className="flex items-center w-full">
														<h3 className="text-gray-900 font-medium text-lg">
															Review for {selectedProduct?.name_product}
														</h3>
														<button
															onClick={closeModal}
															className="ml-auto bg-transparent hover:bg-gray-200 rounded-full p-1"
														>
															<svg
																className="w-6 h-6 text-gray-400 hover:text-gray-800"
																fill="none"
																stroke="currentColor"
																viewBox="0 0 24 24"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={2}
																	d="M6 18L18 6M6 6l12 12"
																/>
															</svg>
														</button>
													</div>
													<form onSubmit={submitReview} className="w-full">
														<label className="mt-3 text-gray-700">
															Review:
															<input
																type="text"
																name="review"
																value={reviewMessage}
																onChange={(e) => setReviewMessage(e.target.value)}
																required
																className="mt-1 p-2 w-full border rounded-md"
															/>
														</label>
														<label className="mt-3 text-gray-700">
															Number:
															<input
																type="number"
																name="number"
																value={reviewNumber}
																onChange={(e) => setReviewNumber(e.target.value)}
																required
																className="mt-1 p-2 w-full border rounded-md"
															/>
														</label>
														<button
															type="submit"
															className="mt-3 w-full py-2 px-4 bg-meta-5 text-black text-sm font-medium rounded-md"
														>
															Submit
														</button>
													</form>
												</div>
											</div>
										</Modal>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default ReviewPages;
