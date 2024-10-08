import React, { Suspense } from "react";
import ResetPassword from "@/src/components/auth/reset-password/reset-password";
import { CardWrapper } from "@/src/components/auth/card-wrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
  description: `Forgot your password? Reset your Panaversity account password securely to regain access to your learning dashboard and courses.`
};

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
