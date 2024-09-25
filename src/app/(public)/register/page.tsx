import { RegisterFormPage } from "@/src/components/auth/register/register-page";
import { Suspense } from "react";

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
