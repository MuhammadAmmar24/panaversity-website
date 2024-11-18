// components/Newsletter.tsx
import React from "react";

const Newsletter: React.FC = () => {
  return (
    <div className="">
      <h3 className="mb-2 text-lg font-semibold text-white">
        Join Our Newsletter
      </h3>
      <div className="relative flex items-center space-x-2">
        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter email address"
          className="w-[85%] border-b border-gray-500 bg-transparent p-2 text-sm text-gray-300 focus:outline-none"
          disabled
        />
        {/* Submit Button */}
        <button
          className="absolute right-0 cursor-not-allowed rounded-full bg-gray-600 p-2 text-gray-400 transition-all"
          // className="bg-green-600 absolute right-0 hover:bg-green-500 text-white rounded-full p-2 transition-all"
          aria-label="Submit Email"
          disabled
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
      {/* <p className="mt-4 text-gray-400">
        We will send you daily updates about the tech.
      </p> */}
      <p className="mt-4 text-gray-400">
        Our newsletter is coming soon! Stay tuned for updates.
      </p>
    </div>
  );
};

export default Newsletter;
