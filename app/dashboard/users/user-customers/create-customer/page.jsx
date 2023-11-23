// RegisterForm.jsx
"use client";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    retypePassword: "",
    fullname: "",
    gender: "",
    birth_date: "",
    phone_number: "",
    profileImage: null,
  });

  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

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
      formDataToSend.append("password", formData.password);
      formDataToSend.append("retypePassword", formData.retypePassword);
      formDataToSend.append("fullname", formData.fullname);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("birth_date", formData.birthDate);
      formDataToSend.append("phone_number", formData.phoneNumber);
      formDataToSend.append("profileImage", formData.profileImage);

      // Send a POST request to the backend API
      const response = await axios.post("http://localhost:8000/api/user/auth/register", formDataToSend, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle the success (you may want to redirect or show a success message)
      console.log("Registration successful:", response.data);

      setFormData({
        username: "",
        email: "",
        password: "",
        retypePassword: "",
        fullname: "",
        gender: "",
        birthDate: "",
        phoneNumber: "",
        profileImage: null,
      });
      setSuccessModalVisible(true);
      setTimeout(() => {
        setSuccessModalVisible(false);
        router.push("/dashboard/users/user-customers");
      }, 3000);
    } catch (error) {
      console.error("Error registering user:", error);
      // Handle error, display an error message, etc.
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
      // Show error modal
      setErrorModalVisible(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-4">
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-600">
            Username:
          </label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required className="mt-1 p-2 w-full border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email:
          </label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 p-2 w-full border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password:
          </label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required className="mt-1 p-2 w-full border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="retypePassword" className="block text-sm font-medium text-gray-600">
            Retype Password:
          </label>
          <input type="password" id="retypePassword" name="retypePassword" value={formData.retypePassword} onChange={handleChange} required className="mt-1 p-2 w-full border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="fullname" className="block text-sm font-medium text-gray-600">
            Full Name:
          </label>
          <input type="text" id="fullname" name="fullname" value={formData.fullname} onChange={handleChange} required className="mt-1 p-2 w-full border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-600">
            Gender:
          </label>
          <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required className="mt-1 p-2 w-full border rounded-md">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            {/* Add more options if needed */}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="birthDate" className="block text-sm font-medium text-gray-600">
            Birth Date:
          </label>
          <input type="date" id="birthDate" name="birthDate" value={formData.birthDate} onChange={handleChange} required className="mt-1 p-2 w-full border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-600">
            Phone Number:
          </label>
          <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required className="mt-1 p-2 w-full border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="profileImage" className="block text-sm font-medium text-gray-600">
            Profile Image:
          </label>
          <input type="file" id="profileImage" name="profileImage" onChange={handleChange} accept="image/*" className="mt-1 p-2 w-full border rounded-md" />
        </div>
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition duration-300 ease-in-out">
          Add User
        </button>
        <Link href="/dashboard/users/user-customers">
          <button type="button" className="bg-gray text-gray-600 ml-4 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300 ease-in-out">
            Back
          </button>
        </Link>
      </form>
      {/* Success Modal */}
      {successModalVisible && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
          <div className="z-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-md w-full max-w-md">
              <p className="text-center text-green-500">User added successfully!</p>
              <Link href="/dashboard/users/user-customers">
                <button
                  className="block mx-auto mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-green-700"
                  onClick={() => {
                    setSuccessModalVisible(false);
                  }}
                >
                  OK
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {errorModalVisible && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
          <div className="z-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-md w-full max-w-md">
              <p className="text-center text-red-500">Error creating user. {errorMessage}</p>
              <button className="block mx-auto mt-4 bg-danger text-white px-4 py-2 rounded-md hover:bg-red-700" onClick={() => setErrorModalVisible(false)}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterForm;
