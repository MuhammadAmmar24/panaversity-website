import Verify from "@/src/components/auth/verification/verify-user";
import React, { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer/Footer";


export const metadata: Metadata = {
  title: "Verify Account",
  description: `Please wait while we verify your account. This process ensures secure access to your AI-powered learning dashboard and courses. If the verification fails, you can re-initiate the process.`
};

const verification = () => {
  return (
    <>
    <Navbar />
    <div className="flex justify-center items-center min-h-[85vh] ">
      <div className="bg-white  rounded-lg shadow-md w-[300px] mobileM:w-[350px] xs:w-[400px] md:w-[400px] ">
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
