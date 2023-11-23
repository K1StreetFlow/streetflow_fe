import Image from "next/image";
import React from "react";

export default function Navbar() {
	return (
		<div className="navbar h-15 bg-white border-b fixed top-0 w-full z-50">
			<div className="navbar-start">
				<div className="dropdown">
					<label tabIndex={0} className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
						</svg>
					</label>
					<ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
						<li className="text-black font-bold">
							<a>Home</a>
						</li>
						<li>
							<a>About</a>
						</li>
						<li>
							<a>Store</a>
						</li>
					</ul>
				</div>
				<a className="cursor-pointer p-5">
					<Image
						src="/images/logo/streetflow-logo.svg"
						width={200}
						height={200}
						className="w-40 rounded "
						// alt={cart.product.name_product}
					/>
				</a>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1">
					<li>
						<a>Home</a>
					</li>
					<li>
						<a href="#">About</a>
					</li>
					<li>
						<a>Store</a>
					</li>
				</ul>
			</div>
			<div className="navbar-end me-5">
				<a className="inline-block text-sm font-semibold px-4 py-2 leading-none border rounded text-white border-black bg-neutral hover:bg-white hover:text-black cursor-pointer">
					Login
				</a>
			</div>
		</div>
	);
}
