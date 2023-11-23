"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import PersonalProfile from "./PersonalProfile";
import Address from "./Address";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

const Profile = () => {
	const [userData, setUserData] = useState(null);
	const [decodedToken, setDecodedToken] = useState(null);
	const [isEditModalOpen, setEditModalOpen] = useState(false);
	const [editFormData, setEditFormData] = useState({
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
	const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
	const [activeTab, setActiveTab] = useState("personal");

	const fetchToken = async () => {
		try {
			const response = await axios.get("http://localhost:8000/api/user/token", {
				withCredentials: true,
			});
			const decodedToken = response.data.decodedToken;

			setDecodedToken(decodedToken);

			const userResponse = await axios.get(`http://localhost:8000/api/user/${decodedToken.userId}`, {
				withCredentials: true,
			});
			const userData = userResponse.data;
			setUserData(userData);
		} catch (error) {
			console.error("Error fetching or decoding token:", error);
		}
	};

	const updateToken = async () => {
		await fetchToken();
	};

	useEffect(() => {
		fetchToken();
	}, []);

	const openEditModal = () => {
		setEditFormData({
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

		setEditModalOpen(true);
	};

	const closeEditModal = () => {
		setEditModalOpen(false);
	};

	const handleChangeEdit = (e) => {
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
			formDataToSend.append("fullname", editFormData.fullname);
			formDataToSend.append("password", editFormData.password);
			formDataToSend.append("retypePassword", editFormData.retypePassword);
			formDataToSend.append("profileImage", editFormData.profileImage);
			formDataToSend.append("gender", editFormData.gender);
			formDataToSend.append("birth_date", editFormData.birth_date);
			formDataToSend.append("phone_number", editFormData.phone_number);

			await axios.put(`http://localhost:8000/api/user/${decodedToken.userId}`, formDataToSend, {
				withCredentials: true,
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			updateToken();
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
			await axios.delete(`http://localhost:8000/api/user/${decodedToken.userId}`, {
				withCredentials: true,
			});
			updateToken();
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
			<div className="flex justify-start mt-4">
				<button
					onClick={() => setActiveTab("personal")}
					className={`px-4 py-2 mx-2 rounded-md ${
						activeTab === "personal" ? "bg-primary text-white" : "bg-gray-300 text-gray-700"
					}`}
				>
					Personal Profile
				</button>
				<button
					onClick={() => setActiveTab("address")}
					className={`px-4 py-2 mx-2 rounded-md ${
						activeTab === "address" ? "bg-primary text-white" : "bg-gray-300 text-gray-700"
					}`}
				>
					Address
				</button>
			</div>

			{activeTab === "personal" && (
				<PersonalProfile userData={userData} openEditModal={openEditModal} openDeleteModal={openDeleteModal} />
			)}
			{activeTab === "address" && <Address userData={userData} />}

			<EditModal
				isEditModalOpen={isEditModalOpen}
				closeEditModal={closeEditModal}
				handleEditSubmit={handleEditSubmit}
				editFormData={editFormData}
				handleChangeEdit={handleChangeEdit}
			/>

			<DeleteModal
				isDeleteModalOpen={isDeleteModalOpen}
				closeDeleteModal={closeDeleteModal}
				handleDeleteAccount={handleDeleteAccount}
			/>
		</>
	);
};

export default Profile;
