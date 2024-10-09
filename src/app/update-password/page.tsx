import React, { Suspense } from "react";
import UpdatePassword from "@/src/components/auth/update-password/update-password";
import { CardWrapper } from "@/src/components/auth/card-wrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Password",
  description: `Update your Panaversity account password for enhanced security. Keep your account safe and stay connected to your AI learning journey.`
};

const updatePassword = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Suspense>
        <CardWrapper headerLabel="Update Password">
          <UpdatePassword />
        </CardWrapper>
      </Suspense>
    </div>
  );
};

export default updatePassword;
