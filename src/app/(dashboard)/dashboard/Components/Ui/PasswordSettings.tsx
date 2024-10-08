"use client";
import { useState, useEffect, useRef } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import * as z from "zod";

// Mock current password for demonstration purposes
const mockCurrentPassword = "123";

// Define schema for password validation using Zod
const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Path to indicate where the error occurred
  });

const PasswordSettings: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Toggle for the password settings dropdown
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  }); // Toggle for showing/hiding password fields

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  }); // Form data state

  const [formErrors, setFormErrors] = useState<Record<string, string>>({}); // Form errors state
  const [isCurrentPasswordIncorrect, setIsCurrentPasswordIncorrect] =
    useState(false); // State for tracking incorrect current password

  const formRef = useRef<HTMLDivElement | null>(null); // Ref to scroll into view when dropdown opens

  // Toggle visibility for password fields
  const toggleShowPassword = (
    field: "currentPassword" | "newPassword" | "confirmPassword"
  ) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  // Scroll into view when the dropdown opens
  useEffect(() => {
    if (isOpen && formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isOpen]);

  // Handle input changes and update formData state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission with validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the current password matches mock data
    if (formData.currentPassword !== mockCurrentPassword) {
      setIsCurrentPasswordIncorrect(true); // Show error if password is incorrect
    } else {
      setIsCurrentPasswordIncorrect(false);

      // Validate form data using Zod
      try {
        passwordSchema.parse(formData); // Validate with Zod
        setFormErrors({}); // Clear errors if validation passes
        // Here you can handle the actual password update logic
      } catch (error) {
        if (error instanceof z.ZodError) {
          // Capture and display validation errors
          const errors: Record<string, string> = {};
          error.errors.forEach((err) => {
            if (err.path[0]) {
              errors[err.path[0]] = err.message;
            }
          });
          setFormErrors(errors);
        }
      }
    }
  };

  return (
    <section className="relative">
      {/* Button to toggle dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full bg-white border border-gray-300 rounded-md p-3 sm:p-4 shadow-sm hover:shadow-lg focus:outline-none transition-all duration-300 ease-in-out"
      >
        <span className="text-gray-800 font-semibold">Password Settings</span>
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

      {/* Password form (shown when isOpen is true) */}
      {isOpen && (
        <div className="flex justify-center items-center">
          <div
            ref={formRef}
            className="mt-8 rounded-lg shadow-md p-4 sm:p-6 w-full max-w-xl"
          >
            <form onSubmit={handleSubmit}>
              <div className="mb-4 sm:mb-6">
                <label className="block text-sm sm:text-base font-medium text-gray-700">
                  Change your password
                </label>
              </div>

              {/* Current Password Field */}
              <div className="space-y-4">
                <div>
                  <label className="text-gray-700 text-sm sm:text-base">
                    Current Password
                  </label>
                  <div className="relative mt-2">
                    <input
                      type={showPassword.currentPassword ? "text" : "password"}
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      className="focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent w-full border border-gray-300 rounded-md p-2 pr-10 text-sm sm:text-base"
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
                  {isCurrentPasswordIncorrect && (
                    <p className="text-sm text-red-500">
                      Current password is incorrect
                    </p>
                  )}
                  {isCurrentPasswordIncorrect && (
                    <a
                      href="#"
                      className="text-sm text-red-500 mt-1 inline-block"
                    >
                      Forgot Password?
                    </a>
                  )}
                </div>

                {/* New Password Field */}
                <div>
                  <label className="text-gray-700 text-sm sm:text-base">
                    New Password
                  </label>
                  <div className="relative mt-2">
                    <input
                      type={showPassword.newPassword ? "text" : "password"}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent w-full border border-gray-300 rounded-md p-2 pr-10 text-sm sm:text-base"
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
                  {formErrors.newPassword && (
                    <p className="text-sm text-red-500">
                      {formErrors.newPassword}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label className="text-gray-700 text-sm sm:text-base">
                    Confirm Password
                  </label>
                  <div className="relative mt-2">
                    <input
                      type={showPassword.confirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent w-full border border-gray-300 rounded-md p-2 pr-10 text-sm sm:text-base"
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
                  {formErrors.confirmPassword && (
                    <p className="text-sm text-red-500">
                      {formErrors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button className="w-full bg-accent text-white rounded-md py-2 text-sm sm:text-base hover:bg-white hover:text-accent border-2 border-accent transition-all duration-300 ease-in-out">
                  Set Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default PasswordSettings;
