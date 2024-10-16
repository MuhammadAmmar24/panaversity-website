"use client"
import React, { useState, ChangeEvent } from "react";
import { AiOutlineEdit, AiOutlineCheck } from "react-icons/ai";
import Image from "next/image";
import { update_student_Profile } from "@/src/app/actions/profile";
import { addressSchema } from "@/src/lib/schemas/addressInfo";
import { ZodError } from "zod";
import PasswordSettings from "./PasswordSettings";

interface Profile {
  phone?: string;
  id?: string;
  full_name?: string;
  email?: string;
  student?: {
    address?: string;
    city?: string;
    country?: string;
    postal_code?: string;
    is_active?: boolean;
  };
}

interface AddressInfo {
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

interface Errors {
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

const ProfileSettings: React.FC<{ profile: Profile }> = ({ profile }) => {
  const [personalInfo] = useState({
    phone: profile?.phone || "",
    studentId: profile?.id || "",
  });

  const [addressInfo, setAddressInfo] = useState<AddressInfo>({
    address: profile?.student?.address || "",
    city: profile?.student?.city || "",
    country: profile?.student?.country || "",
    postalCode: profile?.student?.postal_code || "",
  });

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({
    address: "",
    city: "",
    country: "",
    postalCode: "",
  });

  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressInfo((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateAddress = () => {
    try {
      addressSchema.parse(addressInfo);
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors = error.errors.reduce<Partial<Errors>>(
          (acc, currError) => {
            if (typeof currError.path[0] === "string") {
              acc[currError.path[0] as keyof Errors] = currError.message;
            }
            return acc;
          },
          {}
        );
        setErrors((prev) => ({ ...prev, ...fieldErrors }));
      }
      return false;
    }
  };

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
      setStatusMessage(`Error updating profile: ${result.message}`);
    }
  };

  const handleAddressEditToggle = () => {
    setIsEditingAddress(!isEditingAddress);
    if (isEditingPassword) setIsEditingPassword(false);
  };

  const handlePasswordEditToggle = () => {
    setIsEditingPassword(!isEditingPassword);
    if (isEditingAddress) setIsEditingAddress(false);
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
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Profile header */}
        <div className="bg-gradient-to-r from-accent to-[#1a8e5c] p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-center space-x-4">
            <Image
              src="/profile.png"
              alt="Profile"
              width={80}
              height={80}
              className="rounded-full border-4 border-white"
            />
            <div>
              <h1 className="text-2xl font-bold text-white">
                {profile?.full_name}
              </h1>
              <p className="text-blue-100">{profile?.email}</p>
            </div>
          </div>
        </div>

        <div className="py-6 px-3 sm:p-8">
          {/* Personal Information section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 font-medium">Phone</p>
                <p className="text-gray-800">+{personalInfo.phone}</p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">Student ID</p>
                <p className="text-gray-800">{personalInfo.studentId || "-"}</p>
              </div>
            </div>
          </section>

          {/* Address Information section */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Address Information</h2>
              <button
                className="text-accent transition-colors duration-200"
                onClick={handleAddressEditToggle}
              >
                {isEditingAddress ? (
                  <AiOutlineCheck className="text-2xl" />
                ) : (
                  <AiOutlineEdit className="text-2xl" />
                )}
              </button>
            </div>

            {/* Address fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {(Object.keys(addressInfo) as Array<keyof AddressInfo>).map(
                (field) => (
                  <div key={field}>
                    <p className="text-gray-600  font-medium capitalize">
                      {field}
                    </p>
                    {isEditingAddress ? (
                      <div>
                        <input
                          type="text"
                          name={field}
                          value={addressInfo[field]}
                          onChange={handleAddressChange}
                          className="mt-1 p-1 sm:p-[6px] pl-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-accent sm:text-sm"
                        />
                        {errors[field] && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors[field]}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-800">
                        {addressInfo[field] || "-"}
                      </p>
                    )}
                  </div>
                )
              )}
            </div>

            {/* Address edit buttons */}
            {isEditingAddress && (
              <div className="mt-6 flex items-center justify-end space-x-3">
                <button
                  onClick={handleCancel}
                  className="h-9 w-full py-2 px-4 border border-gray-400 rounded-md shadow-sm text-white bg-accent hover:bg-[#1a8e5c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a8e5c]"
                >
                  Cancel
                </button>
                <button
                  onClick={submitChanges}
                  className="h-9 w-full py-2 px-4 border border-gray-400 rounded-md shadow-sm text-white bg-accent hover:bg-[#1a8e5c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a8e5c]"
                >
                  Save Changes
                </button>
              </div>
            )}
          </section>

          {/* Status message */}
          {statusMessage && (
            <div
              className={`text-center p-3 rounded ${
                statusMessage.includes("Error")
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {statusMessage}
            </div>
          )}
          {profile?.email && <PasswordSettings profile_email={profile.email} />}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
