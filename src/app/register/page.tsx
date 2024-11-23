import { CardWrapper } from "@/src/components/auth/card-wrapper";
import { RegisterForm } from "@/src/components/auth/register/register-form";
import Footer from "@/src/components/Footer/Footer";
import Navbar from "@/src/components/Navbar/Navbar";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  title: "Register | Panaversity",
  description:
    "Join Panaversity today! Create your account to start learning with our cutting-edge Agentic AI courses and become part of a global learning community.",
  openGraph: {
    title: "Register | Panaversity",
    description:
      "Join Panaversity today! Create your account to start learning with our cutting-edge Agentic AI courses and become part of a global learning community.",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/logos/logoIcon.png`,
        alt: "Panaversity Logo",
      },
    ],
    siteName: "Panaversity: AI-Powered Online University",
  },
  twitter: {
    card: "summary_large_image",
    title: "Register | Panaversity",
    description:
      "Join Panaversity today! Create your account to start learning with our cutting-edge Agentic AI courses and become part of a global learning community.",
    images: [
      {
        url: `${siteUrl}/logos/logoIcon.png`,
        alt: "Panaversity Logo",
      },
    ],
    site: "Panaversity: AI-Powered Online University",
  },
};

const RegisterPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <div className="flex min-h-screen flex-col items-center justify-center">
          <div className="mb-20 mt-10">
            <CardWrapper headerLabel="Create an account">
              <div className="p-4 mobileM:p-2">
                <RegisterForm />
              </div>{" "}
            </CardWrapper>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default RegisterPage;
