import { NextResponse } from "next/server";

interface ConsentRequest {
    consent: string;
}

export async function POST(request: Request): Promise<NextResponse> {
    
    const { consent }: ConsentRequest = await request.json();

    if (!consent) {
        return NextResponse.json({ error: "Consent value is required." }, { status: 400 });
    }

    const response = NextResponse.json({ message: "Cookie preference saved." });
    response.cookies.set("cookieConsent", consent, {
        sameSite: "lax",
        path: "/",
    });

    return response;
}
