"use server";
import revalidateDashboard from "@/src/lib/revalidateDashboard";
import {
  PaymentRequest,
  PaymentRequestSchema,
} from "@/src/lib/schemas/payment";
import { Result } from "@/src/types/types";
import { revalidateTag } from "next/cache";


// Payment Server Action to process the payment
export const processPayment = async (
  paymentData: PaymentRequest,
): Promise<Result<{ success: boolean; transactionId: string }>> => {
  try {
    // Validate payment data using the schema
    const validationResult = PaymentRequestSchema.safeParse(paymentData);

    if (!validationResult.success) {

      return {
        type: "error",
        message: validationResult.error.errors
          .map((err) => err.message)
          .join(", "),
      };
    }

    // Make the POST request to your payment backend
    const apiUrl = `${process.env.VOUCHER_API_URL}/voucher/create_voucher`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.VOUCHER_JWT_KEY}`, // Use secret from environment
      },
      body: JSON.stringify(validationResult.data), // Convert validated data to JSON string
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to process payment: ${response.statusText}`);
    }

    // Parse the JSON response
    const responseData = await response.json();
    console.log("REsponse of payment", responseData);

    // revalidateTag("fetchStudentCourses")
    // revalidateDashboard("fetchStudentCourses");

    // Assuming the response contains a transaction ID indicating a successful payment
    return {
      type: "success",
      message: "Payment processed successfully",
      data: responseData, // Replace with actual key from response
    };
  } catch (error: any) {
    console.error("Error processing payment:", error.message);
    return {
      type: "error",
      message: error.message,
    };
  }
};
