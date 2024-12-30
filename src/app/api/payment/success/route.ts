import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json(); 
  console.log("Request", body)
  const referer = req.headers.get("referer");
  
  const { status } = body; 
  console.log("Status", status)
  console.log("Referer", referer)

  if (!referer || !referer.includes("stripe") || !referer.includes("blinq")) {
    console.log("This is called", referer)
    return NextResponse.redirect(new URL('/access-denied', req.url));
  }

  if (!status) {
    return NextResponse.json(
      { error: "Missing transaction status" },
      { status: 400 },
    );
  }
  
  if (status === "success") {
    return NextResponse.json(
      {
         status: "success",
        }
    );
  }
  if (status === "failure") {
    return NextResponse.json(
      {
        status: "failure",
      }
    );
  }
}

// export const runtime = "edge";
// import { NextRequest, NextResponse } from "next/server";
// export async function GET(req: NextRequest) {
//   const referer = req.headers.get("referer");
//   if (!referer || !referer.includes("stripe") || !referer.includes("blinq")) {
//     return NextResponse.redirect(new URL('/access-denied', req.url));
//   }
//   return NextResponse.redirect(new URL('/payment/success', req.url));
// }