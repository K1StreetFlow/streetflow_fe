import React from "react";
import SignIn from "@/components/Auth/Admin/SignIn";

export const metadata = {
  title: "Login | Streetflow",
};

const page = () => {
  return (
    <>
      <SignIn />
    </>
  );
};

export default page;
