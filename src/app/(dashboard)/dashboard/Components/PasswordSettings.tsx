"use client";

import { useState, useEffect, useRef } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi"; // React icons for eye toggle

const PasswordSettings: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Control dropdown
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const formRef = useRef<HTMLDivElement | null>(null); // Reference to the form

  // Toggle password visibility
  const toggleShowPassword = (
    field: "currentPassword" | "newPassword" | "confirmPassword"
  ) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  // Scroll to form when dropdown is opened
  useEffect(() => {
    if (isOpen && formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isOpen]);

  return (
    <div className="relative">
      {/* Button to toggle dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full bg-white border border-gray-300 rounded-md p-4 shadow-sm hover:shadow-lg focus:outline-none"
      >
        <span className="text-gray-800 font-semibold">Password Setting</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Form */}
      {isOpen && (
        <>
          <div
            ref={formRef}
            className="mt-4 rounded-lg shadow-md p-6 w-full max-w-xl mx-auto"
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Change your password
              </label>
            </div>

            {/* Password Input Fields */}
            <div className="space-y-4">
              <div>
                <label className="text-gray-700">Password</label>
                <div className="relative mt-1">
                  <input
                    type={showPassword.currentPassword ? "text" : "password"}
                    className="w-full border border-gray-300 rounded-md p-2 pr-10"
                    placeholder="Enter current password"
                  />
                  <span
                    onClick={() => toggleShowPassword("currentPassword")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  >
                    {showPassword.currentPassword ? (
                      <FiEye className="h-5 w-5 text-gray-500" />
                    ) : (
                        <FiEyeOff className="h-5 w-5 text-gray-500" />
                    )}
                  </span>
                </div>
                <a href="#" className="text-sm text-red-500 mt-1 inline-block">
                  Forget Password
                </a>
              </div>

              <div>
                <label className="text-gray-700">New Password</label>
                <div className="relative mt-1">
                  <input
                    type={showPassword.newPassword ? "text" : "password"}
                    className="w-full border border-gray-300 rounded-md p-2 pr-10"
                    placeholder="Enter new password"
                  />
                  <span
                    onClick={() => toggleShowPassword("newPassword")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  >
                    {showPassword.newPassword ? (
                        <FiEye className="h-5 w-5 text-gray-500" />
                    ) : (
                        <FiEyeOff className="h-5 w-5 text-gray-500" />
                    )}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-gray-700">Confirm Password</label>
                <div className="relative mt-1">
                  <input
                    type={showPassword.confirmPassword ? "text" : "password"}
                    className="w-full border border-gray-300 rounded-md p-2 pr-10"
                    placeholder="Confirm new password"
                  />
                  <span
                    onClick={() => toggleShowPassword("confirmPassword")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  >
                    {showPassword.confirmPassword ? (
                        <FiEye className="h-5 w-5 text-gray-500" />
                    ) : (
                        <FiEyeOff className="h-5 w-5 text-gray-500" />
                    )}
                  </span>
                </div>
              </div>

              {/* Set Password Button */}
              <button className="w-full bg-accent text-white rounded-full py-2 hover:bg-white hover:text-accent border-2 border-accent transition-colors">
                Set Password
              </button>

              {/* Delete Account Button */}
              <div className="mt-6">
                <button className="w-full flex items-center justify-center border border-red-500 text-red-500 rounded-full py-2 hover:bg-red-100 transition-colors">
                  Delete My Account
                </button>
                <p className="text-sm text-red-500 text-center mt-2">
                  Remove your account, profile, and content from our platform.
                  This action is irreversible.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PasswordSettings;
