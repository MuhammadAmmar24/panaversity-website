"use client"
import Link from 'next/link';

import { FaClock } from "react-icons/fa6";


const EmailVerificationPending = () => {


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
        <Link 
          href="/resend-link"
          
         className="w-full text-center py-3 px-9 text-white rounded-md  bg-accent  hover:bg-[#18c781] font-medium"
        replace>
          Send Email Again
        </Link>
      
    </div>
  );
};

export default EmailVerificationPending;
