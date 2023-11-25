// page.jsx
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import EditUserForm from "./EditUserForm";
import Image from "next/image";
import EditUserCustomer from "./EditUserCustomer";

const Home = ({ users }) => {
  const [userData, setUserData] = useState(users);
  const [loading, setLoading] = useState(true);
  const [editUserId, setEditUserId] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/user", {
          withCredentials: true,
        });
        const users = res.data;
        setUserData(users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [deleteConfirmation]);

  const handleDeleteUser = async (userId) => {
    if (deleteConfirmation === userId) {
      try {
        await axios.delete(`http://localhost:8000/api/user/${userId}`, {
          withCredentials: true,
        });
        setUserData(userData.filter((user) => user.id !== userId));
      } catch (error) {
        console.error("Error deleting user", error);
      } finally {
        setDeleteConfirmation(null); // Tutup modal setelah penghapusan selesai
      }
    }
  };

  const handleEditClick = (userId) => {
    setEditUserId(userId);
  };

  const handleEditSuccess = async () => {
    setEditUserId(null);
    // Fetch the updated user data or update the existing data as needed
    try {
      const res = await axios.get("http://localhost:8000/api/user/", {
        withCredentials: true,
      });
      const users = res.data;
      setUserData(users);
    } catch (error) {
      console.error("Error fetching updated user data", error);
    }
  };

  return (
    <>
      {editUserId && (
        <EditUserCustomer
          userId={editUserId}
          onCancel={() => setEditUserId(null)}
          onEditSuccess={handleEditSuccess}
        />
      )}
      <Breadcrumb pageName="User Customers" />
      <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
        <div className="flex flex-col gap-7.5">
          <div className="container mx-auto p-4 overflow-x-auto">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 text-center">
                  <tr className="mx-auto">
                    <th className=" px-7 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className=" px-7 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Username
                    </th>
                    <th className=" px-7 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className=" px-7 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fullname
                    </th>
                    <th className=" px-7 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gender
                    </th>
                    <th className=" px-7 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Birthdate
                    </th>
                    <th className=" px-7 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone Number
                    </th>
                    <th className=" px-7 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Photo
                    </th>
                    <th className=" px-7 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-50 divide-y divide-gray-200">
                  {(userData ?? []).map((user) => (
                    <tr key={user.id} className="transition-all duration-200">
                      <td className="text-center px-5 py-4 whitespace-nowrap">
                        {user.id}
                      </td>
                      <td className="text-center px-7 py-4 whitespace-nowrap">
                        {user.username}
                      </td>
                      <td className="text-center px-7 py-4 whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className="text-center px-7 py-4 whitespace-nowrap">
                        {user.fullname}
                      </td>
                      <td className="text-center px-7 py-4 whitespace-nowrap">
                        {user.gender}
                      </td>
                      <td className="text-center px-7 py-4 whitespace-nowrap">
                        {user.birth_date}
                      </td>
                      <td className="text-center px-7 py-4 whitespace-nowrap">
                        {user.phone_number}
                      </td>
                      <td className="text-center  py-4 whitespace-nowrap">
                        {user.upload_photo && (
                          <div className="flex items-center justify-center">
                            <Image
                              src={`http://localhost:8000/${user.upload_photo.replace(
                                "\\",
                                "/"
                              )}`}
                              alt="User Profile"
                              width={50}
                              height={50}
                            />
                          </div>
                        )}
                      </td>
                      <td className="text-center px-7 py-4 flex items-center justify-center gap-4">
                        {/* Tombol Edit */}

                        {/* <button
                          onClick={() => handleEditClick(user.id)}
                          className="bg-warning text-white px-2 py-1 rounded transition-all duration-300"
                        >
                          Edit
                        </button> */}
                        {/* {editUserId && ( */}
                        <EditUserCustomer
                          userId={user.id}
                          onCancel={() => setEditUserId(null)}
                          onEditSuccess={handleEditSuccess}
                        />
                        {/* )} */}

                        {/* <EditUserCustomer                          
                          userId={editUserId}
                          onCancel={() => setEditUserId(null)}
                          onEditSuccess={handleEditSuccess}
                        /> */}

                        {/* Tombol Hapus */}
                        <button
                          onClick={() => setDeleteConfirmation(user.id)}
                          className="bg-danger text-white px-2 py-1 rounded transition-all duration-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {/* Tombol untuk membuat user baru
            <Link href="/dashboard/users/user-customers/create-customer">
              <button className="bg-primary hover:bg-green-700 text-white px-4 py-2 mt-4 rounded">Create Customer</button>
            </Link> */}
          </div>
        </div>
      </div>
      {deleteConfirmation && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
          <div className="z-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-md w-full max-w-md">
              <p className="text-center">
                Are you sure you want to delete this user?
              </p>
              <div className="flex justify-center mt-4">
                <button
                  className="bg-danger text-white px-4 py-2 rounded-md mr-2 focus:outline-none focus:ring focus:border-blue-300"
                  onClick={() => handleDeleteUser(deleteConfirmation)}
                >
                  Yes
                </button>
                <button
                  className="bg-primary text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  onClick={() => setDeleteConfirmation(null)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
