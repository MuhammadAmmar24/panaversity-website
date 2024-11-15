import { CardWrapper } from "@/src/components/auth/card-wrapper";
import ResendLink from "@/src/components/auth/resend-link/resendLink";
import Footer from "@/src/components/Footer/Footer";
import Navbar from "@/src/components/Navbar/Navbar";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Resend Email",
  description: `Verify your email address to activate your Panaversity account and unlock access to cutting-edge Generative AI and cloud-native courses`,
};

const page = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-[85vh]">
        <CardWrapper headerLabel="Verify Your Email">
          <div className="p-4">
            <ResendLink />
          </div>
        </CardWrapper>
      </div>
      <Footer />
    </>
  );
};

export default page;
