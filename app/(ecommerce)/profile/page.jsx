"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

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
  const [activeTab, setActiveTab] = useState("personal");

  const fetchToken = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/user/token", {
        withCredentials: true,
      });
      const decodedToken = response.data.decodedToken;

      setDecodedToken(decodedToken);

      // Menggunakan ID dari token untuk mendapatkan data pengguna
      const userResponse = await axios.get(`http://localhost:8000/api/user/${decodedToken.userId}`, {
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
      window.location.href = "/auth/user/login";
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center mt-4">
        <button onClick={() => setActiveTab("personal")} className={`px-4 py-2 mx-2 rounded-md ${activeTab === "personal" ? "bg-primary text-white" : "bg-gray-300 text-gray-700"}`}>
          Personal Profile
        </button>
        <button onClick={() => setActiveTab("address")} className={`px-4 py-2 mx-2 rounded-md ${activeTab === "address" ? "bg-primary text-white" : "bg-gray-300 text-gray-700"}`}>
          Address
        </button>
      </div>

      {activeTab === "personal" && (
        <>
          {/* <Breadcrumb pageName="Address" /> */}
          <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 mt-4">
            <div className="flex flex-col items-center">
              {userData && userData.upload_photo && (
                <div className="relative mt-4 w-36 h-36 rounded-full overflow-hidden">
                  <Image src={`http://localhost:8000/${userData.upload_photo.replace("\\", "/")}`} alt="User Profile" className="rounded-full" width={144} height={144} priority={true} />
                </div>
              )}
              <h3 className="mt-4 text-2xl font-semibold text-black dark:text-white">{userData ? userData.username : "Loading..."}</h3>
              <p className="font-medium">{userData ? userData.email : "Loading..."}</p>

              <div className="mt-4">
                <p>
                  <strong>Fullname:</strong> {userData ? userData.fullname : "Loading..."}
                </p>
                <p>
                  <strong>Gender:</strong> {userData ? userData.gender : "Loading..."}
                </p>
                <p>
                  <strong>Birth Date:</strong> {userData ? userData.birth_date : "Loading..."}
                </p>
                <p>
                  <strong>Phone Number:</strong> {userData ? userData.phone_number : "Loading..."}
                </p>
              </div>

              <div className="flex justify-center gap-4 mt-4">
                <button onClick={openEditModal} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition duration-300 ease-in-out">
                  Edit Profile
                </button>
                <button onClick={openDeleteModal} className="bg-danger text-white px-4 py-2 rounded-md hover:bg-danger-dark transition duration-300 ease-in-out">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === "address" && (
        <>
          {/* <Breadcrumb pageName="Address" /> */}
          <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 mt-4">
            <div className="text-center">
              {userData && userData.addresses && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold mb-2">Addresses:</h4>
                  {userData.addresses.map((address) => (
                    <div key={address.id} className="mb-2">
                      <p>{`${address.street} ${address.house_number}, ${address.zipcode}, ${address.city}, ${address.province}`}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}

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
    </>
  );
};

export default Profile;
