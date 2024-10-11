"use client";

import React, { useState, useEffect } from "react";
import { AiOutlineEdit, AiOutlineCheck } from "react-icons/ai";
import { initialData } from "../../types/data";
import PasswordSettings from "./PasswordSettings";
import AccountSettingsSkeleton from "../Skeleton/AccountSettingsSkeleton";
import Image from "next/image";
import fetchProfile from "@/src/lib/getProfile";

const AccountSettings: React.FC<any> = ({profile}) => {
  console.log(profile)
  
  // State for profile, personal, and address information
  const [profileInfo, setProfileInfo] = useState(initialData.profileInfo);
  const [personalInfo] = useState(initialData.personalInfo);
  const [addressInfo, setAddressInfo] = useState(initialData.addressInfo);
  // const [profile, setProfile] = useState<ProfileData | null>(profile_r);
  // const [loading, setLoading] = useState<boolean>(true); // State for loading spinner

  // State for toggling edit modes
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);


  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       // const user_data = await checkUserVerification();
  //       const user_data = await fetchProfile();
  //       if (user_data) {
  //         setProfile(user_data); // Set profile data
  //         // (user_data)
  //       } else {
  //         console.error("Failed to load user data.");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     } finally {
  //       setLoading(false); // Hide loading state
  //     }
  //   };

  //   // fetchUserData(); // Fetch user data when component loads
  // }, []);

  // Handle changes to profile input fields
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileInfo({ ...profileInfo, [e.target.name]: e.target.value });
  };

  // Handle changes to address input fields
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressInfo({ ...addressInfo, [e.target.name]: e.target.value });
  };

  // Simulate submitting updated data (This can be replaced with an actual API call)
  const submitChanges = () => {
    const updatedData = {
      profileInfo,
      addressInfo,
    };
  };

  // Show loading skeleton while profile data is being fetched
  // if (loading) {
  //   return <AccountSettingsSkeleton />;
  // }

  return (
    <main className="min-h-screen flex justify-center items-center mt-5 mb-8 font-poppins">
      <section className="w-full max-w-full p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-lg">
        <h1 className="font-medium text-lg sm:text-xl md:text-2xl mb-4 text-center md:text-start">
          Account Settings
        </h1>

        <section className="mb-6 border-2 border-gray-200 rounded-lg px-4 sm:px-6 pb-4 md:pb-6 pt-2 overflow-hidden">
          <div className="text-end">
            <button
              className="text-gray-500 hover:text-black p-2 rounded-full"
              onClick={() => {
                if (isEditingProfile) submitChanges();
                setIsEditingProfile(!isEditingProfile);
              }}
            >
              {isEditingProfile ? (
                <AiOutlineCheck className="text-xl" />
              ) : (
                <AiOutlineEdit className="text-xl" />
              )}
            </button>
          </div>
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
                {isEditingProfile ? (
                  <input
                    type="text"
                    name="firstName"
                    value={profile?.full_name || ""}
                    onChange={handleProfileChange}
                    className="border-2 border-gray-300 rounded-md p-1 py-2 w-full mb-2 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-100"
                  />
                ) : (
                  <>
                    <p className="text-base sm:text-xl">{profile?.full_name}</p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      {profile?.email}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Personal Information Section (Read-only) */}
        <section className="mb-6 border-2 border-gray-200 px-4 sm:px-6 py-4 sm:py-6 rounded-lg">
          <div className="flex justify-between">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
              Personal Information
            </h2>
            <button
              className="text-gray-500 hover:text-black p-2 rounded-full"
              onClick={() => {
                if (isEditingAddress) submitChanges(); // Submit changes if editing is active
                setIsEditingAddress(!isEditingAddress); // Toggle edit mode
              }}
            >
              {isEditingAddress ? (
                <AiOutlineCheck className="text-xl" />
              ) : (
                <AiOutlineEdit className="text-xl" />
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base">
            {/* Personal information fields  */}
            <div>
              <p className="text-gray-600">Phone</p>
              <p>+{profile?.phone}</p>
            </div>
            <div>
              <p className="text-gray-600">Student ID</p>
              <p>{personalInfo.studentId}</p>
            </div>
          </div>

          {/* Address Information Section  */}
          <div className="mt-4 text-sm sm:text-base">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Editable address fields */}
              <div>
                <p className="text-gray-600">Country</p>
                {isEditingAddress ? (
                  <input
                    type="text"
                    name="country"
                    value={addressInfo.country}
                    onChange={handleAddressChange}
                    className="border-2 border-gray-300 rounded-md p-1 py-2 w-full focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-100"
                  />
                ) : (
                  <p>{addressInfo.country}</p>
                )}
              </div>
              <div>
                <p className="text-gray-600">City</p>
                {isEditingAddress ? (
                  <input
                    type="text"
                    name="city"
                    value={addressInfo.city}
                    onChange={handleAddressChange}
                    className="border-2 border-gray-300 rounded-md p-1 py-2 w-full focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-100"
                  />
                ) : (
                  <p>{addressInfo.city}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-gray-600">Address</p>
                {isEditingAddress ? (
                  <input
                    type="text"
                    name="address"
                    value={addressInfo.address}
                    onChange={handleAddressChange}
                    className="border-2 border-gray-300 rounded-md p-1 py-2 w-full focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-100"
                  />
                ) : (
                  <p>{addressInfo.address}</p>
                )}
              </div>
              <div>
                <p className="text-gray-600">Postal Code</p>
                {isEditingAddress ? (
                  <input
                    type="text"
                    name="postalCode"
                    value={addressInfo.postalCode}
                    onChange={handleAddressChange}
                    className="border-2 border-gray-300 rounded-md p-1 py-2 w-full focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-100"
                  />
                ) : (
                  <p>{addressInfo.postalCode}</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Password settings component */}
        <PasswordSettings />
      </section>
    </main>
  );
};

export default AccountSettings;
