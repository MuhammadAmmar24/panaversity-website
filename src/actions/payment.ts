"use server";
import { PaymentRequestSchema, PaymentRequest } from "@/src/lib/schemas/payment";
import { Result } from "@/src/lib/types";

// Payment Server Action to process the payment
export const processPayment = async (
  paymentData: PaymentRequest
): Promise<Result<{ success: boolean; transactionId: string }>> => {
  try {
    // Validate payment data using the schema
    const validationResult = PaymentRequestSchema.safeParse(paymentData);

    if (!validationResult.success) {
      return {
        type: "error",
        message: validationResult.error.errors.map((err) => err.message).join(", "),
      };
    }

    // Make the POST request to your payment backend
    const apiUrl = `${process.env.PAYMENT_API_URL}/voucher/create_voucher`;
    console.log("API URL:", apiUrl);

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TOKEN_SECRET}`, // Use secret from environment
      },
      body: JSON.stringify(validationResult.data), // Convert validated data to JSON string
    });

    if (!response.ok) {
      console.log(`Failed to process payment. Status: ${response.status}, StatusText: ${response.statusText}`);
      throw new Error(`Failed to process payment: ${response.statusText}`);
    }

    // Parse the JSON response
    const responseData = await response.json();
    console.log("Payment Response:", responseData);

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