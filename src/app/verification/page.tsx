import Verify from "@/src/components/auth/verification/verify-user";
import Footer from "@/src/components/Footer/Footer";
import Navbar from "@/src/components/Navbar/Navbar";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Verify Account",
  description: `Please wait while we verify your account. This process ensures secure access to your AI-powered learning dashboard and courses. If the verification fails, you can re-initiate the process.`,
};

const verification = () => {
  return (
    <>
      <Navbar />
      <div className="flex min-h-[85vh] items-center justify-center">
        <div className="w-[300px] rounded-lg bg-white shadow-md mobileM:w-[350px] xs:w-[400px] md:w-[400px]">
          <Suspense>
            <Verify />
          </Suspense>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default verification;
