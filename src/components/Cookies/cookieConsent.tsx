"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("cookieConsent="))
      ?.split("=")[1];


    if (!cookieValue) {
      setIsVisible(true);
    }
  }, []);

  const handleAction = async (consent : string) => {
    try {
      await fetch("/api/cookie-consent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ consent }),
      });

      setIsVisible(false);
    } catch (error) {
      console.error("Error saving cookie consent:", error);
    }
  };

  if (!isVisible) return null;

  return (
    <aside className="fixed bottom-2 left-2 z-50 flex w-full flex-col items-center justify-between gap-y-6 rounded-lg border border-gray-400/50 bg-white/40 p-4 backdrop-blur-md sm:right-2 sm:max-w-[350px]">
      <p className="mb-4 text-gray-900 md:mb-0 md:text-left">
        We use cookies to ensure user get the best experience on our website.
        Checkout our{" "}
        <Link
          href={"/privacy-policy/#consent-policy"}
          aria-label="Read more aboutContent Policy"
          className="text-gray-900 underline decoration-accent decoration-2 underline-offset-4"
        >
          Consent Policy.
        </Link>
      </p>
      <div className="space-x-8">
        <button
          onClick={() => handleAction("accepted")}
          className="rounded-lg bg-accent px-4 py-2 text-white"
        >
          Accept
        </button>
        <button
          onClick={() => handleAction("rejected")}
          className="rounded-lg bg-gray-800 px-4 py-2 text-white"
        >
          Reject
        </button>
      </div>
    </aside>
  );
}
