// "use client";
import Link from "next/link";
import { GoCheckCircleFill } from "react-icons/go";

const PaymentSuccess = () => {
  return (
    <div className="text-center  w-full max-w-sm pb-5 sm:pb-2">
      <div className="flex justify-center mb-4 ">
        <div className="bg-white p-4 rounded-full">
          <GoCheckCircleFill className="text-[5rem] text-accent" />
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Payment Successfull
      </h2>
      <p className="text-gray-600 mb-8">
        Your payment is confirmed. You can now access your dashboard.
      </p>
      <Link
      
        href={"/dashboard"}
        className="w-full text-center py-3   px-8   text-white rounded-xl bg-accent  hover:bg-[#18c781] font-medium"
      >
        Continue to Dashboard
      </Link>
    </div>
  );
};

export default PaymentSuccess;
