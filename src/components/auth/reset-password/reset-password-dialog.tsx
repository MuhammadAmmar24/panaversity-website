"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import ResetPassword from "./reset-password";

export default function ResetPasswordDialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "updatePassword" && event.newValue === "true") {
        // Close the dialog
        setOpen(false);
        // Optionally, redirect the user or update the state
        window.location.href = "/login"; // Redirect to dashboard or any desired page
        // Clear the flag
        localStorage.removeItem("updatePassword");
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
    <Dialog.Root open={true} onOpenChange={() => router.back()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-1/2 z-50 w-[300px] -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto rounded-lg bg-background p-5 mobileM:w-[350px] xs:w-[400px] md:w-[400px]"
        >
          <ResetPassword />
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
