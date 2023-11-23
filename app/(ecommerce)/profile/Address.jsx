// Address.js
import React, { useEffect, useState } from "react";
import CreateAddressButton from "./CreateAddressButton";
import CreateAddressModal from "./CreateAddressModal";
import EditAddressModal from "./EditAddressModal";
import axios from "axios";

const Address = ({ userData }) => {
	const [addresses, setAddresses] = useState([]);
	const [isCreateAddressModalOpen, setCreateAddressModalOpen] = useState(false);
	const [editAddressId, setEditAddressId] = useState(null);
	const fetchAddresses = async () => {
		try {
			// Ensure userData is not null before making the API call
			if (userData && userData.id) {
				const response = await axios.get(`http://localhost:8000/api/addresses/customer/${userData.id}`, {
					withCredentials: true,
				});
				const userAddresses = response.data;
				setAddresses(userAddresses);
			}
		} catch (error) {
			console.error("Error fetching addresses:", error);
		}
	};

	const openCreateAddressModal = () => {
		setCreateAddressModalOpen(true);
		setEditAddressId(null);
	};

	const openEditAddressModal = (addressId) => {
		setEditAddressId(addressId);
		setCreateAddressModalOpen(false); // Close the create modal when opening the edit modal
	};

	const closeModals = () => {
		setCreateAddressModalOpen(false);
		setEditAddressId(null);
	};

	const handleEditAddress = (addressId) => {
		openEditAddressModal(addressId);
	};

	const handleDeleteAddress = async (addressId) => {
		try {
			await axios.delete(`http://localhost:8000/api/addresses/${addressId}`, {
				withCredentials: true,
			});
			console.log("Address deleted successfully");
			fetchAddresses(); // Update the addresses after deletion
		} catch (error) {
			console.error("Error deleting address:", error);
		}
	};

	useEffect(() => {
		fetchAddresses();
	}, [userData]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			<div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 mt-4">
				<CreateAddressButton userId={userData?.id} updateAddresses={fetchAddresses} />

				<div className="text-left mt-4">
					{" "}
					{/* Mengganti text-center menjadi text-left */}
					{userData && userData.addresses && (
						<div>
							{addresses.map((address) => (
								<div key={address.id} className="mb-4 p-4 border rounded-md">
									<div className="grid grid-cols-2 gap-4">
										{" "}
										{/* Menggunakan grid untuk menyusun data alamat */}
										<div>
											<p className="mb-2">
												<span className="font-semibold">Street:</span> {address.street}
											</p>
											<p className="mb-2">
												<span className="font-semibold">House Number:</span> {address.house_number}
											</p>
											<p className="mb-2">
												<span className="font-semibold">Zipcode:</span> {address.zipcode}
											</p>
											<p className="mb-2">
												<span className="font-semibold">City:</span> {address.city}
											</p>
											<p className="mb-2">
												<span className="font-semibold">Province:</span> {address.province}
											</p>
										</div>
										<div>
											<div className="flex justify-end">
												<button
													className="bg-warning text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-700"
													onClick={() => handleEditAddress(address.id)}
												>
													Edit
												</button>
												<button
													className="bg-danger text-white px-4 py-2 rounded-md hover:bg-red-700"
													onClick={() => handleDeleteAddress(address.id)}
												>
													Delete
												</button>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			<CreateAddressModal
				isOpen={isCreateAddressModalOpen}
				onClose={() => setCreateAddressModalOpen(false)}
				userId={userData.id}
				updateAddresses={fetchAddresses}
				editAddressId={editAddressId}
			/>
			<EditAddressModal
				isOpen={!isCreateAddressModalOpen && editAddressId !== null}
				onClose={closeModals}
				userId={userData.id}
				updateAddresses={fetchAddresses}
				editAddressId={editAddressId}
			/>
		</>
	);
};

export default Address;
