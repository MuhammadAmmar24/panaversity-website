"use client";
import { verify } from "@/src/app/actions/verify";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { toast } from "sonner";

type VerifyEmailProps = {
  token: string;
};

const VerifyEmail: React.FC<VerifyEmailProps> = ({ token }) => {
  const [verified, setVerified] = useState<null | boolean>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          const result = await verify(token); // verify email server action.
          setVerified(result);
          if (result === true) {
            toast.success("Email verified!");
            localStorage.setItem("emailVerified", "true");
          }
        } catch (error) {
          console.error("Verification failed", error);
          toast.error("Verification failed. Please try again.")
          setError("Verification failed. Please try again.");
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent message={error} />;
  }

  if (verified === null) {
    return <VerifyingComponent />;
  }

  if (verified === true) {
    return <VerifiedComponent />;
  }

  return <VerificationFailedComponent />;
};

// Separate components for different states
const LoadingComponent = () => (
  <div className="flex flex-col items-center justify-center gap-y-5 px-5 py-[5rem]">
    <div className="mb-4 flex justify-center">
      <div className="rounded-full bg-green-100 p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 animate-spin text-accent"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 001 1h4a1 1 0 100-2h-3V5z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
    <h2 className="text-2xl font-bold">Loading...</h2>
    <p className="pb-5">Please wait while we process your request.</p>
  </div>
);

const ErrorComponent = ({ message }: { message: string }) => (
  <div className="flex h-[400px] w-[400px] flex-col items-center justify-center gap-y-5 px-5">
    <div className="mb-4 flex justify-center">
      <ImCancelCircle size={50} className="text-red-500" />
    </div>
    <h2 className="text-2xl font-bold">Error</h2>
    <p className="text-center">{message}</p>
  </div>
);

const VerifyingComponent = () => (
  <div className="flex h-[400px] w-[400px] flex-col items-center justify-center gap-y-5 px-5 py-7">
    <div className="mb-4 flex justify-center">
      <div className="rounded-full bg-green-100 p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 animate-spin text-accent"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 001 1h4a1 1 0 100-2h-3V5z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
    <h2 className="text-2xl font-bold">Verifying...</h2>
    <p>Please wait while we verify your email.</p>
  </div>
);

const VerifiedComponent = () => (
  <div className="flex h-[400px] flex-col items-center justify-center gap-y-5 px-5">
    <div className="mb-4 flex justify-center">
      <div className="rounded-full bg-green-100 p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-green-600"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
    <h2 className="text-2xl font-bold">Email Verified</h2>
    <p className="text-center">
      Your email was verified. You can continue using the application.
    </p>
    <Link
      href={"/login"}
      aria-label="Go to login page"
      className="w-full rounded-md bg-accent py-2 text-center font-medium text-white hover:bg-[#18c781]"
    >
      Login
    </Link>
  </div>
);

const VerificationFailedComponent = () => (
  <div className="flex flex-col items-center justify-center gap-y-[1rem] px-3 py-[3rem] text-center">
    <div className="mb-2 flex justify-center">
      <ImCancelCircle size={50} className="text-red-500" />
    </div>
    <h2 className="px-0 text-2xl font-bold">Email Verification Failed</h2>
    <p className="px-3">Invalid or expired verification link</p>
    <Link
      href="/verify"
      aria-label="Go to verify email page"
      className="mt-4 w-full max-w-[18.5rem] rounded-md bg-accent py-2 text-center font-medium text-white hover:bg-[#18c781]"
    >
      Re-verify Email
    </Link>
  </div>
);

export default VerifyEmail;
