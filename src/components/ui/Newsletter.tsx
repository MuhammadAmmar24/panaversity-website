// components/Newsletter.tsx
import React from "react";

const Newsletter: React.FC = () => {
  return (
    <div className="">
      <h3 className="font-semibold mb-2 text-white text-lg">
        Join Our Newsletter
      </h3>
      <div className="flex items-center relative space-x-2">
        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter email address"
          className="bg-transparent border-b border-gray-500 text-sm p-2 w-[85%] text-gray-300 focus:outline-none"
        />
        {/* Submit Button */}
        <button
          className="bg-green-600 absolute right-0 hover:bg-green-500 text-white rounded-full p-2 transition-all"
          aria-label="Submit Email"
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
      <p className="mt-4 text-gray-400">
        We will send you daily updates about the tech.
      </p>
    </div>
  );
};

export default Newsletter;
