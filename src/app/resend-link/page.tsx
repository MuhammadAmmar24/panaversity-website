import ResendLink from "@/src/components/auth/resend-link/resendLink";
import React, { Suspense } from "react";
import type { Metadata } from "next";
import { CardWrapper } from "@/src/components/auth/card-wrapper";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";



export const metadata: Metadata = {
  title: "Resend Email",
  description: `Verify your email address to activate your Panaversity account and unlock access to cutting-edge Generative AI and cloud-native courses`
};

const page = () => {
  return (
    <>
    <Navbar />
    <div className="flex justify-center items-center min-h-screen">
    <Suspense>
      <CardWrapper headerLabel="Verify Your Email">
        <ResendLink />
      </CardWrapper>
    </Suspense>
  </div>
  <Footer />
  </>
  );
};

export default page;
