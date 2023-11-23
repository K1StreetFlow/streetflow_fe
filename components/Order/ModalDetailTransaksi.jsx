import React from "react";
import Image from "next/image";
import Gambar from "/assets/img/profile.jpg";

const ModalDetailTransaksi = () => {
	return (
		<div>
			<div className="p-5 mt-5 border-b-2 border-gray-200">
				<h3 className="font-semibold mb-3 text-lg">Status</h3>
				<div className="flex justify-between mb-2">
					<p>Order ID</p>
					<p className="font-semibold">#Order-1</p>
				</div>
				<div className="flex justify-between">
					<p>Order Payment</p>
					<p className="font-semibold">12</p>
				</div>
			</div>
			<div className="p-5 border-b-2 border-gray-200">
				<h3 className="font-semibold mb-3 text-lg">Product Details</h3>
				<div className="flex border-2 border-gray-200 rounded-md p-4 justify-between">
					<div className="flex mb-2 w-200 pr-5">
						<Image src={Gambar} width={100} height={100} className="rounded-md mr-4" alt={"ada"}></Image>
						<div>
							<p className="font-semibold">abc</p>
							<p className="text-sm">1 x Rp 100</p>
						</div>
					</div>
					<div className="text-right">
						<p>Total price</p>
						<p className="font-semibold">Rp100</p>
					</div>
				</div>
			</div>
			<div className="p-5 border-b-2 border-gray-200">
				<h3 className="font-semibold mb-3 text-lg">Shipping Info</h3>
				<div className="flex mb-2">
					<p className="w-40">Courier</p>
					<span className="mr-3">:</span>
					<p className="font-semibold">jne</p>
				</div>
				<div className="flex mb-2">
					<p className="w-40">No Receipt</p>
					<span className="mr-3">:</span>
					<p className="font-semibold">123</p>
				</div>
				<div className="flex">
					<p className="w-40">Address</p>
					<span className="mr-3">:</span>
					<div>
						<p className="font-semibold">rr</p>
						<p>ww</p>
						<p>qewwq</p>
					</div>
				</div>
			</div>
			<div className="p-5 border-b-2 border-gray-200">
				<h3 className="font-semibold mb-3 text-lg">Payment details</h3>
				<div className="flex justify-between mb-2 border-b border-gray-200">
					<p className="mb-2">Payment method</p>
					<p>qe</p>
				</div>
				<div className="flex justify-between mt-4 mb-2">
					<p>Total price</p>
					<p>Rp 122</p>
				</div>
				<div className="flex justify-between">
					<p>Total Item Discount</p>
					<p>Rp 0</p>
				</div>
				<div className="flex justify-between mt-4 border-t border-gray-200">
					<p className="mt-2">Total Shopping</p>
					<p className="font-semibold mt-2">Rp233</p>
				</div>
			</div>
		</div>
	);
};

export default ModalDetailTransaksi;
