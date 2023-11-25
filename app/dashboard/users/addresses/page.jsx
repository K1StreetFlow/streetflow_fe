"use client";
// user-administrators/AddressPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import EditAddress from "./EditAddress";

const AddressPage = ({ addresses }) => {
  const [addressData, setAddressData] = useState(addresses);
  const [loading, setLoading] = useState(true);
  const [editAddressId, setEditAddressId] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/addresses", {
          withCredentials: true,
        });
        const addresses = res.data;
        setAddressData(addresses);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching address data", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [deleteConfirmation, editAddressId]);

  const handleDeleteAddress = async (addressId) => {
    if (deleteConfirmation === addressId) {
      try {
        await axios.delete(`http://localhost:8000/api/addresses/${addressId}`, {
          withCredentials: true,
        });
        setAddressData(
          addressData.filter((address) => address.id !== addressId)
        );
      } catch (error) {
        console.error("Error deleting address", error);
      } finally {
        setDeleteConfirmation(null); // Tutup modal setelah penghapusan selesai
      }
    }
  };

  const handleEditClick = (addressId) => {
    setEditAddressId(addressId);
  };

  const handleEditSuccess = async () => {
    setEditAddressId(null);
    // Fetch the updated address data or update the existing data as needed
    try {
      const res = await axios.get("http://localhost:8000/api/addresses", {
        withCredentials: true,
      });
      const addresses = res.data;
      setAddressData(addresses);
    } catch (error) {
      console.error("Error fetching updated address data", error);
    }
  };

  return (
    <>
      {/* {editAddressId && <EditAddressForm addressId={editAddressId} onCancel={() => setEditAddressId(null)} onEditSuccess={handleEditSuccess} />} */}
      {deleteConfirmation && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
          <div className="z-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-md w-full max-w-md">
              <p className="text-center">
                Are you sure you want to delete this address?
              </p>
              <div className="flex justify-center mt-4">
                <button
                  className="bg-danger text-white px-4 py-2 rounded-md mr-2 focus:outline-none focus:ring focus:border-blue-300"
                  onClick={() => handleDeleteAddress(deleteConfirmation)}
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
      <Breadcrumb pageName="Addresses" />
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
                      User
                    </th>
                    <th className="py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Street
                    </th>
                    <th className="py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      House Number
                    </th>
                    <th className="py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Zipcode
                    </th>
                    <th className="py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      City
                    </th>
                    <th className="py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Province
                    </th>
                    <th className="py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-50 divide-y divide-gray-200">
                  {(addressData ?? []).map((address) => (
                    <tr
                      key={address.id}
                      className="transition-all duration-200"
                    >
                      <td className="text-center py-4 whitespace-nowrap">
                        {address.id}
                      </td>
                      <td className="text-center py-4 whitespace-nowrap">
                        {address.users_customer?.username}
                      </td>
                      <td className="text-center py-4 whitespace-nowrap">
                        {address.street}
                      </td>
                      <td className="text-center py-4 whitespace-nowrap">
                        {address.house_number}
                      </td>
                      <td className="text-center py-4 whitespace-nowrap">
                        {address.zipcode}
                      </td>
                      <td className="text-center py-4 whitespace-nowrap">
                        {address.city}
                      </td>
                      <td className="text-center py-4 whitespace-nowrap">
                        {address.province}
                      </td>
                      <td className="text-center py-4 flex items-center justify-center gap-4">
                        {/* <button onClick={() => handleEditClick(address.id)} className="bg-warning text-white px-2 py-1 rounded transition-all duration-300">
                          Edit
                        </button> */}
                        <EditAddress
                          addressId={address.id}
                          onCancel={() => setEditUserId(null)}
                          onEditSuccess={handleEditSuccess}
                        />
                        <button
                          onClick={() => setDeleteConfirmation(address.id)}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressPage;
