// CreateAddressModal.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateAddressModal = ({ isOpen, onClose, userId, updateAddresses, editAddressId }) => {
	const [newAddress, setNewAddress] = useState({
		street: "",
		house_number: "",
		zipcode: "",
		city: "",
		province: "",
		id_users_customer: userId,
	});

	const [isEditMode, setIsEditMode] = useState(false);

	const createAddress = async () => {
		try {
			await axios.post("http://localhost:8000/api/addresses", newAddress, {
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
				},
			});

			updateAddresses(); // Update the addresses after creating an address
			console.log("Address created successfully");
			onClose();
		} catch (error) {
			console.error("Error creating address:", error);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (isEditMode) {
			// Handle edit logic separately (use EditAddressModal)
			return;
		}

		createAddress();
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewAddress((prevAddress) => ({
			...prevAddress,
			[name]: value,
		}));
	};

	useEffect(() => {
		if (editAddressId) {
			setIsEditMode(true);
		} else {
			// Reset form if not in edit mode
			setNewAddress({
				street: "",
				house_number: "",
				zipcode: "",
				city: "",
				province: "",
				id_users_customer: userId,
			});
			setIsEditMode(false);
		}
	}, [editAddressId, userId]);

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
										<input
											type="text"
											name="street"
											value={newAddress.street}
											onChange={handleChange}
											className="w-full px-3 py-2 border rounded-md bg-white text-black"
											required
										/>
									</label>
									<label className="block mb-2">
										House Number:
										<input
											type="text"
											name="house_number"
											value={newAddress.house_number}
											onChange={handleChange}
											className="w-full px-3 py-2 border rounded-md bg-white text-black"
											required
										/>
									</label>
									<label className="block mb-2">
										Zipcode:
										<input
											type="text"
											name="zipcode"
											value={newAddress.zipcode}
											onChange={handleChange}
											className="w-full px-3 py-2 border rounded-md bg-white text-black"
											required
										/>
									</label>
									<label className="block mb-2">
										City:
										<input
											type="text"
											name="city"
											value={newAddress.city}
											onChange={handleChange}
											className="w-full px-3 py-2 border rounded-md bg-white text-black"
											required
										/>
									</label>
									<label className="block mb-2">
										Province:
										<input
											type="text"
											name="province"
											value={newAddress.province}
											onChange={handleChange}
											className="w-full px-3 py-2 border rounded-md bg-white text-black"
											required
										/>
									</label>
								</div>

								<div className="flex justify-end mt-4">
									<button
										type="submit"
										className="bg-primary text-white px-4 py-2 rounded-md mr-2 hover:bg-primary-dark focus:outline-none focus:shadow-outline-primary active:bg-primary-darker"
									>
										{isEditMode ? "Save Changes" : "Create Address"}
									</button>
									<button
										type="button"
										onClick={onClose}
										className="bg-danger text-white px-4 py-2 rounded-md hover:bg-danger-dark focus:outline-none focus:shadow-outline-danger active:bg-danger-darker"
									>
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

export default CreateAddressModal;
