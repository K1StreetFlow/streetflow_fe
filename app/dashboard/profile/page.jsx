"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// export const metadata = {
//   title: "Profile Page | Next.js E-commerce Dashboard",
//   description: "This is Profile page for TailAdmin Next.js",
//   // other metadata
// };

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    username: "",
    email: "",
    password: "",
    retypePassword: "",
    profileImage: null,
  });
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const fetchToken = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/admin/token", {
        withCredentials: true,
      });
      const decodedToken = response.data.decodedToken;

      setDecodedToken(decodedToken);

      // Menggunakan ID dari token untuk mendapatkan data pengguna
      const userResponse = await axios.get(`http://localhost:8000/api/admin/${decodedToken.adminId}`, {
        withCredentials: true,
      });
      const userData = userResponse.data;
      setUserData(userData);

      //openEditModal(); // Memanggil openEditModal setelah userData diatur
    } catch (error) {
      console.error("Error fetching or decoding token:", error);
    }
  };

  const updateToken = async () => {
    await fetchToken();
  };

  useEffect(() => {
    fetchToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openEditModal = () => {
    // Mengisi editFormData dengan data pengguna, termasuk password
    setEditFormData({
      username: userData?.username || "",
      email: userData?.email || "",
      password: userData?.password || "",
      retypePassword: userData?.password || "",
      profileImage: userData?.upload_photo || null,
    });

    // Membuka modal
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: name === "profileImage" ? files[0] : value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", editFormData.username);
      formDataToSend.append("email", editFormData.email);
      formDataToSend.append("password", editFormData.password);
      formDataToSend.append("retypePassword", editFormData.retypePassword);
      formDataToSend.append("profileImage", editFormData.profileImage);

      await axios.put(`http://localhost:8000/api/admin/${decodedToken.adminId}`, formDataToSend, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      updateToken(); // Fetch updated token after edit

      console.log("Profile updated successfully");
      closeEditModal();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/admin/${decodedToken.adminId}`, {
        withCredentials: true,
      });
      updateToken(); // Fetch updated token after delete
      console.log("Account deleted successfully");
      setDecodedToken(null);
      closeDeleteModal();
      window.location.href = "/auth/admin/login";
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <>
      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className=" inset-0 z-50 overflow-hidden flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
          <div className="z-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-md w-full max-w-md">
              <form onSubmit={handleEditSubmit} className="max-w-md mx-auto p-4 bg-gray-600 shadow-md rounded-md">
                <div className="mb-2">
                  <label className="block mb-2">
                    Username:
                    <input type="text" name="username" value={editFormData.username} onChange={handleEditChange} className="w-full px-3 py-2 border rounded-md" />
                  </label>
                  <label className="block mb-2">
                    Email:
                    <input type="email" name="email" value={editFormData.email} onChange={handleEditChange} className="w-full px-3 py-2 border rounded-md" />
                  </label>
                  <label className="block mb-2">
                    Password:
                    <input type="password" name="password" value={editFormData.password} onChange={handleEditChange} className="w-full px-3 py-2 border rounded-md" />
                  </label>
                  <label className="block mb-2">
                    Retype Password:
                    <input type="password" name="retypePassword" value={editFormData.retypePassword} onChange={handleEditChange} className="w-full px-3 py-2 border rounded-md" />
                  </label>
                  <label className="block mb-2">
                    Profile Image:
                    <input type="file" name="profileImage" onChange={handleEditChange} className="w-full px-3 py-2 border rounded-md" />
                  </label>
                </div>
                <div className="flex justify-end mt-4">
                  <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md mr-2 hover:bg-primary-dark focus:outline-none focus:shadow-outline-primary active:bg-primary-darker">
                    Save Changes
                  </button>
                  <button type="button" onClick={closeEditModal} className="bg-danger text-white px-4 py-2 rounded-md hover:bg-danger-dark focus:outline-none focus:shadow-outline-danger active:bg-danger-darker">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {isDeleteModalOpen && (
        <div className=" inset-0 z-50 overflow-hidden flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
          <div className="z-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-md w-full max-w-md">
              <div className="mb-2 text-center">
                <p className="text-xl font-semibold text-red-500">Are you sure you want to delete your account?</p>
              </div>
              <div className="flex justify-center mt-4">
                <button onClick={handleDeleteAccount} className="bg-danger text-white px-4 py-2 rounded-md hover:bg-danger-dark focus:outline-none focus:shadow-outline-danger active:bg-danger-darker mr-2">
                  Delete
                </button>
                <button onClick={closeDeleteModal} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:shadow-outline-gray active:bg-gray-800 ml-2">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Breadcrumb pageName="Profile" />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative mt-10 z-30 mx-auto h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            {userData && userData.upload_photo && <Image src={`http://localhost:8000/${userData.upload_photo.replace("\\", "/")}`} alt="User Profile" className="rounded-full" layout="fill" objectFit="cover" />}
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">{userData ? userData.username : "Loading..."}</h3>
            <p className="font-medium">{userData ? userData.email : "Loading..."}</p>
            <div className="flex justify-center gap-4 mt-4">
              <button onClick={openEditModal} className="mt-4 bg-primary text-white w-35 px-4 py-2 rounded-md hover:bg-primary-dark transition duration-300 ease-in-out">
                Edit Profile
              </button>
              <button onClick={openDeleteModal} className="mt-4 bg-danger text-white w-35 px-4 py-2 rounded-md hover:bg-danger-dark transition duration-300 ease-in-out">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
