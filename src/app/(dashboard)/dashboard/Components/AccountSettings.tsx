"use client";
import React, { useState, useEffect } from "react";
import { AiOutlineEdit, AiOutlineCheck } from "react-icons/ai";
import { Metadata } from "next";
import { initialData } from "../utils/data";
import PasswordSettings from "./PasswordSettings";

export const metadata: Metadata = {
  title: "Account Settings",
  description: "Update your account information and settings.",
};

const AccountSettings = () => {
  const [profileInfo, setProfileInfo] = useState(initialData.profileInfo);
  const [personalInfo] = useState(initialData.personalInfo);
  const [addressInfo, setAddressInfo] = useState(initialData.addressInfo);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  useEffect(() => {}, []);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileInfo({ ...profileInfo, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressInfo({ ...addressInfo, [e.target.name]: e.target.value });
  };

  const submitChanges = () => {
    const updatedData = {
      profileInfo,
      addressInfo,
    };
    // Here you can handle the submission or save process
  };

  return (
    <div className="min-h-screen flex justify-center items-center mt-5 font-poppins">
      <div className="w-full max-w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="font-medium md:text-2xl text-xl mb-4 text-center md:text-start">
          Account Settings
        </h1>

        {/* Profile Section */}
        <div className="mb-6 border-2 border-gray-200 rounded-lg px-6 pb-6 md:pt-2">
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
            <div className="flex items-center flex-wrap justify-center  space-x-4">
              <img
                src="/customers/lee-robinson.png"
                alt="Profile"
                className="md:w-auto md:h-16 h-10 w-auto rounded-full object-cover"
              />
              <div>
                {isEditingProfile ? (
                  <>
                    <input
                      type="text"
                      name="firstName"
                      value={profileInfo.firstName}
                      onChange={handleProfileChange}
                      className="border-2 border-gray-300 rounded-md p-1 py-2 items-center w-full mb-2 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-100 "
                    />

                    <input
                      type="text"
                      name="lastName"
                      value={profileInfo.lastName}
                      onChange={handleProfileChange}
                      className="border-2 border-gray-300 rounded-md p-1 py-2 items-center w-full mb-2 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-100"
                    />
                  </>
                ) : (
                  <>
                    <p className=" sm:text-2xl text-center lg:text-start pt-2">
                      {profileInfo.firstName} {profileInfo.lastName}
                    </p>
                    <p className="text-gray-500">{profileInfo.email}</p>
                  </>
                )}
              </div>
            </div>
            <div className="ml-auto"></div>
          </div>
        </div>

        {/* Personal Information Section (Read-only) */}
        <div className="mb-6 border-2 border-gray-200 px-6 py-6 rounded-lg">
          <div className="flex justify-between">
            <h2 className="md:text-2xl font-semibold mb-2">
              Personal Information
            </h2>
            <button
              className="text-gray-500 hover:text-black p-2 rounded-full"
              onClick={() => {
                if (isEditingAddress) submitChanges();
                setIsEditingAddress(!isEditingAddress);
              }}
            >
              {isEditingAddress ? (
                <AiOutlineCheck className="text-xl" />
              ) : (
                <AiOutlineEdit className="text-xl" />
              )}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Phone</p>
              <p className="font">{personalInfo.phone}</p>
            </div>
            <div>
              <p className="text-gray-600">Student ID</p>
              <p className="font">{personalInfo.studentId}</p>
            </div>
          </div>

          {/* Address Section */}
          <div className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Country</p>
                {isEditingAddress ? (
                  <input
                    type="text"
                    name="country"
                    value={addressInfo.country}
                    onChange={handleAddressChange}
                    className="border-2 border-gray-300 rounded-md p-1 py-2 items-center w-full focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-100"
                  />
                ) : (
                  <p className="font">{addressInfo.country}</p>
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
                    className="border-2 border-gray-300 rounded-md p-1 py-2 items-center w-full focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-100"
                  />
                ) : (
                  <p className="font">{addressInfo.city}</p>
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
                    className="border-2 border-gray-300 rounded-md p-1 py-2 items-center w-full focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-100"
                  />
                ) : (
                  <p className="font">{addressInfo.address}</p>
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
                    className="border-2 border-gray-300 rounded-md p-1 py-2 items-center w-full focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-100"
                  />
                ) : (
                  <p className="font">{addressInfo.postalCode}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      <PasswordSettings/>
      </div>
    </div>
  );
};

export default AccountSettings;
