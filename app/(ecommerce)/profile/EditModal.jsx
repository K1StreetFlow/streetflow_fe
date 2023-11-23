// EditModal.js
import React from "react";

const EditModal = ({ isEditModalOpen, closeEditModal, handleEditSubmit, editFormData, handleChangeEdit }) => {
  return (
    <>
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
          <div className="z-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-md w-full max-w-2xl">
              <form onSubmit={handleEditSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
                <div className="flex">
                  {/* Left side content */}
                  <div className="w-1/2 pr-4">
                    <div className="mb-2">
                      <label className="block mb-2">
                        Username:
                        <input type="text" name="username" value={editFormData.username} onChange={handleChangeEdit} className="w-full px-3 py-2 border rounded-md bg-white text-black" />
                      </label>
                      <label className="block mb-2">
                        Email:
                        <input type="email" name="email" value={editFormData.email} onChange={handleChangeEdit} className="w-full px-3 py-2 border rounded-md bg-white text-black" />
                      </label>
                      <label className="block mb-2">
                        Full Name:
                        <input type="text" name="fullname" value={editFormData.fullname} onChange={handleChangeEdit} className="w-full px-3 py-2 border rounded-md bg-white text-black" />
                      </label>
                      <label className="block mb-2">
                        Gender:
                        <select name="gender" value={editFormData.gender} onChange={handleChangeEdit} className="w-full px-3 py-2 border rounded-md bg-white text-black">
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </label>
                      <label className="block mb-2">
                        Date of Birth:
                        <input type="date" name="birth_date" value={editFormData.birth_date} onChange={handleChangeEdit} className="w-full px-3 py-2 border rounded-md bg-white text-black" />
                      </label>
                    </div>
                  </div>

                  {/* Right side content */}
                  <div className="w-1/2 pl-4">
                    <div className="mb-2">
                      <label className="block mb-2">
                        Phone Number:
                        <input type="tel" name="phone_number" value={editFormData.phone_number} onChange={handleChangeEdit} className="w-full px-3 py-2 border rounded-md bg-white text-black" />
                      </label>
                      <label className="block mb-2">
                        Password:
                        <input type="password" name="password" value={editFormData.password} onChange={handleChangeEdit} className="w-full px-3 py-2 border rounded-md bg-white text-black" />
                      </label>
                      <label className="block mb-2">
                        Retype Password:
                        <input type="password" name="retypePassword" value={editFormData.retypePassword} onChange={handleChangeEdit} className="w-full px-3 py-2 border rounded-md bg-white text-black" />
                      </label>
                      <label className="block mb-2">
                        Profile Image:
                        <input type="file" name="profileImage" onChange={handleChangeEdit} className="w-full px-3 py-2 border rounded-md bg-white text-black" />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md mr-2 hover:bg-primary-dark focus:outline-none focus:shadow-outline-primary active:bg-primary-darker">
                    Save Changes
                  </button>
                  <button type="button" onClick={closeEditModal} className="bg-danger text-white px-4 py-2 rounded-md hover:bg-danger-dark focus:outline-none focus:shadow-outline-danger active:bg-danger-darker">
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

export default EditModal;