"use server";

import { z } from "zod";
import { ContactSchema } from "@/src/lib/schemas/contactSchema";
import { getIpAddress } from "@/src/lib/get-ip";
import { checkRateLimit } from "@/src/lib/rate-limit";
import { headers } from "next/headers";

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

export async function submitContactForm(data: z.infer<typeof ContactSchema>) {
  try {
    const validationResult = ContactSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        type: "error",
        message: validationResult.error.errors
          .map((err) => err.message)
          .join(", "),
      };
    }

    const ip = getIpAddress(headers());
    if (!ip) {
      throw new Error("Could not determine IP address");
    }

    // Check rate limit
    const rateLimit = await checkRateLimit(ip);

    if (rateLimit.type === "error") {
      return {
        type: "error",
        message: `Too many requests! Retry in ${rateLimit.reset}`,
      };
    }

    if (!process.env.GOOGLE_SCRIPT_URL) {
      throw new Error("GOOGLE_SCRIPT_URL is not set in environment variables");
    }

    const response = await fetch(GOOGLE_SCRIPT_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validationResult.data),
    });

    if (!response.ok) {
      throw new Error("Failed to submit your response. Please try again!");
    }

    const result = await response.json();

    if (result.status !== "success") {
      throw new Error("Failed to submit your response. Please try again!");
    }

    return {
      type: "success",
      message: "Form submitted successfully",
    };
  } catch (error: any) {
    return { type: "error", message: "Something went wrong. Please try again!"};
  }
}
