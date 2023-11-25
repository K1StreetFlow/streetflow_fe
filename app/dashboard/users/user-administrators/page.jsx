"use client";
// app/dashboard/user-administrators/page.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import EditAdminForm from "./EditAdminForm";
import Image from "next/image";
import EditUserAdmin from "./EditUserAdmin";

const Home = ({ admins }) => {
  const [adminData, setAdminData] = useState(admins);
  const [loading, setLoading] = useState(true);
  const [editAdminId, setEditAdminId] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/admin/", {
          withCredentials: true,
        });
        const admins = res.data;
        setAdminData(admins);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching admin data", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [deleteConfirmation]);

  const handleDeleteAdmin = async (adminId) => {
    if (deleteConfirmation === adminId) {
      try {
        await axios.delete(`http://localhost:8000/api/admin/${adminId}`, {
          withCredentials: true,
        });
        setAdminData(adminData.filter((admin) => admin.id !== adminId));
      } catch (error) {
        console.error("Error deleting admin", error);
      } finally {
        setDeleteConfirmation(null); // Tutup modal setelah penghapusan selesai
      }
    }
  };

  const handleEditClick = (adminId) => {
    setEditAdminId(adminId);
  };

  const handleEditSuccess = async () => {
    setEditAdminId(null);
    // Fetch the updated admin data or update the existing data as needed
    try {
      const res = await axios.get("http://localhost:8000/api/admin/", {
        withCredentials: true,
      });
      const admins = res.data;
      setAdminData(admins);
    } catch (error) {
      console.error("Error fetching updated admin data", error);
    }
  };

  return (
    <>
      {/* ini modals edit */}
      {/* {editAdminId && (
        <EditAdminForm
          adminId={editAdminId}
          onCancel={() => setEditAdminId(null)}
          onEditSuccess={handleEditSuccess}
        />
      )} */}
      <Breadcrumb pageName="User Administrators" />
      <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
        <div className="flex flex-col gap-7.5">
          <div className="container mx-auto p-4 overflow-x-auto">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 text-center">
                  <tr className="mx-auto">
                    <th className="py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Username
                    </th>
                    <th className="py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Photo
                    </th>
                    <th className="py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-50 divide-y divide-gray-200">
                  {(adminData ?? []).map((admin) => (
                    <tr key={admin.id} className="transition-all duration-200">
                      <td className="text-center py-4 whitespace-nowrap">
                        {admin.id}
                      </td>
                      <td className="text-center py-4 whitespace-nowrap">
                        {admin.username}
                      </td>
                      <td className="text-center py-4 whitespace-nowrap">
                        {admin.email}
                      </td>
                      <td className="text-center py-4 whitespace-nowrap">
                        {admin.upload_photo && (
                          <div className="flex items-center justify-center">
                            <Image
                              src={`http://localhost:8000/${admin.upload_photo.replace(
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
                      <td className="text-center py-4 flex items-center justify-center gap-4">
                        <EditUserAdmin
                          adminId={admin.id}
                          onCancel={() => setEditUserId(null)}
                          onEditSuccess={handleEditSuccess}
                        />
                        <button
                          onClick={() => setDeleteConfirmation(admin.id)}
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
            <Link href="/dashboard/users/user-administrators/create-admin">
              <button className="bg-primary hover:bg-green-700 text-white px-4 py-2 mt-4 rounded">
                Create Admin
              </button>
            </Link>
          </div>
        </div>
      </div>

      {deleteConfirmation && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
          <div className="z-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-md w-full max-w-md">
              <p className="text-center">
                Are you sure you want to delete this admin?
              </p>
              <div className="flex justify-center mt-4">
                <button
                  className="bg-danger text-white px-4 py-2 rounded-md mr-2 focus:outline-none focus:ring focus:border-blue-300"
                  onClick={() => handleDeleteAdmin(deleteConfirmation)}
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
