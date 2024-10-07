import Verify from "@/src/components/auth/verification/verify-user";
import React, { Suspense } from "react";

const verification = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white  rounded-lg shadow-md ">
        <Suspense>
          <Verify />
        </Suspense>
      </div>
    </div>
  );
};

export default verification;
