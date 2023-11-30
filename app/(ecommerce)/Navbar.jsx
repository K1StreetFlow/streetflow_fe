import Image from "next/image";
import React, { use } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import DropdownUser from "./DropdownUser";

export default function Navbar() {
	const [cart, setCart] = useState({});
	const [showCartIcon, setShowCartIcon] = useState(true);
	const pathname = usePathname();
	const [userData, setUserData] = useState(null);
	const [totalProduct, setTotalProduct] = useState(0);

	useEffect(() => {
		// Periksa apakah pengguna sedang berada di halaman checkout
		if (pathname === "/carts") {
			setShowCartIcon(false);
		} else if (pathname === "/carts/checkout") {
			setShowCartIcon(false);
		} else if (pathname.includes("/waiting-payment")) {
			setShowCartIcon(false);
		} else {
			setShowCartIcon(true);
		}
	}, [pathname]);

	useEffect(() => {
		// Fungsi untuk mengambil data dari backend
		const fetchData = async () => {
			try {
				const response = await axios.get("http://localhost:8000/api/carts/user/cart/", {
					withCredentials: true,
				});
				const result = response.data;
				setTotalProduct(result.cart_detail.length);
				setCart(result);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
		const interval = setInterval(fetchData, 1000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		// Fungsi untuk mengambil data dari backend
		const fetchData = async () => {
			try {
				const response = await axios.get("http://localhost:8000/api/user/profile/user", {
					withCredentials: true,
				});
				const result = response.data;
				setUserData(result);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
		const interval = setInterval(fetchData, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="navbar bg-white line-bottom fixed z-9999">
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
					<ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 font-bold ">
						<li className="text-black font-bold ">
							<Link href="/product">Home</Link>
						</li>
						<li>
							<Link href="/about">About</Link>
						</li>
						<li>
							<Link href="/product/listproduct">Store</Link>
						</li>
					</ul>
				</div>
				<a className="cursor-pointer p-5">
					<Image
						src="/images/logo/streetflow-logo.svg"
						width={200}
						height={200}
						className="w-40 rounded "
						alt="Logo Streetflow"
					/>
				</a>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-2 font-bold tracking-widest text-black ">
					<li>
						<Link href="/product">Home</Link>
					</li>
					<li>
						<Link href="/about">About</Link>
					</li>
					<li>
						<Link href="/product/listproduct">Store</Link>
					</li>
				</ul>
			</div>
			<div className="navbar-end me-5">
				<div className="flex flex-row me-5">
					{showCartIcon && (
						<>
							<Link href="/carts">
								<Image src="/images/icon/shop-cart-bold.svg" width={30} height={30} />
							</Link>
							{totalProduct > 0 && (
								<span className="badge bg-[#3C50E0] py-2 text-white font-bold ">{totalProduct}</span>
							)}
						</>
					)}
				</div>
				{userData ? (
					<DropdownUser user={userData} />
				) : (
					// <a className="btn">Logout</a>

					<Link href="/auth/user/login">
						<button className="btn btn-primary">Login</button>
					</Link>
				)}
			</div>
		</div>
	);
}
