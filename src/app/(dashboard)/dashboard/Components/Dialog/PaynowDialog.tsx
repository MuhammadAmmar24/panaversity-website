"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { PaymentDialogProps } from "../../types/types";

export default function PaymentDialog({
  onConfirm,
  open,
  onOpenChange,
}: PaymentDialogProps) {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<string[]>(["STRIPE"]);

  const handleClose = () => {
    setSelectedMethod("");
    setIsLoading(false);
    onOpenChange(false);
  };

  const handleConfirmClick = () => {
    setIsLoading(true);
    onConfirm(selectedMethod);
  };

  useEffect(() => {
    if (paymentMethods.length === 1) {
      setSelectedMethod(paymentMethods[0]);
    }
  }, [paymentMethods]);

  return (
    <>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto rounded-lg bg-white p-6">
            <Dialog.Title className="mb-4 text-lg font-bold">
              Select Payment Method
            </Dialog.Title>
            <Dialog.Description className="mb-4">
              Please select your preferred payment method and confirm the
              payment.
            </Dialog.Description>

            <div className="mb-4">
              <label
                htmlFor="payment"
                className="mb-2 block text-sm font-semibold"
              >
                Payment Method
              </label>

              {paymentMethods.length > 1 ? (
                <div className="relative w-full">
                  <select
                    id="payment"
                    className={`w-full appearance-none rounded-lg border bg-transparent p-3 pr-10 text-gray-700 focus:outline-none ${selectedMethod ? "border-accent" : "border-neutral-400"
                      }`}
                    value={selectedMethod}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                    disabled={isLoading}
                  >
                    <option value="" disabled hidden>
                      Select Payment Method
                    </option>
                    {paymentMethods.map((payment) => (
                      <option key={payment} value={payment}>
                        {payment}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              ) : (
                <p className="w-full appearance-none rounded-lg border border-accent bg-transparent p-3 pr-10 text-gray-700 focus:outline-none">
                  {paymentMethods[0]}
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={handleClose}
                className="rounded-lg border bg-transparent px-4 py-2 text-black transition-all duration-300 ease-in-out hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmClick}
                disabled={!selectedMethod || isLoading}
                className={`flex items-center justify-center rounded-lg bg-accent px-4 py-2 text-white transition-all duration-300 ease-in-out ${!selectedMethod && !isLoading
                    ? "cursor-not-allowed bg-gray-600 opacity-70"
                    : "bg-accent"
                  }`}
              >
                {isLoading ? (
                  <>
                    <AiOutlineLoading3Quarters className="mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Confirm Payment"
                )}
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