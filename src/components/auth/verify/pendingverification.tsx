"use client"
import { resendVerification } from '@/src/actions/resend-verification';
import { Button } from '../../ui/button';
import { useToast } from '../../ui/use-toast';
import Link from 'next/link';
import { ToastAction } from '../../ui/toast';
import { FaClock } from "react-icons/fa6";


const EmailVerificationPending = () => {
    const { toast } = useToast()
  const resendEmail = () => {
    resendVerification().then((res) => {
      if (res?.error) {
        toast({
          title: "Error",
          description: res.error,
          variant: "destructive",
          action: (
            <Link href={res.redirectTo} replace> 
              <ToastAction altText={res.action}>{res.action}</ToastAction>
            </Link>
          ),
        });
      }
      if (res?.success) {
        toast({
          title: "Email Sent",
          description: "Email has been sent to your inbox",
        });
      }
      })
    }

  return (
    <div className='text-center w-full max-w-sm '>

        <div className="flex justify-center mb-4">
          <div className="bg-yellow-100 p-4 rounded-full">
          <FaClock  className='text-3xl text-yellow-600'/>

          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Email Verification Pending
        </h2>
        <p className="text-gray-600 mb-4">
          We have sent an email for verification. Follow the instructions in the
          email for logging into your account.
        </p>
        <Button
          onClick={resendEmail}
         className="w-full text-center py-2 text-white rounded-md  bg-accent  hover:bg-[#18c781] font-medium"
        >
          Send Email Again
        </Button>
      
    </div>
  );
};

export default EmailVerificationPending;
