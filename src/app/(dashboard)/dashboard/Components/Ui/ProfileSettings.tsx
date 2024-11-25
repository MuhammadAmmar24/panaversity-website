"use client";
import { update_student_Profile } from "@/src/app/actions/profile";
import { addressSchema } from "@/src/lib/schemas/addressInfo";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { ZodError } from "zod";
import PasswordSettings from "./PasswordSettings";
import { Input } from "@/src/components/ui/input";

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

  const labels: Record<keyof AddressInfo, string> = {
    address: "Address",
    city: "City",
    country: "Country",
    postalCode: "Postal Code",
  };

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
          {},
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
      handleCancel();
    } else {
      setIsEditingAddress(true);
      if (isEditingPassword) setIsEditingPassword(false);
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
    <div className="mx-auto py-8">
      <div className="mx-auto overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="bg-gray-100 p-6 sm:p-8">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
            <Image
              src="/profile.webp"
              alt="Profile image"
              width={80}
              height={80}
              className="h-20 w-20 rounded-full border-2 border-gray-300 object-cover"
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
          <section className="mb-8 w-full border-b pb-6">
            <h2 className="mb-6 pr-4 text-lg font-semibold leading-6 text-gray-900 mobileM:pr-0 md:text-xl">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:gap-x-16">
              <div>
                <p className="font-medium capitalize text-gray-700">Phone</p>
                <p className="pt-2 text-sm text-gray-800">
                  +{personalInfo.phone}
                </p>
              </div>
              <div>
                <p className="font-medium capitalize text-gray-700">
                  Student ID
                </p>
                <p className="pt-2 text-sm text-gray-800">
                  {personalInfo.studentId ? personalInfo.studentId.substring(0, 5) : "-"}
                </p>
              </div>
            </div>
          </section>
          <section className="mt-8 w-full">
            <div className="mb-6 flex items-center justify-between gap-x-0.5 mobileM:gap-x-0">
              <h2 className="text-lg font-semibold leading-6 text-gray-900 md:text-xl">
                Address Information
              </h2>
              <button
                className="text-gray-600 transition-colors duration-200 hover:text-gray-800"
                onClick={handleAddressEdit}
              >
                {isEditingAddress ? (
                  <AiOutlineClose className="text-lg" />
                ) : (
                  <AiOutlineEdit className="text-lg" />
                )}
              </button>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:gap-x-16">
              {(Object.keys(addressInfo) as Array<keyof AddressInfo>).map(
                (field) => (
                  <div key={field} className="space-y-2">
                    <label className="text-md block font-medium capitalize text-gray-700">
                      {labels[field]}
                    </label>
                    {isEditingAddress ? (
                      <div className="relative">
                        <Input
                          type="text"
                          name={field}
                          value={addressInfo[field]}
                          onChange={handleAddressChange}
                          className="w-full rounded-md border border-gray-300 px-3 py-1 shadow-sm transition duration-150 ease-in-out focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-200"
                        />
                        {errors[field] && (
                          <p className="text-md mt-1 text-red-600">
                            {errors[field]}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-800">
                        {addressInfo[field] || "-"}
                      </p>
                    )}
                  </div>
                ),
              )}
            </div>
            {isEditingAddress && (
              <div className="mt-8 flex justify-start">
                <button
                  onClick={submitChanges}
                  className="w-full rounded-md bg-accent py-2 text-sm font-medium text-white transition duration-150 ease-in-out hover:bg-green-600 xl:w-[calc(50%-2.05rem)]"
                >
                  Save
                </button>
              </div>
            )}
          </section>
          {statusMessage && (
            <div
              className={`mt-6 rounded-md p-4 ${statusMessage.includes("Error")
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