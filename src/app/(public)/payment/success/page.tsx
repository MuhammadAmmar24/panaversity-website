import PaymentStatusSkeleton from "@/src/components/payment/PaymentStatusSkeleton";
import PaymentSuccess from "@/src/components/payment/PaymentSuccess";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const SECRET_KEY = new TextEncoder ().encode(process.env.PAYMENT_STATUS_SECRET);

const page = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("paymentStatusToken");

  // If there's no token, user didn't come from the route handler
  if (!token) {
    redirect("/access-denied");
  }

  try {
    // Verify the token
    await jwtVerify(token.value, SECRET_KEY);

  } catch (error) {
    // Invalid or expired token -> redirect
    redirect("/access-denied");
  }
  return (
    <div className="mt-[-4rem] flex min-h-[85vh] items-center justify-center px-[1rem]">
      <div className="rounded-xl bg-white p-4 shadow-md sm:p-8">
        <Suspense fallback={<PaymentStatusSkeleton />}>
          <PaymentSuccess />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
