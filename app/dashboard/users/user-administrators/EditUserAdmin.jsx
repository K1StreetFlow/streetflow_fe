"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function EditCategory({ adminId, onCancel, onEditSuccess }) {
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    retypePassword: "",
    profileImage: null,
    // Add other fields as needed
  });

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/admin/${adminId}`,
          {
            withCredentials: true,
          }
        );
        const adminData = response.data;

        // Ensure that each field has a default value to avoid controlled/uncontrolled warning
        setFormData({
          username: adminData.username || "",
          email: adminData.email || "",
          password: adminData.password || "", // You may want to set default values for password-related fields as needed
          retypePassword: adminData.password || "",
          profileImage: null,
          // Add other fields as needed
        });
      } catch (error) {
        console.error("Error fetching admin data", error);
      }
    };

    fetchAdminData();
  }, [adminId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "profileImage" ? files[0] : value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("retypePassword", formData.retypePassword);
      formDataToSend.append("profileImage", formData.profileImage);

      await axios.put(
        `http://localhost:8000/api/admin/${adminId}`,
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Admin updated successfully");
      onEditSuccess();
      router.refresh();
      setModal(false);
    } catch (error) {
      console.error("Error updating admin:", error);
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
          <h3 className="font-bold text-lg text-black">Edit User Admin</h3>
          <form
            onSubmit={handleEditSubmit}
            className="max-w-md mx-auto mt-8 p-4 bg-gray-600 shadow-md rounded-md"
          >
            <label className="block mb-2">
              Username:
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                autoFocus
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
          </form>
        </div>
      </div>
    </div>
  );
}
