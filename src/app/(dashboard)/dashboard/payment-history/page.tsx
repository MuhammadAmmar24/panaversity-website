import { fetchPaymentHistory } from "@/src/lib/fetchPaymentHistory";
import { getCookie } from "@/src/lib/getCookies";
import {
  PaymentHistoryResponse
} from "@/src/lib/schemas/payment";
import { redirect } from "next/navigation";
import PaymentInfoCard from "../Components/Ui/PaymentInfoCard";

const PaymentHistory: React.FC = async () => {
  const userData = await getCookie();
  if (!userData || !userData.id) {
    redirect("/login");
  }

  let paymentData: PaymentHistoryResponse = [];

  try {
    const result = await fetchPaymentHistory(userData.id);
    if (result.type === "success") {
      // Use a fallback to [] if result.data is undefined.
      paymentData = result.data ?? [];
    } else {
      console.error("Error fetching payment history:", result.message);
    }
  } catch (error: unknown) {
    console.error("Error in PaymentHistory component:", error);
  }

  return (
    <div className="py-2 sm:py-4 md:py-6 lg:py-8">
      <div className="mb-8 rounded-lg bg-white p-4 shadow-lg sm:p-6">
        <h1 className="text-2xl font-bold sm:text-3xl">Payment History</h1>
        <p className="pt-2">Stay updated with your transaction records.</p>
      </div>

      <div className="3xl:grid-cols-3 grid justify-items-center gap-8 md:grid-cols-2">
        {paymentData.length > 0 ? (
          paymentData.map((payment) => (
            // Provide a fallback for voucher_id in case it's null
            <PaymentInfoCard
              key={payment.voucher_id ?? "no-key"}
              payment={payment}
            />
          ))
        ) : (
          <p className="mt-4 text-center text-lg text-gray-500">
            No payment history available.
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
