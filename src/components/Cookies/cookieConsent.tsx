"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("cookieConsent", "accepted", { expires: 365 });
    setIsVisible(false);
  };

  const handleReject = () => {
    Cookies.set("cookieConsent", "rejected", { expires: 365 });
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside className="p-4 w-full sm:max-w-[350px] fixed bottom-2 right-0 sm:right-2 flex flex-col gap-y-6 justify-between items-center  rounded-lg bg-white/40 backdrop-blur-md border border-gray-400/50 z-50">
      <p className="mb-4 md:mb-0 text-gray-900 text-center md:text-left">
        We use cookies to ensure user get the best experience on our website. Checkout our{" "}
        <Link href={'/privacy-policy/#consent-policy'} aria-label="Read more aboutContent Policy" className=" text-gray-900 underline underline-offset-4 decoration-2 decoration-accent">Consent Policy.</Link>
      </p>
      <div className="space-x-8">
        <button
          onClick={handleAccept}
          className="bg-accent hover:bg-white text-white hover:text-accent py-2 px-4 rounded-lg"
        >
          Accept
        </button>
        <button
          onClick={handleReject}
          className="bg-gray-800 hover:bg-white text-white hover:text-gray-600 py-2 px-4 rounded-lg"
        >
          Reject
        </button>
      </div>
    </aside>
  );
}
