import PaymentFailed from "@/src/components/payment/PaymentFailed";
import PaymentStatusSkeleton from "@/src/components/payment/PaymentStatusSkeleton";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const SECRET_KEY = new TextEncoder().encode(process.env.PAYMENT_STATUS_SECRET);

const page = async () => {
  const token = cookies().get("paymentStatusToken")?.value;

  // If there's no token, user didn't come from the route handler
  if (!token) {
    redirect("/access-denied");
  }

  try {
    // Verify the token
    await jwtVerify(token, SECRET_KEY);
  } catch (error) {
    // Invalid or expired token -> redirect
    redirect("/access-denied");
  }
  return (
    <div className="mt-[-4rem] flex min-h-[85vh] items-center justify-center px-[1rem]">
      <div className="rounded-xl bg-white p-4 shadow-md sm:p-8">
        <Suspense fallback={<PaymentStatusSkeleton />}>
          <PaymentFailed />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
