// import { NextRequest, NextResponse } from "next/server";
// import createPaymentStatusToken from "@/src/lib/paymentStatusToken";
// import { verifyPaymentStatus } from "@/src/app/actions/paymentVerification";

// export async function POST(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const vendor = searchParams.get("vendor");
//     console.log(req);

//     if (vendor === "blinq") {
//       const text = await req.text();
//       const params = new URLSearchParams(text);
//       console.log(params);
//       let paymentData = Object.fromEntries(params);
//       paymentData.vendor = "blinq";
//       // const status = params.get("status");
//       const verificationResponse = await verifyPaymentStatus(paymentData);
//       if (verificationResponse.type === "success") {
//         const token = await createPaymentStatusToken();
//         let redirectPath = "/access-denied";
//         redirectPath =
//           verificationResponse.data.payment_status === "success"
//             ? "/payment/success"
//             : "/payment/failure";
//         console.log("Success Response received");
//         const redirectUrl = new URL(
//           redirectPath,
//           process.env.NEXT_PUBLIC_SITE_URL,
//         );
//         const response = NextResponse.redirect(redirectUrl);

//         response.cookies.set("paymentStatusToken", token, {
//           httpOnly: true,
//           secure: true,
//           path: "/payment",
//           sameSite: "strict",
//           maxAge: 60,
//         });

//         return response;
//       } else {
//         return NextResponse.redirect(new URL("/access-denied", req.url));
//       }
//     } else if (vendor === "stripe") {
//       //  Yet to be updated
//     } else {
//       return NextResponse.redirect(new URL("/access-denied", req.url));
//     }

//     return NextResponse.redirect(new URL("/access-denied", req.url));
//   } catch (error) {
//     console.error("Payment status error:", error);
//     return NextResponse.redirect(
//       new URL("/access-denied", process.env.NEXT_PUBLIC_SITE_URL),
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import createPaymentStatusToken from "@/src/lib/paymentStatusToken";
export async function POST(req: NextRequest) {
  try {
    const text = await req.text();
    const params = new URLSearchParams(text);
    console.log("Params", params)
    const status = params.get("status");
    console.log("Status from blinq", status)
    const { searchParams } = new URL(req.url);
    const vendor = searchParams.get("vendor");
    console.log("Vendor", vendor)

    if (vendor === "blinq") {
      const token = await createPaymentStatusToken();
      let redirectPath = "/access-denied";
      if (status === "Success") {
        redirectPath = "/payment/success";
        console.log("Success Block")
      } else if (status === "Failed") {
        redirectPath = "/payment/failure";
        console.log("Failure Block")
      }
      const redirectUrl = new URL(redirectPath, process.env.NEXT_PUBLIC_SITE_URL);
      const response = NextResponse.redirect(redirectUrl);
      response.cookies.set("paymentStatusToken", token, {
        httpOnly: true,
        secure: true,
        path: "/payment",
        // sameSite: "none",
        maxAge: 60,
      });
      console.log("Response", response)
      return response;
    } else if (vendor === "stripe") {
      // To be implemented later when stripe is integrated
      return NextResponse.redirect(new URL("/access-denied", req.url));
    }
    console.log("Before access denied")
    return NextResponse.redirect(new URL("/access-denied", req.url));
  } catch (error) {
    console.error("Payment status error:", error);
    return NextResponse.redirect(
      new URL("/access-denied", process.env.NEXT_PUBLIC_SITE_URL),
    );
  }
}