"use client";

import React, { useState } from "react";
import { AiOutlineEdit, AiOutlineCheck } from "react-icons/ai";
import PasswordSettings from "./PasswordSettings";
import Image from "next/image";
import { update_student_Profile } from "@/src/app/actions/profile"; // Import the API action

const AccountSettings: React.FC<any> = ({ profile }) => {
  // Initialize state with the profile data
  const [personalInfo] = useState({
    phone: profile?.phone || "",
    studentId: profile?.id || "",
  });

  const [addressInfo, setAddressInfo] = useState({
    address: profile?.student?.address || "",
    city: profile?.student?.city || "",
    country: profile?.student?.country || "",
    postalCode: profile?.student?.postal_code || "",
  });

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null); // State to store success/error message

  // Handle changes to address input fields
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressInfo({ ...addressInfo, [e.target.name]: e.target.value });
  };

  // Submit changes to update student profile
  const submitChanges = async () => {
    const payload = {
      address: addressInfo.address,
      city: addressInfo.city,
      country: addressInfo.country,
      postal_code: addressInfo.postalCode,
      is_active: profile?.student?.is_active || false, // Assuming you want to keep the original "is_active" status
    };

    // Call the update function
    const result = await update_student_Profile(payload);

    if (result.type === "success") {
      setStatusMessage("Profile updated successfully.");
    } else {
      setStatusMessage(`Error updating profile: ${result.message}`);
    }

    setIsEditingAddress(false);
  };

  return (
    <main className="min-h-screen flex justify-center items-center mt-5 mb-8 font-poppins">
      <section className="w-full max-w-full p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-lg">
        <h1 className="font-medium text-lg sm:text-xl md:text-2xl mb-4 text-center md:text-start">
          Account Settings
        </h1>

        <section className="mb-6 border-2 border-gray-200 rounded-lg px-4 sm:px-6 pb-4 md:pb-4 pt-2 md:pt-4 overflow-hidden">
          <div className="flex justify-between items-center">
            <div className="flex items-center flex-wrap justify-center gap-2 md:gap-4">
              <Image
                src="/profile.png"
                alt="Profile"
                width={100}
                height={100}
                className="w-10 h-10 mobileM:w-12 mobileM:h-12 md:w-16 md:h-16 rounded-full object-cover"
              />
              <div>
                <p className="text-base sm:text-xl">{profile?.full_name}</p>
                <p className="text-gray-500 text-xs sm:text-sm">
                  {profile?.email}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Personal Information */}
        <section className="mb-6 border-2 border-gray-200 px-4 sm:px-6 py-4 sm:py-6 rounded-lg">
          <div className="flex justify-between">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
              Personal Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base">
            <div>
              <p className="text-gray-600 font-semibold">Phone</p>
              <p>+{personalInfo.phone}</p> {/* Not editable */}
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Student ID</p>
              <p>{personalInfo.studentId || "-"}</p> {/* Not editable */}
            </div>
          </div>

          {/* Address Information */}
          <div className="mt-8 text-sm sm:text-base">
            <div className="flex justify-between">
              <h2 className="text-lg sm:text-xl font-semibold">
                Address Information
              </h2>
              <button
                className="text-gray-500 hover:text-black p-2 rounded-full"
                onClick={() => setIsEditingAddress(!isEditingAddress)}
              >
                {isEditingAddress ? (
                  <AiOutlineCheck className="text-xl -mr-2" />
                ) : (
                  <AiOutlineEdit className="text-xl -mr-2" />
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 font-semibold">Country</p>
                {isEditingAddress ? (
                  <input
                    type="text"
                    name="country"
                    value={addressInfo.country}
                    onChange={handleAddressChange}
                    className="border-2 border-gray-300 rounded-md p-1 py-2 w-[80%] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-100 pl-4"
                  />
                ) : (
                  <p>{addressInfo.country || "-"}</p>
                )}
              </div>
              <div>
                <p className="text-gray-600 font-semibold">City</p>
                {isEditingAddress ? (
                  <input
                    type="text"
                    name="city"
                    value={addressInfo.city}
                    onChange={handleAddressChange}
                    className="border-2 border-gray-300 rounded-md p-1 py-2 w-[80%] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-100 pl-4"
                  />
                ) : (
                  <p>{addressInfo.city || "-"}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-gray-600 font-semibold">Address</p>
                {isEditingAddress ? (
                  <input
                    type="text"
                    name="address"
                    value={addressInfo.address}
                    onChange={handleAddressChange}
                    className="border-2 border-gray-300 rounded-md p-1 py-2 w-[80%] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-100 pl-4"
                  />
                ) : (
                  <p>{addressInfo.address || "-"}</p>
                )}
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Postal Code</p>
                {isEditingAddress ? (
                  <input
                    type="text"
                    name="postalCode"
                    value={addressInfo.postalCode}
                    onChange={handleAddressChange}
                    className="border-2 border-gray-300 rounded-md p-1 py-2 w-[80%] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-100 pl-4"
                  />
                ) : (
                  <p>{addressInfo.postalCode || "-"}</p>
                )}
              </div>
            </div>

            {isEditingAddress && (
              <div className="flex justify-center md:justify-end mt-5">
                <button
                  className="text-center py-2 px-5 text-white rounded-md bg-accent hover:bg-[#18c781] font-medium transition-all ease-in-out duration-200"
                  onClick={submitChanges}
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Display Success/Error Message */}
        {statusMessage && (
          <div className="text-center mt-4 text-accent">{statusMessage}</div>
        )}

        <PasswordSettings profile_email={profile?.email} />
      </section>
    </main>
  );
};

export default AccountSettings;
