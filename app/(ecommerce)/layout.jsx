"use client";
import "@/app/globals.css";
import "@/app/satoshi.css";
import { useState, useEffect } from "react";
import Loader from "@/components/common/Loader";
import Navbar from "@/app/(ecommerce)/Navbar";
import Footer from "@/app/(ecommerce)/Footer";

export default function RootLayout({ children }) {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => setLoading(false), 1000);
	}, []);

	return (
		<div className="bg-white">
			{loading ? (
				<Loader />
			) : (
				<div className="flex flex-col min-h-screen">
					<Navbar />
					<main className="flex-shrink-0 mt-8">
						<div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">{children}</div>
					</main>
					<Footer className="flex-shrink-0" />
				</div>
			)}
		</div>
	);
}
