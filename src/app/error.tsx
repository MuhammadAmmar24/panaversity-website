// /app/error.tsx
"use client"; // Enable client-side rendering

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error",
  description: `Oops! Something went wrong. Please check the page you are trying to access or return to Panaversity's homepage to continue exploring our AI-powered courses.`
};

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      setErrorMessage(decodeURIComponent(error));
    }
  }, [searchParams]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Oops! Something went wrong.</h1>
      {errorMessage && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          Error: {errorMessage}
        </p>
      )}
      <Link href="/">
        <a>Go back to Home</a>
      </Link>
    </div>
  );
}
