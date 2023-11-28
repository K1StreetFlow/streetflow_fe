"use client";
import "@/app/globals.css";
import "@/app/satoshi.css";
import { useState, useEffect } from "react";
import Loader from "@/components/common/Loader";
import { useRouter } from "next/navigation";
import cookieCutter from "cookie-cutter";

export default function RootLayout({ children }) {
  const [token, setToken] = useState(null);
  const router = useRouter();

  // if (!token) {
  //   router.push("/auth/user/login");
  // }
  // console.log(token);

  // useEffect(() => {
  //   const token = cookieCutter.get("tokenCustomer");
  //   if (token) {
  //     setToken(token);
  //   } else {
  //     router.push("/auth/user/login");
  //   }
  // }, []);

  // useEffect(() => {
  //   if (!token) {
  //     router.push("/auth/user/login");
  //   }
  // }, [token]);

  return <div>{children}</div>;
}
