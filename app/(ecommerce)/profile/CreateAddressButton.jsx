// CreateAddressButton.js
import React, { useState } from "react";
import CreateAddressModal from "./CreateAddressModal";

const CreateAddressButton = ({ userId, updateAddresses }) => {
	const [isCreateAddressModalOpen, setCreateAddressModalOpen] = useState(false);
	const [editAddressId, setEditAddressId] = useState(null);

	const openCreateAddressModal = () => {
		setCreateAddressModalOpen(true);
		setEditAddressId(null);
	};

	const openEditAddressModal = (addressId) => {
		setEditAddressId(addressId);
		setCreateAddressModalOpen(true);
	};

	const closeCreateAddressModal = () => {
		setCreateAddressModalOpen(false);
		setEditAddressId(null);
	};

	return (
		<>
			<button
				onClick={openCreateAddressModal}
				className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition duration-300 ease-in-out"
			>
				Create Address
			</button>

			<CreateAddressModal
				isOpen={isCreateAddressModalOpen}
				onClose={closeCreateAddressModal}
				userId={userId}
				updateAddresses={updateAddresses}
				editAddressId={editAddressId} // Pass the editAddressId to the modal
			/>
		</>
	);
};

export default CreateAddressButton;
