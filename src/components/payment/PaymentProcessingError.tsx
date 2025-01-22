"use client";
import revalidateDashboard from "@/src/lib/revalidateDashboard";
import Link from "next/link";
import { useEffect } from "react";
import { ImCancelCircle } from "react-icons/im";

const PaymentProcessingError = () => {
  useEffect(() => {
    revalidateDashboard("fetchStudentCourses");
  }, []);

  return (
    <div className="w-full max-w-sm pb-5 text-center sm:pb-2">
      <div className="mb-4 flex justify-center">
        <div className="rounded-full bg-white p-4">
          <ImCancelCircle size={60} className="text-red-500" />
        </div>
      </div>
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">
      Payment Processing Error
      </h2>
      <p className="mb-8 text-gray-600">
        We’re unable to process the payment right now. If you don’t receive a
        confirmation email within 24 hours, please contact support.
      </p>
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

export default PaymentProcessingError;
