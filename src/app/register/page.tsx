import { RegisterFormPage } from "@/src/components/auth/register/register-page";
import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  title: "Register | Panaversity",
  description:
    "Join Panaversity today! Create your account to start learning with our cutting-edge Generative AI courses and become part of a global learning community.",
  openGraph: {
    title: "Register | Panaversity",
    description:
      "Join Panaversity today! Create your account to start learning with our cutting-edge Generative AI courses and become part of a global learning community.",
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
      "Join Panaversity today! Create your account to start learning with our cutting-edge Generative AI courses and become part of a global learning community.",
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
        <div className="flex flex-col justify-center items-center min-h-screen">
          <div className="mt-10 mb-20">
            <Suspense>
              <RegisterFormPage />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default RegisterPage;
