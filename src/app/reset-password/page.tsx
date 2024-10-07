import React, { Suspense } from "react";
import ResetPassword from "@/src/components/auth/reset-password/reset-password";
import { CardWrapper } from "@/src/components/auth/card-wrapper";

const resetPassword = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Suspense>
        <CardWrapper headerLabel="Reset Password">
          <ResetPassword />
        </CardWrapper>
      </Suspense>
    </div>
  );
};

export default resetPassword;
