import PaymentFailed from "@/src/components/payment/payment-failed";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Payment Failed",
  description: `Unfortunately, your payment was not successful. Please try again or contact Panaversity support for assistance with enrolling in our Agentic AI courses.`,
};

const page = () => {
  return (
    <div className="mt-[-4rem] flex min-h-[85vh] items-center justify-center px-[1rem]">
      <div className="rounded-xl bg-white p-4 shadow-md sm:p-8">
        <Suspense>
          <PaymentFailed />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
