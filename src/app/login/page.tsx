import { CardWrapper } from "@/src/components/auth/card-wrapper";
import { LoginForm } from "@/src/components/auth/login/login-form";
import Footer from "@/src/components/Footer/Footer";
import Navbar from "@/src/components/Navbar/Navbar";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Login",
  description: `Access your Panaversity account. Login to manage your courses, track your learning progress, and stay connected with the latest AI-powered learning opportunities.`,
};

const LoginPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <div className="flex flex-col justify-center items-center min-h-[85vh] mt-10 mb-20">
            <CardWrapper headerLabel="Login">
            <div className="p-4 mobileM:p-2">
              <LoginForm />
              </div>
            </CardWrapper>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LoginPage;
