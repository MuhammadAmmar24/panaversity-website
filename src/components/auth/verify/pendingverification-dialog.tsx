"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import EmailVerificationPending from "./pendingverification";

export default function EmailVerificationPendingDialog() {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "emailVerified" && event.newValue === "true") {
        // Close the dialog
        setOpen(false);
        // Optionally, redirect the user or update the state
        router.replace("/login"); // Redirect to dashboard or any desired page
        // Clear the flag
        localStorage.removeItem("emailVerified");
      }
    };

    // Add the event listener
    window.addEventListener("storage", handleStorageChange);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [router]);

  return (
    <Dialog.Root open={open} onOpenChange={() => router.back()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[300px] -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto rounded-lg bg-background p-8 mobileM:w-[350px] xs:w-[400px] md:w-[400px]"
        >
          <EmailVerificationPending />
          <Dialog.Close asChild>
            <button className="absolute right-4 top-4 p-1" aria-label="Close">
              <IoClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
