import PaymentFailed from "@/src/components/payment/payment-failed";
import React, { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Failed",
  description: `Unfortunately, your payment was not successful. Please try again or contact Panaversity support for assistance with enrolling in our Generative AI courses.`
};

const page = () => {
  return (
    <div className="flex justify-center mt-[-4rem] items-center px-[1rem] min-h-screen">
      <div className="bg-white p-4  sm:p-8 rounded-xl shadow-md ">
        <Suspense>
          <PaymentFailed />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
