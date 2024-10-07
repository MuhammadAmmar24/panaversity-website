import React, { Suspense } from "react";
import UpdatePassword from "@/src/components/auth/update-password/update-password";
import { CardWrapper } from "@/src/components/auth/card-wrapper";

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
