"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function EditCategory({ addressId, onCancel, onEditSuccess }) {
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    street: "",
    house_number: "",
    zipcode: "",
    city: "",
    province: "",
  });

  useEffect(() => {
    const fetchAddressData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/addresses/${addressId}`,
          {
            withCredentials: true,
          }
        );
        const addressData = response.data;

        // Ensure that each field has a default value to avoid controlled/uncontrolled warning
        setFormData({
          street: addressData.street || "",
          house_number: addressData.house_number || "",
          zipcode: addressData.zipcode || "",
          city: addressData.city || "",
          province: addressData.province || "",
        });
      } catch (error) {
        console.error("Error fetching address data", error);
      }
    };

    fetchAddressData();
  }, [addressId]);

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
      await axios.put(
        `http://localhost:8000/api/addresses/${addressId}`,
        formData,
        {
          withCredentials: true,
        }
      );

      console.log("Address updated successfully");
      onEditSuccess();
      router.refresh();
      setModal(false);
    } catch (error) {
      console.error("Error updating address:", error);
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
              Street:
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </label>
            <label className="block mb-2">
              House Number:
              <input
                type="text"
                name="house_number"
                value={formData.house_number}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </label>
            <label className="block mb-2">
              Zipcode:
              <input
                type="text"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </label>
            <label className="block mb-2">
              City:
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </label>
            <label className="block mb-2">
              Province:
              <input
                type="text"
                name="province"
                value={formData.province}
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
              onClick={handleChange}
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
