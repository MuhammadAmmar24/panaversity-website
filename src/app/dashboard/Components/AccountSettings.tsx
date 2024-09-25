"use client";
import React, { useState, useEffect } from "react";
import { AiOutlineEdit, AiOutlineCheck } from "react-icons/ai";

// Sample data structure simulating a backend fetch
const initialData = {
  profileInfo: {
    firstName: "David",
    lastName: "Jones",
    email: "davidjoness@gmail.com",
  },
  personalInfo: {
    phone: "+92 0346566543",
    studentId: "15446565", // Student ID is not editable
    bio: "AI Student",
  },
  addressInfo: {
    country: "United Kingdom",
    city: "Leeds, East London",
    postalCode: "26000",
    address: "Street 1, F7 Markaz, Islamabad",
  },
};

const AccountSettings = () => {
  // State to hold the user data
  const [profileInfo, setProfileInfo] = useState(initialData.profileInfo);
  const [personalInfo, setPersonalInfo] = useState(initialData.personalInfo);
  const [addressInfo, setAddressInfo] = useState(initialData.addressInfo);

  // State for edit mode toggles
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  // useEffect placeholder for API integration
  useEffect(() => {
    // This is where you would make an API call to fetch the user data
    // For example:
    // fetch("/api/account-settings")
    //   .then(res => res.json())
    //   .then(data => {
    //     setProfileInfo(data.profileInfo);
    //     setPersonalInfo(data.personalInfo);
    //     setAddressInfo(data.addressInfo);
    //   });
  }, []);

  // Handler for profile information changes (first name, last name, email)
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileInfo({ ...profileInfo, [e.target.name]: e.target.value });
  };

  // Handler for personal information changes (phone, bio)
  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  // Handler for address changes
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressInfo({ ...addressInfo, [e.target.name]: e.target.value });
  };

  // Submit updated info to the backend (placeholder)
  const submitChanges = () => {
    const updatedData = {
      profileInfo,
      personalInfo,
      addressInfo,
    };
    // Simulate an API call:
    // fetch("/api/account-settings", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(updatedData),
    // });
  };

  return (
    <div className="min-h-screen flex justify-center items-center mt-10 md:mt-0">
      <div className="w-full max-w-6xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="md:text-2xl text-xl mb-4 text-center">
          Account Settings
        </h1>

        {/* Profile Section */}
        <div className="mb-6 border- border-gray-300 rounded-lg px-1 py-2 ">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <img
                src="/customers/lee-robinson.png"
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                {isEditingProfile ? (
                  <>
                    <input
                      type="text"
                      name="firstName"
                      value={profileInfo.firstName}
                      onChange={handleProfileChange}
                      className="border-2 border-gray-300 rounded-md p-1 w-full mb-2"
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={profileInfo.lastName}
                      onChange={handleProfileChange}
                      className="border-2 border-gray-300 rounded-md p-1 w-full mb-2"
                    />
                    <input
                      type="email"
                      name="email"
                      value={profileInfo.email}
                      onChange={handleProfileChange}
                      className="border-2 border-gray-300 rounded-md p-1 w-full"
                    />
                  </>
                ) : (
                  <>
                    <p className="">
                      {profileInfo.firstName} {profileInfo.lastName}
                    </p>
                    <p className="text-gray-500">{profileInfo.email}</p>
                  </>
                )}
              </div>
            </div>
            <button
              className="border-1 border-black text-2xl rounded-lg"
              onClick={() => {
                if (isEditingProfile) submitChanges(); // Save when exiting edit mode
                setIsEditingProfile(!isEditingProfile);
              }}
            >
              {isEditingProfile ? <AiOutlineCheck /> : <AiOutlineEdit />}
            </button>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="mb-6 border-2 border-gray-300 px-4 py-2">
          <div className="flex justify-between">
            <h2 className="tex mb-2">Personal Information</h2>
            <button
              className="border-2 border-black text-2xl"
              onClick={() => {
                if (isEditingPersonal) submitChanges();
                setIsEditingPersonal(!isEditingPersonal);
              }}
            >
              {isEditingPersonal ? <AiOutlineCheck /> : <AiOutlineEdit />}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Phone</p>
              {isEditingPersonal ? (
                <input
                  type="text"
                  name="phone"
                  value={personalInfo.phone}
                  onChange={handlePersonalChange}
                  className="border-2 border-gray-300 rounded-md p-1 w-full"
                />
              ) : (
                <p className="font">{personalInfo.phone}</p>
              )}
            </div>
            <div>
              <p className="text-gray-600">Student ID</p>
              <p className="font">{personalInfo.studentId}</p>
            </div>
            <div>
              <p className="text-gray-600">Bio</p>
              {isEditingPersonal ? (
                <input
                  type="text"
                  name="bio"
                  value={personalInfo.bio}
                  onChange={handlePersonalChange}
                  className="border-2 border-gray-300 rounded-md p-1 w-full"
                />
              ) : (
                <p className="font">{personalInfo.bio}</p>
              )}
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="mb-6 border-2 border-gray-300 px-4 py-2">
          <div className="flex justify-between">
            <h2 className="tex mb-2">Address</h2>
            <button
              className="border-2 border-black text-2xl"
              onClick={() => {
                if (isEditingAddress) submitChanges();
                setIsEditingAddress(!isEditingAddress);
              }}
            >
              {isEditingAddress ? <AiOutlineCheck /> : <AiOutlineEdit />}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(addressInfo).map((key) => (
              <div key={key}>
                <p className="text-gray-600 capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </p>
                {isEditingAddress ? (
                  <input
                    type="text"
                    name={key}
                    value={(addressInfo as any)[key]}
                    onChange={handleAddressChange}
                    className="border-2 border-gray-300 rounded-md p-1 w-full"
                  />
                ) : (
                  <p className="font">{(addressInfo as any)[key]}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
