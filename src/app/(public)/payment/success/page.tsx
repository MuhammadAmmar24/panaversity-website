import PaymentSuccess from "@/src/components/payment/payment-success";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Payment Success",
  description: `Your payment was successful. Thank you for enrolling in Panaversity's Generative AI courses. We look forward to helping you master AI-powered technologies and advance your skills.`,
};

const page = () => {
  return (
    <div className="flex justify-center mt-[-4rem] items-center px-[1rem] min-h-[85vh]">
      <div className="bg-white p-4  sm:p-8 rounded-xl shadow-md ">
        <Suspense>
          <PaymentSuccess />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
