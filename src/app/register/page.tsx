import { RegisterFormPage } from "@/src/components/auth/register/register-page";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: `Join Panaversity today! Create your account to start learning with our cutting-edge Generative AI courses and become part of a global learning community.`
};

const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Suspense>
        <RegisterFormPage />
      </Suspense>
    </div>
  );
};

export default RegisterPage;
