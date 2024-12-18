"use client";

import { Button } from "@/src/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import { paymentMethods } from "@/src/constants/paymentMethods";
import * as Dialog from "@radix-ui/react-dialog";
import { Check, Info } from "lucide-react";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { PaymentDialogProps } from "../../types/types";

export default function PaymentDialog({
  onConfirm,
  open,
  onOpenChange,
}: PaymentDialogProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    if (isLoading) {
      return;
    }

    onOpenChange(false);
  };

  const handleConfirmClick = async () => {
    setIsLoading(true);
    try {
      await onConfirm(selectedMethod);
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog.Root
        open={open}
        onOpenChange={(isOpen) => {
          if (!isLoading) {
            onOpenChange(isOpen); // Prevent closing when loading
          }
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            onClick={(e) => {
              if (isLoading) e.stopPropagation(); // Prevent overlay click closing when loading
            }}
          />
          <Dialog.Content
            className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-full max-w-[300px] -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto rounded-lg bg-white p-6 mobileM:max-w-[350px] ssm:max-w-md"
            onInteractOutside={(e) => {
              if (isLoading) e.preventDefault(); // Prevent interaction outside dialog when loading
            }}
          >
            <Dialog.Title className="mb-4 text-lg font-bold sm:text-xl">
              Select Payment Method
            </Dialog.Title>

            <Dialog.Description className="mb-4 text-sm font-light text-gray-800">
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

              <RadioGroup
                value={selectedMethod}
                onValueChange={setSelectedMethod}
                className="gap-3"
              >
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`flex items-center gap-3 rounded-lg border p-4 transition-colors ${selectedMethod === method.id ? "border-accent bg-primary/5" : "hover:bg-muted"} `}
                  >
                    <RadioGroupItem value={method.id} id={method.id} />
                    <label
                      htmlFor={method.id}
                      className="flex-1 cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{method.name}</span>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <Info className="h-4 w-4" />
                              <span className="sr-only">More info</span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            side="bottom"
                            align="end"
                            className="w-80"
                          >
                            <p className="text-sm">{method.info}</p>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm text-muted-foreground">
                          {method.description}
                        </p>
                        {selectedMethod === method.id && (
                          <Check className="h-5 w-5 shrink-0 text-green-600" />
                        )}
                      </div>
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="flex justify-end space-x-4 text-sm xs:text-base">
              <button
                disabled={isLoading}
                onClick={handleClose}
                className={`rounded-lg border bg-transparent px-4 py-2 text-black transition-all duration-300 ease-in-out hover:bg-gray-50 ${isLoading && "cursor-not-allowed opacity-60"}`}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmClick}
                disabled={!selectedMethod || isLoading}
                className={`flex min-w-[145px] items-center justify-center rounded-lg bg-accent px-4 py-2 text-white transition-all duration-300 ease-in-out xs:min-w-[162px] ${
                  !selectedMethod && !isLoading
                    ? "cursor-not-allowed bg-gray-600 opacity-70"
                    : "bg-accent"
                } ${isLoading && "cursor-not-allowed opacity-60"}`}
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
