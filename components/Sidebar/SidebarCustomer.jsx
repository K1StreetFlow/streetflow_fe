import React from "react";
import Image from "next/image";
import Gambar from "/assets/img/profile.jpg";
import "./style.css";
const SidebarCustomer = () => {
	return (
		<div>
			<div className="flex p-3 items-center">
				<Image src={Gambar} alt="profile" width={48} height={48} className="rounded-lg mr-2"></Image>
				<p className="justify-between font-semibold ">Nama</p>
			</div>
			<div className="flex flex-col px-3 py-4 box-1 w-full justify-between relative">
				<p className="font-bold items-center pb-2">Transaction</p>
				<div className="flex flex-col w-full">
					<a href="/waiting-payment" className="pl-4 py-1 cursor-pointer border-none rounded-sm font-normal hover:bg-meta-9">
						Waiting for payment
					</a>
					<a href="/order" className="pl-4 py-1 cursor-pointer border-none rounded-sm font-normal hover:bg-meta-9">
						Transaction List
					</a>
				</div>
			</div>
			<div className="flex flex-col px-3 py-4 box-1 w-full justify-between relative">
				<p className="font-bold items-center pb-2">Review</p>
				<div className="flex flex-col w-full">
					<a href="/review" className="pl-4 py-1 cursor-pointer border-none rounded-sm font-normal hover:bg-meta-9">
						Reviews List
					</a>
				</div>
			</div>
			<div className="flex flex-col px-3 py-4 box-1 w-full justify-between relative">
				<p className="font-bold items-center pb-2">My Settings</p>
				<div className="flex flex-col w-full">
					<a href="/profile" className="pl-4 py-1 cursor-pointer border-none rounded-sm font-normal hover:bg-meta-9">
						Profile
					</a>
				</div>
			</div>
		</div>
	);
};

export default SidebarCustomer;