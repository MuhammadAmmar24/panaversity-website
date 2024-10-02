"use client";

import * as React from "react";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { LoginForm } from "./login-form";
import { IoClose } from "react-icons/io5";

export default function LoginDialog() {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => isOpen ? setOpen(true) : router.back()}>
      <Dialog.Portal>
        <Dialog.Overlay className="z-40 fixed inset-0 bg-black/70 backdrop-blur-sm" />
        <Dialog.Content className="z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background rounded-lg p-6 w-full max-w-md max-h-[85vh] overflow-y-auto">
          <Dialog.Title className="text-lg font-bold mb-4">
            Login
          </Dialog.Title>
          <LoginForm  />
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