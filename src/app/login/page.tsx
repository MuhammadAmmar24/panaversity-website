import { LoginFormPage } from "@/src/components/auth/login/login-page";
import Footer from "@/src/components/Footer/Footer";
import Navbar from "@/src/components/Navbar/Navbar";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Login",
  description: `Access your Panaversity account. Login to manage your courses, track your learning progress, and stay connected with the latest AI-powered learning opportunities.`,
};

const LoginPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <div className="flex flex-col justify-center items-center min-h-[85vh]">
          <div className="mt-10 mb-20">
              <LoginFormPage />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LoginPage;
