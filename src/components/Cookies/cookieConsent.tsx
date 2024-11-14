"use client";
import Cookies from "js-cookie";
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
    <div className="fixed bottom-0 left-0 right-0 bg-gray-500/30 backdrop-blur-md text-gray-900 p-4 flex flex-col md:flex-row justify-between items-center z-50">
      <p className="mb-4 md:mb-0 text-center md:text-left">
        We use cookies to ensure user get the best experience on our website.
      </p>
      <div className="space-x-3">
        <button
          onClick={handleAccept}
          className="bg-accent hover:bg-white text-white hover:text-accent py-2 px-4 rounded-lg mr-2"
        >
          Accept
        </button>
        <button
          onClick={handleReject}
          className="bg-gray-600 hover:bg-white text-white hover:text-gray-600 py-2 px-4 rounded-lg"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
