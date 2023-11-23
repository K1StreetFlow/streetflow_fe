// PersonalProfile.js
import React from "react";
import Image from "next/image";

const PersonalProfile = ({ userData, openEditModal, openDeleteModal }) => {
  return (
    <>
      <div className="flex mt-4">
        <div className="ml-4 flex-grow">
          <div className="flex flex-col md:flex-row items-center overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-10 mt-4">
            <div className="flex flex-col items-center md:mx-30 md:my-20">
              {userData && userData.upload_photo && (
                <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden aspect-w-1 aspect-h-1">
                  <Image src={`http://localhost:8000/${userData.upload_photo.replace("\\", "/")}`} alt="User Profile" className="rounded-full" layout="fill" objectFit="cover" priority={true} />
                </div>
              )}
              <h3 className="mt-4 text-2xl font-semibold text-black dark:text-white">{userData ? userData.username : "Loading..."}</h3>
            </div>
            <div className="flex flex-col items-center ml-0 md:ml-5 mt-4 md:mt-0">
              <div>
                <p className="py-2">
                  <strong>Fullname:</strong> {userData ? userData.fullname : "Loading..."}
                </p>
                <p className="font-medium py-2">
                  <strong>Email:</strong> {userData ? userData.email : "Loading..."}
                </p>
                <p className="py-2">
                  <strong>Gender:</strong> {userData ? userData.gender : "Loading..."}
                </p>
                <p className="py-2">
                  <strong>Birth Date:</strong> {userData ? userData.birth_date : "Loading..."}
                </p>
                <p className="py-2">
                  <strong>Phone Number:</strong> {userData ? userData.phone_number : "Loading..."}
                </p>
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <button onClick={openEditModal} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition duration-300 ease-in-out">
                  Edit Profile
                </button>
                <button onClick={openDeleteModal} className="bg-danger text-white px-4 py-2 rounded-md hover:bg-danger-dark transition duration-300 ease-in-out">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalProfile;
