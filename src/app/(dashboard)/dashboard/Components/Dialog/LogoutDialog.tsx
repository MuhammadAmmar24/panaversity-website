"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IoClose } from "react-icons/io5";

// Props for LogoutDialog
interface LogoutDialogProps {
  onConfirm: () => void; // Function to call when the user confirms logout
  open: boolean; // State to control the dialog visibility
  onOpenChange: (open: boolean) => void; // Function to change the dialog visibility
}

export default function LogoutDialog({
  onConfirm,
  open,
  onOpenChange,
}: LogoutDialogProps) {
  // Function to handle dialog close
  const handleClose = () => onOpenChange(false);

  return (
    <>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
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
                className="bg-transparent border px-4 py-2 rounded-lg text-black hover:bg-gray-50 transition-all duration-300 ease-in-out"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleClose();
                  onConfirm(); // Call the logout action if confirmed
                }}
                className="bg-transparent text-red-600 px-4 py-2 rounded-lg border border-red-600 hover:bg-red-600 hover:text-white hover:shadow-mdtransition-all duration-300 ease-in-out"
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
