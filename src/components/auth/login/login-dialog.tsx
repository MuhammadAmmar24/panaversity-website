"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { LoginForm } from "./login-form";

export default function LoginDialog() {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => (isOpen ? setOpen(true) : router.back())}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-1/2 z-50 max-h-[94dvh] min-w-[18rem] max-w-sm -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto rounded-lg bg-background p-6 sm:w-full"
        >
          <Dialog.Title className="mb-4 text-lg font-bold">Login</Dialog.Title>
          <LoginForm />
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
