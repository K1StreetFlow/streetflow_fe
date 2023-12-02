"use client";
import "@/app/globals.css";
import "@/app/satoshi.css";
import { useState, useEffect } from "react";
import Loader from "@/components/common/Loader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cookies from "js-cookie";

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const [tokenCustomer, setTokenCustomer] = useState(null);

  useEffect(() => {
    const tokenCustomer = Cookies.get("tokenCustomer");

    if (!tokenCustomer) {
      console.log("Token tidak ada");
    } else {
      setTokenCustomer(tokenCustomer);
    }
  }, []);

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
            <Navbar tokenCustomer={tokenCustomer} />
            {/* <!-- ===== Main Content Start ===== --> */}
            <main>
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
