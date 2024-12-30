"use client";
import Link from "next/link";
import { ImCancelCircle } from "react-icons/im";

const PaymentFailed = () => {
  return (
    <div className="w-full max-w-sm pb-5 text-center sm:pb-1">
      <div className="mb-8   flex justify-center">
        <div className="rounded-full bg-white p-4">
          <ImCancelCircle size={60} className="text-red-500" />
        </div>
      </div>
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">
        Payment Failed
      </h2>
      <p className="mb-8 text-gray-600">We're sorry, but your payment did not go through. Please try again or use a different payment method.</p>
      <Link
        href={"/dashboard"}
        aria-label="Go to dashboard"
        className="w-full rounded-xl bg-accent px-8 py-3 text-center font-medium text-white hover:bg-[#18c781]"
      >
        Continue to Dashboard
      </Link>
    </div>
  );
};

export default PaymentFailed;
