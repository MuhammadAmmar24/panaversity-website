"use client";
import { update_student_Profile } from "@/src/app/actions/profile";
import { addressSchema } from "@/src/lib/schemas/addressInfo";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineEdit} from "react-icons/ai";
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

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (statusMessage && !statusMessage.includes("Error")) {
      timer = setTimeout(() => {
        setStatusMessage(null);
      }, 3000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [statusMessage]);

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

  const handleAddressEdit = () => {
    if (isEditingAddress) {
      // If already editing, cancel the edit
      handleCancel();
    } else {
      // If not editing, start editing
      setIsEditingAddress(true);
      if (isEditingPassword) setIsEditingPassword(false);
    }
  };

  const handleSaveChanges = async () => {
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
    <div className="container mx-auto px-4 py-8">
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Profile header */}
      <div className="bg-gray-100 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Image
            src="/profile.png"
            alt="Profile"
            width={80}
            height={80}
            className="rounded-full border-2 border-gray-300"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900">
              {profile?.full_name}
            </h1>
            <p className="text-gray-600">{profile?.email}</p>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {/* Personal Information */}
      <section className="mb-8">
            <h2 className="text-xl font-semibold mb-6 text-gray-900">Personal Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-700 capitalize font-medium">Phone</p>
                <p className="text-gray-800 pt-2 text-sm">+{personalInfo.phone}</p>
              </div>
              <div>
                <p className="text-gray-700 capitalize font-medium">Student ID</p>
                <p className="text-gray-800 pt-2 text-sm">{personalInfo.studentId || "-"}</p>
              </div>
            </div>
          </section>
        {/* Address Information section */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Address Information</h2>
            <button
              className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
              onClick={handleAddressEdit}
            >
              {isEditingAddress ? (
                <AiOutlineClose className="text-lg" />
              ) : (
                <AiOutlineEdit className="text-lg" />
              )}
            </button>
          </div>

          {/* Address fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(Object.keys(addressInfo) as Array<keyof AddressInfo>).map(
              (field) => (
                <div key={field} className="space-y-2">
                  <label className="block text-md font-medium text-gray-700 capitalize">
                    {field}
                  </label>
                  {isEditingAddress ? (
                    <div>
                      <input
                        type="text"
                        name={field}
                        value={addressInfo[field]}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition duration-150 ease-in-out"
                      />
                      {errors[field] && (
                        <p className="mt-1 text-md text-red-600">
                          {errors[field]}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-800 text-sm">
                      {addressInfo[field] || "-"}
                    </p>
                  )}
                </div>
              )
            )}
          </div>

          {/* Address edit buttons */}
          {isEditingAddress && (
            <div className="mt-6 flex justify-start">
              <button
                onClick={submitChanges}
                className="w-full py-2 text-sm font-medium bg-accent text-white rounded-md transition duration-150 ease-in-out"
              >
                Save
              </button>
            </div>
          )}
        </section>

        {/* Status message */}
        {statusMessage && (
          <div
            className={`p-4 rounded-md ${
              statusMessage.includes("Error")
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {statusMessage}
          </div>
        )}
        
        {/* Password Settings */}
        {profile?.email && <PasswordSettings profile_email={profile.email} />}
      </div>
    </div>
  </div>
  );
};

export default ProfileSettings;
