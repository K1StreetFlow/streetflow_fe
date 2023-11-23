// DeleteModal.js
import React from "react";

const DeleteModal = ({ isDeleteModalOpen, closeDeleteModal, handleDeleteAccount }) => {
  return (
    <>
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
          <div className="z-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-md w-full max-w-md">
              <div className="mb-2 text-center">
                <p className="text-xl font-semibold text-red-500">Are you sure you want to delete your account?</p>
              </div>
              <div className="flex justify-center mt-4">
                <button onClick={handleDeleteAccount} className="bg-danger text-white px-4 py-2 rounded-md hover:bg-danger-dark focus:outline-none focus:shadow-outline-danger active:bg-danger-darker mr-2">
                  Delete
                </button>
                <button onClick={closeDeleteModal} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:shadow-outline-gray active:bg-gray-800 ml-2">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;