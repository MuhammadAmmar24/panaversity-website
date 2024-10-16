// /app/error.tsx
"use client"; // Enable client-side rendering

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
        <div>Go back to Home</div>
      </Link>
    </div>
  );
}
