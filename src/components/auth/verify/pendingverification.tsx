"use client";
import Link from "next/link";

import { FaClock } from "react-icons/fa6";

const EmailVerificationPending = () => {
  return (
    <div className="w-full max-w-sm text-center">
      <div className="mb-4 flex justify-center">
        <div className="rounded-full bg-yellow-100 p-4">
          <FaClock className="text-3xl text-yellow-600" />
        </div>
      </div>
      <h2 className="mb-2 text-2xl font-semibold text-gray-800">
        Email Verification Pending
      </h2>
      <p className="mb-4 text-gray-600">
        We have sent an email for verification. Follow the instructions in the
        email for logging into your account.
      </p>
      <Link
        href="/resend-link"
        aria-label="Click to resend link"
        replace
        className="w-full rounded-md bg-accent px-9 py-3 text-center font-medium text-white hover:bg-[#18c781]"
      >
        Send Email Again
      </Link>
    </div>
  );
};

export default EmailVerificationPending;
