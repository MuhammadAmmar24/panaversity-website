"use client";

import * as React from "react";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IoClose } from "react-icons/io5";

// Props for LogoutDialog
interface LogoutDialogProps {
  onConfirm: () => void; // Function to call when the user confirms logout
}

export default function LogoutDialog({ onConfirm }: LogoutDialogProps) {
  const [open, setOpen] = useState(false);

  // Function to handle dialog close
  const handleClose = () => setOpen(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-transparent border-0 text-black">

      </button>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="z-40 fixed inset-0 bg-black/70 backdrop-blur-sm" />
          <Dialog.Content className="z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-md max-h-[85vh] overflow-y-auto">
            <Dialog.Title className="text-lg font-bold mb-4">
              Confirm Logout
            </Dialog.Title>
            <Dialog.Description className="mb-4">
              Are you sure you want to logout?
            </Dialog.Description>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleClose}
                className="bg-gray-300 px-4 py-2 rounded text-black"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleClose();
                  onConfirm(); // Call the logout action if confirmed
                }}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>
            <Dialog.Close asChild>
              <button
                className="absolute top-4 right-4 p-1"
                aria-label="Close"
                onClick={handleClose}
              >
                <IoClose />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
