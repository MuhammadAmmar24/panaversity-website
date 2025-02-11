import { NextRequest, NextResponse } from "next/server";
import { verifyPaymentStatus } from "@/src/app/actions/paymentVerification";
import createPaymentStatusToken from "@/src/lib/paymentStatusToken";

// Helper to redirect to path
function redirectToPath(baseUrl: string, path: string) {
  return NextResponse.redirect(new URL(path, baseUrl));
}

// Helper to set Payment Cookie
function setPaymentCookie(response: NextResponse, token: string) {
  response.cookies.set("paymentStatusToken", token, {
    httpOnly: true,
    secure: true,
    path: "/payment",
    sameSite: "none",
    maxAge: 300,
  });
  return response;
}

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const vendor = searchParams.get("vendor");

    if (vendor !== "blinq" && vendor !== "stripe") {
      return redirectToPath(
        process.env.NEXT_PUBLIC_SITE_URL ?? req.url,
        "/access-denied",
      );
    } else if (vendor === "blinq") {
      const text = await req.text();
      const params = new URLSearchParams(text);
      const paymentData = Object.fromEntries(params);
      paymentData.vendor = "blinq";

      const verificationResponse = await verifyPaymentStatus(paymentData);

      if (verificationResponse.type === "success") {
        const { data } = verificationResponse; // "success" or "failed"

        // Decide which route to send the user to
        const nextPath =
          data === "success" ? "/payment/success" : "/payment/failure";

        // Create the short-lived token
        const token = await createPaymentStatusToken();
        const redirectUrl = new URL(nextPath, process.env.NEXT_PUBLIC_SITE_URL);

        const response = NextResponse.redirect(redirectUrl);
        setPaymentCookie(response, token);

        return response;
      } else if (verificationResponse.type === "error") {
        const redirectUrl = new URL(
          "/payment/processing-error",
          process.env.NEXT_PUBLIC_SITE_URL,
        );
        const token = await createPaymentStatusToken();
        const response = NextResponse.redirect(redirectUrl);
        setPaymentCookie(response, token);

        return response;
      }
    } else if (vendor === "stripe") {
      // TODO: Implement Stripe verification logic here
      return redirectToPath(
        process.env.NEXT_PUBLIC_SITE_URL ?? req.url,
        "/access-denied",
      );
    } else {
      return redirectToPath(
        process.env.NEXT_PUBLIC_SITE_URL ?? req.url,
        "/access-denied",
      );
    }
  } catch (error) {
    console.error("Payment status error:", error);
    // Redirect to /payment/processing so the user sees an intermediate state if verification failed unexpectedly.
    return redirectToPath(
      process.env.NEXT_PUBLIC_SITE_URL ?? req.url,
      "/payment/processing-error",
    );
  }
}
