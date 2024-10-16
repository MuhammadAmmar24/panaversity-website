import ResendLinkDialog from "@/src/components/auth/resend-link/resendLink-dialog";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <ResendLinkDialog />
    </Suspense>
  );
};

export default page;
