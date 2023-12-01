"use client";
import "@/app/globals.css";
import "@/app/satoshi.css";
import { useState, useEffect } from "react";
import Loader from "@/components/common/Loader";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const tokenCustomer = Cookies.get("tokenCustomer");
    const role = Cookies.get("role");

    if (role === "admin" && pathname === "/auth/admin/login") {
      router.push("/dashboard");
    }

    if (tokenCustomer && pathname === "/auth/user/login") {
      router.push("/product");
    }
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="">
          {loading ? (
            <Loader />
          ) : (
            <div className="flex h-screen overflow-hidden">
              {/* <!-- ===== Content Area Start ===== --> */}
              <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                {/* <!-- ===== Main Content Start ===== --> */}
                <main>
                  <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                    {children}
                  </div>
                </main>
                {/* <!-- ===== Main Content End ===== --> */}
              </div>
              {/* <!-- ===== Content Area End ===== --> */}
            </div>
          )}
        </div>
      </body>
    </html>
  );
}
