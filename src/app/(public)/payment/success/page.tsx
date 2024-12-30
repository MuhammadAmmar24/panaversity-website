import PaymentStatusSkeleton from "@/src/components/payment/PaymentStatusSkeleton";
import PaymentSuccess from "@/src/components/payment/PaymentSuccess";
import { Suspense } from "react";


const page = () => {
  return (
    <div className="mt-[-4rem] flex min-h-[85vh] items-center justify-center px-[1rem]">
      <div className="rounded-xl bg-white p-4 shadow-md sm:p-8">
        <Suspense fallback={<PaymentStatusSkeleton />}>
          <PaymentSuccess />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
