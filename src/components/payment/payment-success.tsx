"use client";
import revalidateDashboard from "@/src/lib/revalidateDashboard";
import Link from "next/link";
import { useEffect } from "react";
import { GoCheckCircleFill } from "react-icons/go";

const PaymentSuccess = () => {
  useEffect(() => {
    revalidateDashboard("fetchStudentCourses");
  }, []);

  return (
    <div className="w-full max-w-sm pb-5 text-center sm:pb-2">
      <div className="mb-4 flex justify-center">
        <div className="rounded-full bg-white p-4">
          <GoCheckCircleFill className="text-[5rem] text-accent" />
        </div>
      </div>
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">
        Payment Successfull
      </h2>
      <p className="mb-8 text-gray-600">
        Your payment is confirmed. You can now access your dashboard.
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

export default PaymentSuccess;
