"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import EmailVerificationPending from "./pendingverification";
import { IoClose } from "react-icons/io5";

export default function EmailVerificationPendingDialog() {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'emailVerified' && event.newValue === 'true') {
        // Close the dialog
        setOpen(false);
        // Optionally, redirect the user or update the state
        router.replace('/login'); // Redirect to dashboard or any desired page
        // Clear the flag
        localStorage.removeItem('emailVerified');
      }
    };

    // Add the event listener
    window.addEventListener('storage', handleStorageChange);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [router]);



  return (
    <Dialog.Root open={open} onOpenChange={() => router.back()}>
      <Dialog.Portal>
        <Dialog.Overlay className="z-40 fixed inset-0 bg-black/70 backdrop-blur-sm" />
        <Dialog.Content className="z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background rounded-lg p-8 w-full max-w-md max-h-[85vh] overflow-y-auto">
          <EmailVerificationPending />
          <Dialog.Close asChild>
            <button className="absolute top-4 right-4 p-1" aria-label="Close">
              <IoClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
