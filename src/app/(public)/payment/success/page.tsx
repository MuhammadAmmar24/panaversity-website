import PaymentSuccess from "@/src/components/payment/payment-success";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div className="flex justify-center mt-[-4rem] items-center px-[1rem] min-h-screen">
      <div className="bg-white p-4  sm:p-8 rounded-xl shadow-md ">
        <Suspense>
          <PaymentSuccess />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
