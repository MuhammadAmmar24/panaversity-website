"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import ResendLink from "./resendLink";

export default function ResendLinkDialog() {
  const [open, setOpen] = useState(true);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[300px] -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto rounded-lg bg-background p-8 mobileM:w-[350px] xs:w-[400px] md:w-[400px]"
        >
          <Dialog.Title className="mb-4 text-lg font-bold">
            Resend Email
          </Dialog.Title>

          <ResendLink />
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
