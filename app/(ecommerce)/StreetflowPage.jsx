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
    <div className="bg-whiten bottom-0">
      {loading ? (
        <Loader />
      ) : (
        <div className="mt-auto">
          {/* <!-- ===== Content Area Start ===== --> */}
          <div className="mt-0 flex flex-1 flex-col overflow-y-auto overflow-x-hidden ">
            <Navbar />
            {/* <!-- ===== Main Content Start ===== --> */}
            <main className="container-lg" width="1000px">
                <div className="hero min-h-screen" style={{backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)'}}>
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                            <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                            <button className="btn btn-primary">Get Started</button>
                        </div>
                    </div>
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
