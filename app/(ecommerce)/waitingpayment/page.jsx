// import React from "react";
// import "../../satoshi.css";
// import "../../globals.css";
// import WaitingPayment from "./WaitingPayment";
// import { cookies } from "next/headers";

// async function getUserOrder() {
// 	const cookieStore = cookies();
// 	const token = cookieStore.get("tokenCustomer");

// 	const res = await fetch("http://localhost:8000/api/order/user/orderList", {
// 		method: "GET",
// 		headers: {
// 			"Content-Type": "application/json",
// 			accept: "application/json",
// 			cookie: `tokenCustomer=${token.value}`,
// 		},

// 		credentials: "include",
// 	});

// 	return res.json();
// }

// const Payment = async () => {
// 	const orderdata = await getUserOrder();
// 	const cookieStore = cookies();
// 	const token = cookieStore.get("tokenCustomer");
// 	return (
// 		<>
// 			<div className="container mx-auto px-4">
// 				<WaitingPayment orderdata={orderdata} token={token.value} />
// 			</div>
// 		</>
// 	);
// };

// export default Payment;
