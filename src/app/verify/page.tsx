import EmailVerificationPending from "@/src/components/auth/verify/pendingverification";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md ">
        <Suspense>
          <EmailVerificationPending />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
