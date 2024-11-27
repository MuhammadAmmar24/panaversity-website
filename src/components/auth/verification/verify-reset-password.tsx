"use client";
import { verify } from "@/src/app/actions/verify";
import UpdatePassword from "@/src/components/auth/update-password/update-password";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { toast } from "sonner";

type VerifyEmailProps = {
  token: string;
};

const VerifyResetPassword: React.FC<VerifyEmailProps> = ({ token }) => {
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
            localStorage.setItem("emailVerified", "true");
            toast.success("Email verified!");
          }
        } catch (error) {
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
    return <UpdatePassword token={token} />;
  }

  return <VerificationFailedComponent />;
};

// Separate components for different states
const LoadingComponent = () => (
  <div className="flex h-[400px] flex-col items-center justify-center gap-y-5 px-5">
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
    <p>Please wait while we process your request.</p>
  </div>
);

const ErrorComponent = ({ message }: { message: string }) => (
  <div className="flex h-[400px] flex-col items-center justify-center gap-y-5 px-5">
    <div className="mb-4 flex justify-center">
      <ImCancelCircle size={50} className="text-red-500" />
    </div>
    <h2 className="text-2xl font-bold">Error</h2>
    <p className="text-center">{message}</p>
  </div>
);

const VerifyingComponent = () => (
  <div className="flex h-[400px] flex-col items-center justify-center gap-y-5 px-5">
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

const VerificationFailedComponent = () => (
  <div className="flex h-[300px] flex-col items-center justify-center gap-y-5 px-5">
    <div className="mb-4 flex justify-center">
      <ImCancelCircle size={50} className="text-red-500" />
    </div>
    <h2 className="text-2xl font-bold">Verification Failed</h2>
    <p className="px-5">Invalid or expired verification link</p>
    <Link
      href="/reset-password"
      aria-label="Reset password"
      className="w-full rounded-md bg-accent py-2 text-center font-medium text-white hover:bg-[#18c781]"
    >
      Reeset Password
    </Link>
  </div>
);

export default VerifyResetPassword;
