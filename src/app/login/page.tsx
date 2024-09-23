import { LoginFormPage } from "@/src/components/auth/login/login-page";
import { Suspense } from "react";

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