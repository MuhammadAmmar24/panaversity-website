"use client";

import React, { useState } from "react";
import { AiOutlineEdit, AiOutlineCheck } from "react-icons/ai";
import PasswordSettings from "./PasswordSettings";
import Image from "next/image";
import { update_student_Profile } from "@/src/app/actions/profile";
import { addressSchema } from "@/src/lib/schemas/addressInfo"; // Import the zod schema
import { ZodError } from "zod";

const AccountSettings: React.FC<any> = ({ profile }) => {
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
  const [errors, setErrors] = useState({
    address: "",
    city: "",
    country: "",
    postalCode: "",
  });

  const [statusMessage, setStatusMessage] = useState<string | null>(null); // State to store success/error message


  // Handle changes to address input fields
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressInfo({ ...addressInfo, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when typing
  };

  // Validate address using zod schema
  const validateAddress = () => {
    try {
      addressSchema.parse(addressInfo);
      return true; // Address is valid
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors = error.errors.reduce((acc: any, currError) => {
          acc[currError.path[0]] = currError.message;
          return acc;
        }, {});

        setErrors(fieldErrors); // Set specific field errors
      }
      return false; // Address is invalid
    }
  };

  // Submit changes to update student profile
  const submitChanges = async () => {
    if (!validateAddress()) return;

    const payload = {
      address: addressInfo.address,
      city: addressInfo.city,
      country: addressInfo.country,
      postal_code: addressInfo.postalCode,
      is_active: profile?.student?.is_active || false,
    };

    const result = await update_student_Profile(payload);

    if (result.type === "success") {
      setErrors({ address: "", city: "", country: "", postalCode: "" });
      setStatusMessage("Profile updated successfully.");
      setIsEditingAddress(false);
    } else {
      // Handle server errors here
      setStatusMessage(`Error updating profile: ${result.message}`);
    }
  };

  // Handle toggle edit mode and submit changes when closing the edit mode
  const handleEditToggle = () => {
    if (!isEditingAddress) {
      setIsEditingAddress(true); // Open the edit mode
    }
  };

  const handleCancel = () => {
    setAddressInfo({
      address: profile?.student?.address || "",
      city: profile?.student?.city || "",
      country: profile?.student?.country || "",
      postalCode: profile?.student?.postal_code || "",
    });
    setIsEditingAddress(false);
    setErrors({ address: "", city: "", country: "", postalCode: "" });
  };

  return (
    <main className="min-h-screen flex justify-center items-center mt-8 mb-8 font-poppins">
      <section className="w-full max-w-full p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-lg">
        <h1 className="font-medium text-lg sm:text-xl md:text-2xl mb-4 text-center md:text-start">
          Profile
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
              <p className="text-gray-800 font-semibold">Phone</p>
              <p className="text-gray-600">+{personalInfo.phone}</p> {/* Not editable */}
            </div>
            <div>
              <p className="text-gray-800 font-semibold">Student ID</p>
              <p className="text-gray-600">{personalInfo.studentId || "-"}</p> {/* Not editable */}
            </div>
          </div>

          {/* Address Information */}
          <div className="mt-8 text-sm sm:text-base">
            <div className="flex justify-between">
              <h2 className="text-lg sm:text-xl font-semibold mb-2">
                Address Information
              </h2>
              <button
                className="text-gray-500 hover:text-black p-2 rounded-full"
                onClick={handleEditToggle}
              >
                {isEditingAddress ? (
                  <AiOutlineCheck className="text-xl -mr-2 -mt-1" />
                ) : (
                  <AiOutlineEdit className="text-xl -mr-2 -mt-1" />
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-800 font-semibold">Country</p>
                {isEditingAddress ? (
                  <>
                    <input
                      type="text"
                      name="country"
                      value={addressInfo.country}
                      onChange={handleAddressChange}
                      className="border-2 border-gray-300 rounded-md p-1 py-2 w-[80%] focus:outline-none focus:border-accent focus:ring-accent transition-all duration-100 pl-4"
                    />
                    {errors.country && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.country}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-gray-600">{addressInfo.country || "-"}</p>
                )}
              </div>
              <div>
                <p className="text-gray-800 font-semibold">City</p>
                {isEditingAddress ? (
                  <>
                    <input
                      type="text"
                      name="city"
                      value={addressInfo.city}
                      onChange={handleAddressChange}
                      className="border-2 border-gray-300 rounded-md p-1 py-2 w-[80%] focus:outline-none focus:border-accent focus:ring-accent transition-all duration-100 pl-4"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </>
                ) : (
                  <p className="text-gray-600">{addressInfo.city || "-"}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-gray-800 font-semibold">Address</p>
                {isEditingAddress ? (
                  <>
                    <input
                      type="text"
                      name="address"
                      value={addressInfo.address}
                      onChange={handleAddressChange}
                      className="border-2 border-gray-300 rounded-md p-1 py-2 w-[80%] focus:outline-none focus:border-accent focus:ring-accent transition-all duration-100 pl-4"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.address}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-gray-600">{addressInfo.address || "-"}</p>
                )}
              </div>
              <div>
                <p className="text-gray-800 font-semibold">Postal Code</p>
                {isEditingAddress ? (
                  <>
                    <input
                      type="text"
                      name="postalCode"
                      value={addressInfo.postalCode}
                      onChange={handleAddressChange}
                      className="border-2 border-gray-300 rounded-md p-1 py-2 w-[80%] focus:outline-none focus:border-accent focus:ring-accent transition-all duration-100 pl-4"
                    />
                    {errors.postalCode && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.postalCode}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-gray-600">{addressInfo.postalCode || "-"}</p>
                )}
              </div>
            </div>

            {isEditingAddress && (
              <div className="flex justify-center md:justify-end mt-5 gap-4">
                <button
                  onClick={handleCancel}
                  className="bg-transparent border px-4 py-2 rounded-lg text-black hover:bg-gray-50 transition-all duration-300 ease-in-out"
                >
                  Cancel
                </button>
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
          <div className="text-center mt-[-0.5rem] mb-5  text-accent">{statusMessage}</div>
        )}


        <PasswordSettings profile_email={profile?.email} />
      </section>
    </main>
  );
};

export default AccountSettings;
