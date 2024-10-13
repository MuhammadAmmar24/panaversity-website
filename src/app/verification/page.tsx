import Verify from "@/src/components/auth/verification/verify-user";
import React, { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";


export const metadata: Metadata = {
  title: "Verify Account",
  description: `Please wait while we verify your account. This process ensures secure access to your AI-powered learning dashboard and courses. If the verification fails, you can re-initiate the process.`
};

const verification = () => {
  return (
    <>
    <Navbar />
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white  rounded-lg shadow-md ">
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
