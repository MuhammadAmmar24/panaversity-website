import EmailVerificationPending from "@/src/components/auth/verify/pendingverification";
import Footer from "@/src/components/Footer/Footer";
import Navbar from "@/src/components/Navbar/Navbar";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Verify Email",
  description: `Verify your email address to activate your Panaversity account and unlock access to cutting-edge Generative AI and cloud-native courses`,
};

const page = () => {
  return (
    <>
      <Navbar />
      <div className="flex min-h-[85vh] items-center justify-center">
        <div className="w-[300px] rounded-lg bg-white p-2 py-8 shadow-md mobileM:w-[350px] xs:w-[400px] md:w-[400px]">
          <Suspense>
            <EmailVerificationPending />
          </Suspense>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
