"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function EditCategory({ userId, onCancel, onEditSuccess }) {
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullname: "",
    password: "",
    retypePassword: "",
    profileImage: null,
    gender: "",
    birth_date: "",
    phone_number: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/user/${userId}`,
          {
            withCredentials: true,
          }
        );
        const userData = response.data;

        setFormData({
          username: userData.username || "",
          email: userData.email || "",
          fullname: userData.fullname || "",
          password: userData.password || "",
          retypePassword: userData.password || "",
          profileImage: userData.upload_photo || null,
          gender: userData.gender || "",
          birth_date: userData.birth_date || "",
          phone_number: userData.phone_number || "",
        });

        // Set focus to the first input field when modal is shown
        const firstInput = document.getElementById("username");
        if (firstInput) {
          firstInput.focus();
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "profileImage" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("fullname", formData.fullname);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("retypePassword", formData.retypePassword);
      formDataToSend.append("profileImage", formData.profileImage);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("birth_date", formData.birth_date);
      formDataToSend.append("phone_number", formData.phone_number);

      await axios.put(
        `http://localhost:8000/api/user/${userId}`,
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("user updated successfully");
      onEditSuccess();
      router.refresh();
      setModal(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  function handleChangeModal() {
    setModal(!modal);
  }

  return (
    <div>
      <button
        className="text-white hover:bg-meta-8 bg-warning p-1 px-4 rounded-md me-2"
        onClick={handleChangeModal}
      >
        Edit
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChangeModal}
        className="modal-toggle"
      />

      <div className="modal ">
        <div className="modal-box bg-white ">
          <h3 className="font-bold text-lg text-black">Edit User Customer</h3>
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-4 bg-gray-600 shadow-md rounded-md"
          >
            <div className="mb-2">
              <label className="block mb-2">
                Username:
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </label>
              <label className="block mb-2">
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </label>
              <label className="block mb-2">
                Full Name:
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </label>
              <label className="block mb-2">
                Gender:
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </label>
              <label className="block mb-2">
                Date of Birth:
                <input
                  type="date"
                  name="birth_date"
                  value={formData.birth_date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </label>
              <label className="block mb-2">
                Phone Number:
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </label>
              <label className="block mb-2">
                Password:
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </label>
              <label className="block mb-2">
                Retype Password:
                <input
                  type="password"
                  name="retypePassword"
                  value={formData.retypePassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </label>
              <label className="block mb-2">
                Profile Image:
                <input
                  type="file"
                  name="profileImage"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </label>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-800"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleChangeModal}
                className="bg-danger text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-800"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
