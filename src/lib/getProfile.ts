import { auth } from "@/src/auth";

export default async function fetchProfile() {
  const session = await auth(); // Getting JWT From Cookies

  if (!session) {
    return { isVerified: false, redirectTo: "/login" };
  }

  const token = session.access_token;

  try {
    const response = await fetch(
      `${process.env.BACKEND_AUTH_SERVER_URL}/student/profile`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "force-cache",
      }
    );
    const profile = await response.json();
    console.log("profile", profile);

    return profile;
  } catch (error: any) {
    console.error(error.message);
  }
}
