import VerificationDialog from "@/src/components/auth/verification/verify-dialog";
import { Suspense } from "react";

const verification = () => {
  return (
    <Suspense>
      <VerificationDialog />
    </Suspense>
  );
};

export default verification;
