import EmailVerificationPending from "@/src/components/auth/verify/pendingverification";
import React, { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";


export const metadata: Metadata = {
  title: "Verify Email",
  description: `Verify your email address to activate your Panaversity account and unlock access to cutting-edge Generative AI and cloud-native courses`
};

const page = () => {
  return (
    <>
    <Navbar />
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md ">
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
