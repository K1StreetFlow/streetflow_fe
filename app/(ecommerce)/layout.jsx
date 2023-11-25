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
    <div className="bg-white bottom-0">
      {loading ? (
        <Loader />
      ) : (
        <div className="mt-auto">
          {/* <!-- ===== Content Area Start ===== --> */}
          <div className="mt-auto flex flex-1 flex-col overflow-y-auto overflow-x-hidden ">
            <Navbar />
            {/* <!-- ===== Main Content Start ===== --> */}
            <main >
              <div className="mx-auto mt-19 max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                {children}
              </div>
            </main>
            
            <div className="relative bottom-0 w-full">
              <Footer />
            </div>
            {/* <!-- ===== Main Content End ===== --> */}
          </div>
         
          {/* <!-- ===== Content Area End ===== --> */}
        </div>
      )}
    </div>
  );
}
