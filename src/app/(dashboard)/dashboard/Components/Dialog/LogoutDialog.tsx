"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { IoClose } from "react-icons/io5";

interface LogoutDialogProps {
  onConfirm: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LogoutDialog({
  onConfirm,
  open,
  onOpenChange,
}: LogoutDialogProps) {
  const handleClose = () => onOpenChange(false);

  return (
    <>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto rounded-lg bg-white p-6">
            <Dialog.Title className="mb-4 text-lg font-bold">
              Confirm Logout
            </Dialog.Title>
            <Dialog.Description className="mb-4">
              Are you sure you want to logout?
            </Dialog.Description>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleClose}
                className="rounded-lg border bg-transparent px-4 py-2 text-black transition-all duration-300 ease-in-out hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleClose();
                  onConfirm();
                }}
                className="hover:shadow-mdtransition-all rounded-lg border border-red-600 bg-transparent px-4 py-2 text-red-600 duration-300 ease-in-out hover:bg-red-600 hover:text-white"
              >
                Logout
              </button>
            </div>
            <Dialog.Close asChild>
              <button
                className="absolute right-4 top-4 p-1"
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