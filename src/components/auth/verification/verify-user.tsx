"use client";
import { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { Button } from "@/src/components/ui/button";
import { verify } from "@/src/actions/verify";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/src/components/ui/use-toast";
import Link from "next/link";
import { user_verify } from "@/src/actions/user-verify"
import { useRouter } from "next/navigation";

const Verify = async () => {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [verified, setVerified] = useState<null | boolean>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication
  const token = searchParams.get("token");

  const router = useRouter();

  const handleClick = async () => {
    console.log("handling Click")
    const res = await user_verify()
    console.log(res.redirectTo)
    if(res.redirectTo) {
      console.log(res.redirectTo)
      router.push("/login");
      
    } else {
      router.push("/programs/flagship-program")
    }
  }

  useEffect(() => {
    // Check for token and verify the user
    if (token) {
      verify(token).then((res) => {
        setVerified(res);
        if (res === true) {
          localStorage.setItem("emailVerified", "true");
          window.close();
        }
      });
    }

   
     
    
  }, [token]);
  
  

  return (
    <>
      {verified === null && (
        <div className="flex flex-col justify-center gap-y-5 items-center w-[400px] px-5 h-[400px]">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-4 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-accent animate-spin"
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
      )}
      {verified === true && (
        <div className="flex flex-col justify-center gap-y-5 items-center w-[400px] px-5 h-[400px]">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-4 rounded-full">
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

          <button
            onClick={handleClick}
            className="w-full text-center py-2 text-white rounded-md bg-accent hover:bg-[#18c781] font-medium"
          >
            Get Started
          </button>
        </div>
      )}
      {verified === false && (
        <div className="flex flex-col justify-center gap-y-5 items-center  w-[400px] px-5 h-[300px]">
          <div className="flex justify-center mb-4">
            <ImCancelCircle size={50} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold">Email Verification Failed</h2>
          <p className="px-5">Invalid or expired verification link</p>

          <Link
            href="/verify"
            className="w-full text-center py-2 text-white rounded-md bg-accent hover:bg-[#18c781] font-medium"
          >
            Re-verify Email
          </Link>
        </div>
      )}
    </>
  );
};

export default Verify;
