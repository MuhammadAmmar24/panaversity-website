import PaymentSuccess from "@/src/components/payment/payment-success";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Payment Success",
  description: `Your payment was successful. Thank you for enrolling in Panaversity's Generative AI courses. We look forward to helping you master AI-powered technologies and advance your skills.`,
};

const page = () => {
  return (
    <div className="mt-[-4rem] flex min-h-[85vh] items-center justify-center px-[1rem]">
      <div className="rounded-xl bg-white p-4 shadow-md sm:p-8">
        <Suspense>
          <PaymentSuccess />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
