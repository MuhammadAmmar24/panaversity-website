import { NextRequest, NextResponse } from "next/server";
import createPaymentStatusToken from "@/src/lib/paymentStatusToken";

export async function POST(req: NextRequest) {
  const referer = req.headers.get("referer");

  if (referer && referer === "blinq") {
    const body = await req.json();
    const { status } = body;
    if (status === "success") {
      const token = await createPaymentStatusToken();
      const redirectUrl = new URL("/payment/status", req.url);
      console.log("Token", token)
      const response = NextResponse.redirect(redirectUrl);
      response.cookies.set("paymentStatusToken", token, {
        httpOnly: true,
        secure: true,
        path: "/payment",
        sameSite: "strict",
        maxAge: 60,
      });
      return response;
    } else if (status === "failure") {
      const token = await createPaymentStatusToken();
      const redirectUrl = new URL("/payment/failure", req.url);
      const response = NextResponse.redirect(redirectUrl);
      response.cookies.set("paymentStatusToken", token, {
        httpOnly: true,
        secure: true,
        path: "/payment",
        sameSite: "strict",
        maxAge: 60,
      });
      console.log("Token", token)
      return response;
    } else {
      return NextResponse.redirect(new URL("/access-denied", req.url));
    }
  } else if (referer && referer != "stripe") {
    // find query parameters and redirect to the appropriate page
    // return NextResponse.redirect(new URL("/access-denied", req.url));
  } else {
    return NextResponse.redirect(new URL("/access-denied", req.url));
  }
}
