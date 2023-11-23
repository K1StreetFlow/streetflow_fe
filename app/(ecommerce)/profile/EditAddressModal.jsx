// EditAddressModal.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const EditAddressModal = ({ isOpen, onClose, userId, updateAddresses, editAddressId }) => {
  const [editedAddress, setEditedAddress] = useState({
    street: "",
    house_number: "",
    zipcode: "",
    city: "",
    province: "",
    id_users_customer: userId,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/addresses/${editAddressId}`, {
          withCredentials: true,
        });
        const addressData = response.data;

        // Set the state with the fetched data
        setEditedAddress({
          street: addressData.street || "",
          house_number: addressData.house_number || "",
          zipcode: addressData.zipcode || "",
          city: addressData.city || "",
          province: addressData.province || "",
          id_users_customer: userId,
        });
      } catch (error) {
        console.error("Error fetching address data for editing:", error);
      }
    };

    // Fetch data only if the modal is open and there's an editAddressId
    if (isOpen && editAddressId) {
      fetchData();
    }
  }, [isOpen, editAddressId, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8000/api/addresses/${editAddressId}`, editedAddress, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      updateAddresses();
      console.log("Address updated successfully");
      onClose();
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
          <div className="z-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-md w-full max-w-md">
              <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
                <div className="mb-2">
                  <label className="block mb-2">
                    Street:
                    <input type="text" name="street" value={editedAddress.street} onChange={handleChange} className="w-full px-3 py-2 border rounded-md bg-white text-black" required />
                  </label>
                  <label className="block mb-2">
                    House Number:
                    <input type="text" name="house_number" value={editedAddress.house_number} onChange={handleChange} className="w-full px-3 py-2 border rounded-md bg-white text-black" required />
                  </label>
                  <label className="block mb-2">
                    Zipcode:
                    <input type="text" name="zipcode" value={editedAddress.zipcode} onChange={handleChange} className="w-full px-3 py-2 border rounded-md bg-white text-black" required />
                  </label>
                  <label className="block mb-2">
                    City:
                    <input type="text" name="city" value={editedAddress.city} onChange={handleChange} className="w-full px-3 py-2 border rounded-md bg-white text-black" required />
                  </label>
                  <label className="block mb-2">
                    Province:
                    <input type="text" name="province" value={editedAddress.province} onChange={handleChange} className="w-full px-3 py-2 border rounded-md bg-white text-black" required />
                  </label>
                </div>

                <div className="flex justify-end mt-4">
                  <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md mr-2 hover:bg-primary-dark focus:outline-none focus:shadow-outline-primary active:bg-primary-darker">
                    Update Address
                  </button>
                  <button type="button" onClick={onClose} className="bg-danger text-white px-4 py-2 rounded-md hover:bg-danger-dark focus:outline-none focus:shadow-outline-danger active:bg-danger-darker">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditAddressModal;