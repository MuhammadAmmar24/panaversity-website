import { LoginFormPage } from "@/src/components/auth/login/login-page";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: `Access your Panaversity account. Login to manage your courses, track your learning progress, and stay connected with the latest AI-powered learning opportunities.`
};

const LoginPage = () => {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <Suspense>
          <LoginFormPage />
        </Suspense>
      </div>
    </>
  );
};

export default LoginPage;
