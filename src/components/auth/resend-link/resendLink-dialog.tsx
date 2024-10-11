"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import ResendLink from "./resendLink";
import { IoClose } from "react-icons/io5";

export default function ResendLinkDialog() {
  const [open, setOpen] = useState(true);
  

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="z-40 fixed inset-0 bg-black/70 backdrop-blur-sm" />
        <Dialog.Content className="z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background rounded-lg p-8 w-full max-w-md max-h-[85vh] overflow-y-auto">
        <Dialog.Title className="text-lg font-bold mb-4">
            Verify Your Email
          </Dialog.Title>
          <ResendLink />
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
