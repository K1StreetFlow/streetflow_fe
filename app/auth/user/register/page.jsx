"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

// export const metadata = {
//   title: "Signup Page | Next.js E-commerce Dashboard Template",
//   description: "This is Signup page for TailAdmin Next.js",
//   // other metadata
// };

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    retypePassword: "",
    fullname: "",
    gender: "",
    birth_date: "",
    phone_number: "",
    profileImage: null,
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      profileImage: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("username", formData.username);
      formDataToSubmit.append("email", formData.email);
      formDataToSubmit.append("password", formData.password);
      formDataToSubmit.append("retypePassword", formData.retypePassword);
      formDataToSubmit.append("fullname", formData.fullname);
      formDataToSubmit.append("gender", formData.gender);
      formDataToSubmit.append("birth_date", formData.birth_date);
      formDataToSubmit.append("phone_number", formData.phone_number);
      formDataToSubmit.append("profileImage", formData.profileImage);

      const response = await axios.post(
        "http://localhost:8000/api/user/auth/register",
        formDataToSubmit,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const result = await axios.post("http://localhost:8000/api/carts", {
        id_users_customer: response.data.id,
      });

      router.push("/auth/user/login");
      // Optionally, you can redirect the user or perform other actions upon successful registration
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data.message);
        setError(error.response.data.message); // Set pesan kesalahan dari server
      }
    }
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="w-full p-4 sm:p-12.5">
          <span className="mb-1.5 block font-medium">Start for free</span>
          <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
            Sign Up to StreetFlow
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <div>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="mb-2.5 block font-medium text-black dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  onChange={handleChange}
                  value={formData.username}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="mb-2.5 block font-medium text-black dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  value={formData.email}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="fullname"
                  className="mb-2.5 block font-medium text-black dark:text-white"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  placeholder="Enter your full name"
                  onChange={handleChange}
                  value={formData.fullname}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="mb-2.5 block font-medium text-black dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  value={formData.password}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="retypePassword"
                  className="mb-2.5 block font-medium text-black dark:text-white"
                >
                  Re-type Password
                </label>
                <input
                  type="password"
                  id="retypePassword"
                  name="retypePassword"
                  placeholder="Re-enter your password"
                  onChange={handleChange}
                  value={formData.retypePassword}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>

            <div>
              <div className="mb-4">
                <label
                  htmlFor="gender"
                  className="mb-2.5 block font-medium text-black dark:text-white"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  onChange={handleChange}
                  value={formData.gender}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="birth_date"
                  className="mb-2.5 block font-medium text-black dark:text-white"
                >
                  Birth Date
                </label>
                <input
                  type="date"
                  id="birth_date"
                  name="birth_date"
                  onChange={handleChange}
                  value={formData.birth_date}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phone_number"
                  className="mb-2.5 block font-medium text-black dark:text-white"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  placeholder="Enter your phone number"
                  onChange={handleChange}
                  value={formData.phone_number}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="profileImage"
                  className="mb-2.5 block font-medium text-black dark:text-white"
                >
                  Profile Image
                </label>
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-3 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              {error && <p className="text-danger mt-2">{error}</p>}
              <div className="mb-5 col-span-2">
                <input
                  type="submit"
                  value="Create account"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                />
              </div>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p>
              Already have an account?{" "}
              <Link href="/auth/user/login" className="text-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
