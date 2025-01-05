"use server";

import { PaymentStatusSchema } from "@/src/lib/schemas/paymentStatus";
import { revalidateTag } from "next/cache";

export const verifyPaymentStatus = async (payload: any): Promise<any> => {
  const validationResult = PaymentStatusSchema.safeParse(payload);

  if (!validationResult.success) {
    return {
      type: "error",
      message: validationResult.error.errors
        .map((err) => err.message)
        .join(", "),
    };
  }

  try {
    const response = await fetch(
      `${process.env.ENROLLMENT_API_URL}/payment/verification`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.ENROLLMENT_SECRET}`,
        },
        body: JSON.stringify(validationResult.data),
      },
    );

    if (!response.ok) {
      // Capture any error from backend
      const errorResponse = await response.json();
      let errorMessage = `Failed to verify payment status: ${response.statusText}`;

      if (errorResponse && errorResponse.detail) {
        errorMessage = errorResponse.detail;
      }
      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    console.log("Payment notification response data:", responseData);

    // validate sutdent course payment status
    revalidateTag("fetchPaymentStatus");

    return {
      type: "success",
      message: "Payment status verified successfully",
      data: responseData,
    };
  } catch (error: any) {
    console.error("Error verifying payment status:", error);

    return {
      type: "error",
      message: error.message || "An unexpected error occurred",
    };
  }
};
