"use client";
import revalidateDashboard from "@/src/lib/revalidateDashboard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoCheckCircleFill } from "react-icons/go";
import { ImCancelCircle } from "react-icons/im";

const PaymentStatus = () => {
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // async function fetchStatus() {
    //   try {
    //     const res = await fetch("/api/payment/status", {
    //       method: "GET",
    //     });

    //     if (res.ok) {
    //       const data = await res.json();
    //       setPaymentStatus(data.status);
    //       revalidateDashboard("fetchStudentCourses");
    //     } else {
    //       const errorData = await res.json();
    //       setError(errorData.error || "Access Denied");
    //     }
    //   } catch (err) {
    //     setError("An error occurred while validating the request.");
    //   }
    // }

    // fetchStatus();
    revalidateDashboard("fetchStudentCourses");
  }, []);

  // if (paymentStatus === null || error) {
  //   return (
  //     <div className="w-full max-w-sm pb-5 text-center sm:pb-2">
  //       <div className="mb-4 flex justify-center">
  //         <div className="rounded-full bg-white p-4">
  //           {/* <OctagonMinus size={48} className="text-[8rem] text-red-500" /> */}
  //           <ImCancelCircle size={60} className="text-red-500" />
  //         </div>
  //       </div>
  //       <h2 className="mb-4 text-2xl font-semibold text-gray-800">
  //         Payment Error
  //       </h2>
  //       <p className="mb-8 text-gray-600">
  //         Invalid payment or missing information. Please try again.
  //       </p>
  //       <Link
  //         href={"/dashboard"}
  //         aria-label="Go to dashboard"
  //         className="w-full rounded-xl bg-accent px-8 py-3 text-center font-medium text-white hover:bg-[#18c781]"
  //       >
  //         Continue to Dashboard
  //       </Link>
  //     </div>
  //   );
  // }

  // if (paymentStatus === "success") {
    return (
      <div className="w-full max-w-sm pb-5 text-center sm:pb-2">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-white p-4">
            <GoCheckCircleFill className="text-[5rem] text-accent" />
          </div>
        </div>
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Payment Successful 🎉
        </h2>
        <p className="mb-8 text-gray-600">
          Payment Confirmed! Head to your dashboard to unlock your journey to{" "}
          <strong>Agentic AI</strong>.
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
  // }

  // if (paymentStatus === "failure") {
  //   return (
  //     <div className="w-full max-w-sm pb-5 text-center sm:pb-1">
  //       <div className="mb-8 flex justify-center">
  //         <div className="rounded-full bg-white p-4">
  //           <ImCancelCircle size={60} className="text-red-500" />
  //         </div>
  //       </div>
  //       <h2 className="mb-4 text-2xl font-semibold text-gray-800">
  //         Payment Failed
  //       </h2>
  //       <p className="mb-8 text-gray-600">Your payment has Failed.</p>
  //       <Link
  //         href={"/dashboard"}
  //         aria-label="Go to dashboard"
  //         className="w-full rounded-xl bg-accent px-8 py-3 text-center font-medium text-white hover:bg-[#18c781]"
  //       >
  //         Continue to Dashboard
  //       </Link>
  //     </div>
  //   );
  // }
};

export default PaymentStatus;
