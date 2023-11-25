/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function tableCartCustomer({ carts, token }) {
	const [cartDetail, setCartDetail] = useState();
	const [cart, setCart] = useState(carts);
	const router = useRouter();

	// console.log(cart.cart_detail[0].product.photo.photo_product);

	useEffect(() => {
		if (!token) {
			router.push("/login");
			return;
		}

		// Fungsi untuk mengambil data dari backend
		const fetchData = async () => {
			try {
				const response = await fetch("http://localhost:8000/api/carts/user/cart/", {
					next: {
						revalidate: 0,
					},
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						accept: "application/json",
						cookie: `tokenCustomer=${token}`,
					},
					credentials: "include",
				});
				const result = await response.json();
				setCartDetail(result.cart_detail);
				setCart(result);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
		const interval = setInterval(fetchData, 1000);
		return () => clearInterval(interval);
	}, []);

	const updateQuantity = async (cartItemId, newQuantity) => {
		try {
			const quantityUpdated = await axios.put(`http://localhost:8000/api/cart-details/${cartItemId}`, {
				quantity: newQuantity,
			});
		} catch (error) {
			console.error("Failed to update quantity:", error);
		}
	};

	const handleDeleteCart = async (cartItemId) => {
		try {
			await axios.delete(`http://localhost:8000/api/cart-details/${cartItemId}`);
		} catch (error) {
			console.error("Failed to delete cart:", error);
		}
	};

	return (
		<>
			<table className="table w-full text-sm lg:text-base" cellSpacing={0}>
				<thead>
					<tr className="h-12 uppercase">
						<th className="hidden md:table-cell" />
						<th className="text-left">Product</th>
						<th className="lg:text-right text-left pl-5 lg:pl-0">
							<span className="lg:hidden" title="Quantity">
								Qtd
							</span>
							<span className="hidden lg:inline">Quantity</span>
						</th>
						<th className="text-right">Price Product</th>
						<th className="text-right">Total</th>
					</tr>
				</thead>
				<tbody>
					{cart.cart_detail?.map((cart, key) => (
						<tr className="hover" key={key}>
							<td className="hidden pb-4 md:table-cell w-30">
								<Link href={`/product/detail/${cart.product.id}`}>
									{/* <img
                    src={`http://localhost:8000/api/photo_products/view/${cart.product.photo.photo_product}`}
                    alt={cart.product.name_product}
                    className="w-full h-auto rounded-md shadow-md transition-transform transform hover:scale-105"
                  /> */}
								</Link>
							</td>
							<td className="w-100">
								<Link href={`/product/detail/${cart.product.id}`}>
									<p className="mb-2 font-bold md:ml-4 ">{cart.product.name_product}</p>

									<button className="text-gray-700 md:ml-4" onClick={() => handleDeleteCart(cart.id)}>
										<small>(Remove item)</small>
									</button>
								</Link>
							</td>
							<td className="justify-center md:justify-end md:flex mt-6">
								<div className="w-20 h-10">
									<div className="relative flex flex-row w-full h-8">
										<div className="join">
											<button
												onClick={() => updateQuantity(cart.id, cart.quantity - 1)}
												disabled={cart.quantity <= 1}
												className="btn btn-sm rounded-full  join-item"
											>
												-
											</button>
											<span className="mx-5">{cart.quantity}</span>
											<button
												onClick={() => updateQuantity(cart.id, cart.quantity + 1)}
												disabled={cart.quantity >= cart.product.stock_product}
												className="btn btn-sm rounded-full  join-item"
											>
												+
											</button>
										</div>
									</div>
								</div>
							</td>
							<td className="text-right">
								<span className="text-sm lg:text-base font-medium">
									Rp {cart.product.price_product.toLocaleString("id-ID")}
								</span>
							</td>
							<td className="text-right">
								<span className="text-sm lg:text-base font-bold">Rp {cart.total_price.toLocaleString("id-ID")}</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<hr className="pb-6 mt-6" />
			<div className="flex justify-end">
				<div className="flex flex-col me-10">
					<div className="font-bold">Total Price</div>
					<div className="font-bold text-xl text-[#3C50E0] ">Rp {cart.grand_price.toLocaleString("id-ID")}</div>
				</div>

				<Link href={"carts/checkout"}>
					<button className="btn bg-[#3C50E0] hover:bg-[#2b399f]  text-white">
						<Image src={"/images/icon/shop-cart-bold-white.svg"} width={20} height={20} alt={"Checkout"} />
						Checkout
					</button>
				</Link>
			</div>
		</>
	);
}
