"use client";

import * as React from "react";
import { useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IoClose } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // For the loading spinner

// Props for PaymentDialog
interface PaymentDialogProps {
  onConfirm: (paymentMethod: string) => void; // Function to call when the user confirms payment
  open: boolean; // State to control the dialog visibility
  onOpenChange: (open: boolean) => void; // Function to change the dialog visibility
}

export default function PaymentDialog({
  onConfirm,
  open,
  onOpenChange,
}: PaymentDialogProps) {
  const [selectedMethod, setSelectedMethod] = React.useState(""); // No default method selected
  const [isLoading, setIsLoading] = React.useState(false); // Loading state

  // Function to handle dialog close
  const handleClose = () => {
    setSelectedMethod(""); // Reset the selected payment method
    setIsLoading(false); // Reset loading state (optional, depending on your needs)
    onOpenChange(false); // Close the dialog
  };

  const handleConfirmClick = () => {
    setIsLoading(true); // Start loading state
    onConfirm(selectedMethod); // Proceed with payment confirmation
  };


  const paymentMethods = ["STRIPE"];

  // Automatically select Stripe if it's the only payment method
  useEffect(() => {
    if (paymentMethods.length === 1) {
      setSelectedMethod(paymentMethods[0]); // Automatically select "Stripe"
    }
  }, [paymentMethods]); // This runs whenever paymentMethods is updated

  return (
    <>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="z-40 fixed inset-0 bg-black/70 backdrop-blur-sm" />
          <Dialog.Content className="z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-md max-h-[85vh] overflow-y-auto">
            <Dialog.Title className="text-lg font-bold mb-4">
              Select Payment Method
            </Dialog.Title>
            <Dialog.Description className="mb-4">
              Please select your preferred payment method and confirm the
              payment.
            </Dialog.Description>

            <div className="mb-4">
              <label
                htmlFor="payment"
                className="block text-sm font-semibold mb-2"
              >
                Payment Method
              </label>
              {/* Only show the payment method dropdown if there's more than one method */}
              {paymentMethods.length > 1 ? (
                <div className="relative w-full">
                  <select
                    id="payment"
                    className={`w-full p-3 pr-10 border rounded-lg text-gray-700 focus:outline-none bg-transparent appearance-none ${selectedMethod ? "border-accent" : "border-neutral-400"
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
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
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
                <p className="w-full p-3 pr-10 border rounded-lg text-gray-700 focus:outline-none bg-transparent appearance-none border-accent">{paymentMethods[0]}</p> // Display Stripe directly when only one method is available
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={handleClose}
                className="bg-transparent border px-4 py-2 rounded-lg text-black hover:bg-gray-50 transition-all duration-300 ease-in-out"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmClick}
                disabled={!selectedMethod || isLoading} // Disable if no payment method is selected or during loading
                className={`bg-accent text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center ${!selectedMethod && !isLoading
                    ? "cursor-not-allowed opacity-70 bg-gray-600"
                    : "bg-accent"
                  }`}
              >
                {isLoading ? (
                  <>
                    <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  "Confirm Payment"
                )}
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
