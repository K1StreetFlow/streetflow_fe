"use client";
// app/dashboard/page.jsx
import { useEffect } from "react";
import ECommerce from "@/components/Dashboard/E-commerce";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const metadata = {
  title: "Dashboard | Streetflow",
};

const Home = () => {
  // Gunakan useRouter untuk melakukan navigasi
  const router = useRouter();

  useEffect(() => {
    // Dapatkan token role dari cookie
    const tokenRole = Cookies.get("role");

    // Jika tidak ada token, redirect ke halaman login
    if (!tokenRole) {
      // Redirect ke halaman login
      router.push("/auth/admin/login");
    }
  }, [router]); // Menggunakan array dependencies kosong agar useEffect hanya dijalankan sekali setelah komponen pertama kali di-mount

  // Render the component content
  return (
    <>
      <ECommerce />
    </>
  );
};

export default Home;
