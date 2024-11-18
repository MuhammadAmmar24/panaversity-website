"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedQuarter: string;
  fullName: string;
  setFullName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  isButtonDisabled: boolean;
  handleCheckout: (e: React.FormEvent) => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  selectedQuarter,
  fullName,
  setFullName,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  isButtonDisabled,
  handleCheckout,
}) => {
  // State for Payment Method Dropdown
  const [paymentMethod, setPaymentMethod] = useState<string>("Stripe");

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <Dialog.Content className="fixed left-[50%] top-[50%] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-lg">
          <Dialog.Title className="text-xl font-semibold">
            Register for {selectedQuarter}
          </Dialog.Title>
          <Dialog.Description className="mb-4 mt-2">
            Please fill in the form below to register for {selectedQuarter}.
          </Dialog.Description>

          <div>
            <label className="mb-1 block font-medium">Payment Method</label>
            <select
              className="w-full rounded-md border px-4 py-2"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="Stripe">Stripe</option>
              <option value="Kuickpay">Kuickpay</option>
            </select>
          </div>
          <form className="space-y-4" onSubmit={handleCheckout}>
            <div>
              <label className="mb-1 block font-medium">Full Name</label>
              <input
                type="text"
                className="w-full rounded-md border px-4 py-2"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">Email Address</label>
              <input
                type="email"
                className="w-full rounded-md border px-4 py-2"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">Phone Number</label>
              <input
                type="tel"
                className="w-full rounded-md border px-4 py-2"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            {/* Payment Method Dropdown */}

            <button
              type="submit"
              className={`w-full py-2 ${
                isButtonDisabled ? "bg-gray-400" : "bg-blue-500"
              } rounded-md font-semibold text-white ${
                !isButtonDisabled && "hover:bg-blue-600"
              }`}
              disabled={isButtonDisabled}
            >
              Pay Now
            </button>
          </form>

          <Dialog.Close asChild>
            <button className="absolute right-2 top-2">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
