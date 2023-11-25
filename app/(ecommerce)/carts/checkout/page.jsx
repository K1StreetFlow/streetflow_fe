import React from "react";
import { cookies } from "next/headers";
import Checkout from "./Checkout";

async function getAllCarts() {
	const cookieStore = cookies();
	const token = cookieStore.get("tokenCustomer");

	const res = await fetch("http://localhost:8000/api/carts/user/cart", {
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

const page = async () => {
	const data = await getAllCarts();

	return (
		<div className="flex justify-center my-6">
			<div className="flex flex-col w-full h-120 p-20 mt-20 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5">
				<Checkout data={data} />
			</div>
		</div>
	);
};

export default page;
