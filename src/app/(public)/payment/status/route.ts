import { NextRequest, NextResponse } from "next/server";
import createPaymentStatusToken from "@/src/lib/paymentStatusToken";

export async function POST(req: NextRequest) {
  try {
    const text = await req.text();
    const params = new URLSearchParams(text);
    const status = params.get("status");

    const { searchParams } = new URL(req.url);
    const vendor = searchParams.get("vendor");

    if (vendor === "blinq") {
      const token = await createPaymentStatusToken();
      let redirectPath = "/access-denied";

      if (status === "Success") {
        redirectPath = "/payment/success";
      } else if (status === "Failure") {
        redirectPath = "/payment/failure";
      }

      const redirectUrl = new URL(redirectPath, "http://localhost:3000");
      const response = NextResponse.redirect(redirectUrl);

      response.cookies.set("paymentStatusToken", token, {
        httpOnly: true,
        secure: true,
        path: "/payment",
        sameSite: "strict",
        maxAge: 60,
      });

      return response;
    } else if (vendor === "stripe") {
      // To be implemented later when stripe is integrated
      return NextResponse.redirect(new URL("/access-denied", req.url));
    }

    return NextResponse.redirect(new URL("/access-denied", req.url));
  } catch (error) {
    console.error("Payment status error:", error);
    return NextResponse.redirect(
      new URL("/access-denied", "http://localhost:3000"),
    );
  }
}
