import EmailVerificationPendingDialog from "@/src/components/auth/verify/pendingverification-dialog";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <EmailVerificationPendingDialog />
    </Suspense>
  );
};

export default page;
