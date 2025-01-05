import { SignJWT } from "jose";

export default async function createPaymentStatusToken() {
    const SECRET_KEY = new TextEncoder ().encode(process.env.PAYMENT_STATUS_SECRET);
    const token = await new SignJWT({
        route: "payment-failure",
        createdAt: Date.now()
    })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1m")
    .sign(SECRET_KEY);
    return token;
}