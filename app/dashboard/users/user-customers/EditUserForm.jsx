// EditUserForm.jsx
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const EditUserForm = ({ userId, onCancel, onEditSuccess }) => {
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

  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/user/${userId}`, {
          withCredentials: true,
        });
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

  const handleEditSubmit = async (e) => {
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

      await axios.put(`http://localhost:8000/api/user/${userId}`, formDataToSend, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("user updated successfully");
      onEditSuccess();
      setShowModal(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="inset-0 z-50 overflow-hidden flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" style={{ zIndex: 50, pointerEvents: "none" }}></div>
      <div className="z-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded-md w-full max-w-3xl" style={{ pointerEvents: "auto" }}>
          <div className={`modal ${showModal ? "block" : "hidden"}`}>
            <div className="modal-overlay" onClick={() => setShowModal(false)}></div>
            <div className="modal-container">
              <div className="modal-body">
                <form onSubmit={handleEditSubmit} className="max-w-md mx-auto p-4 bg-gray-600 shadow-md rounded-md">
                  <div className="mb-2">
                    <label className="block mb-2">
                      Username:
                      <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                    </label>
                    <label className="block mb-2">
                      Email:
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                    </label>
                    <label className="block mb-2">
                      Full Name:
                      <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                    </label>
                    <label className="block mb-2">
                      Gender:
                      <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-3 py-2 border rounded-md">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </label>
                    <label className="block mb-2">
                      Date of Birth:
                      <input type="date" name="birth_date" value={formData.birth_date} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                    </label>
                    <label className="block mb-2">
                      Phone Number:
                      <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                    </label>
                    <label className="block mb-2">
                      Password:
                      <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                    </label>
                    <label className="block mb-2">
                      Retype Password:
                      <input type="password" name="retypePassword" value={formData.retypePassword} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                    </label>
                    <label className="block mb-2">
                      Profile Image:
                      <input type="file" name="profileImage" onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                    </label>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-800">
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        onCancel();
                      }}
                      className="bg-danger text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-800"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserForm;
