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
      return redirectToPath(process.env.NEXT_PUBLIC_SITE_URL ?? req.url, '/access-denied');
    }

    if (vendor === "blinq") {
      const text = await req.text();
      const params = new URLSearchParams(text);
      const paymentData = Object.fromEntries(params);
      paymentData.vendor = "blinq"; 

      const verificationResponse = await verifyPaymentStatus(paymentData);
      console.log("Verification Response", verificationResponse);

      if (verificationResponse.type === "success") {
   
        const { data } = verificationResponse; // "success" or "failed"
        

        // Decide which route to send the user to
        const nextPath = data === "success" ? "/payment/success" : "/payment/failure";

        // Create the short-lived token
        const token = await createPaymentStatusToken();
        const redirectUrl = new URL(nextPath, process.env.NEXT_PUBLIC_SITE_URL);

        const response = NextResponse.redirect(redirectUrl);
        setPaymentCookie(response, token);

        return response;
      } else if (verificationResponse.type === "error") {
        console.log("Eroor Case");
        return redirectToPath(process.env.NEXT_PUBLIC_SITE_URL ?? req.url, '/payment/processing-error');
      }
    }
    if (vendor === "stripe") {
      // TODO: Implement your Stripe verification logic here
      return redirectToPath(process.env.NEXT_PUBLIC_SITE_URL ?? req.url, '/access-denied');
    }

    // If none of the above conditions match, fall back to /access-denied
    return redirectToPath(process.env.NEXT_PUBLIC_SITE_URL ?? req.url, '/access-denied');

  } catch (error) {
    // Catch any unexpected errors (e.g., network issues to third-party, code exceptions, etc.)
    console.error("Payment status error:", error);
    // Redirect to /payment/processing so the user sees an intermediate state if verification failed unexpectedly.
    return redirectToPath(process.env.NEXT_PUBLIC_SITE_URL ?? req.url, '/payment/processing-error');
  }
}


// ==========================================================================================================

// import { verifyPaymentStatus } from "@/src/app/actions/paymentVerification";
// import createPaymentStatusToken from "@/src/lib/paymentStatusToken";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const vendor = searchParams.get("vendor");

//     if (vendor === "blinq") {
//       const text = await req.text();
//       const params = new URLSearchParams(text);
//       console.log("Blinq Post Req Data", params)
//       let paymentData = Object.fromEntries(params);
//       paymentData.vendor = "blinq";
//       const verificationResponse = await verifyPaymentStatus(paymentData);
//       console.log("Route handler", verificationResponse)

//       if (verificationResponse.type === "success") {
//         const token = await createPaymentStatusToken();
//         let redirectPath = "/access-denied";
//         redirectPath =
//           verificationResponse.data === "success"
//             ? "/payment/success"
//             : "/payment/failure";

//         console.log("Redirect", redirectPath)
//         const redirectUrl = new URL(
//           redirectPath,
//           process.env.NEXT_PUBLIC_SITE_URL,
//         );
//         const response = NextResponse.redirect(redirectUrl);

//         response.cookies.set("paymentStatusToken", token, {
//           httpOnly: true,
//           secure: true,
//           path: "/payment",
//           // sameSite: "strict",
//           maxAge: 60,
//         });

//         return response;
//       } else if (verificationResponse.type === "error") {
//         console.log("Error in payment verification", verificationResponse);
//         return NextResponse.redirect(new URL("/access-denied", req.url));
//       } else {
//         console.log("else block", verificationResponse)
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
