import { PaymentHistoryResponse } from "@/src/lib/schemas/payment";
import { Result } from "@/src/types/types";


export const fetchPaymentHistory = async (
  profileId: string,
): Promise<Result<PaymentHistoryResponse>> => {
  try {
    // Validate profileId
    if (!profileId) {
      return {
        type: "error",
        message: "Profile ID is required.",
      };
    }

    // Validate required environment variables for Payment History API
    const apiUrl = process.env.VOUCHER_API_URL;
    const authToken = process.env.VOUCHER_JWT_KEY;

    if (!apiUrl || !authToken) {
      console.error("Missing required environment variables for Payment History API.");
      return {
        type: "error",
        message: "Internal server error: Missing configuration.",
      };
    }

    const endpointUrl = `${apiUrl}/voucher/get_voucher_history/${profileId}`;

    const response = await fetch(endpointUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      cache: "no-store",
      next: { tags: ["fetchPaymentHistory"] },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    const responseData: PaymentHistoryResponse = await response.json();

    return {
      type: "success",
      message: "Payment history fetched successfully",
      data: responseData,
    };
  } catch (error: unknown) {
    console.error("Error fetching payment history:", error);
    return {
      type: "error",
      message: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
