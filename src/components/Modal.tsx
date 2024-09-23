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
        <Dialog.Content className="fixed top-[50%] left-[50%] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] bg-white rounded-lg p-6 shadow-lg">
          <Dialog.Title className="text-xl font-semibold">
            Register for {selectedQuarter}
          </Dialog.Title>
          <Dialog.Description className="mt-2 mb-4">
            Please fill in the form below to register for {selectedQuarter}.
          </Dialog.Description>

          <div>
            <label className="block font-medium mb-1">Payment Method</label>
            <select
              className="w-full px-4 py-2 border rounded-md"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="Stripe">Stripe</option>
              <option value="Kuickpay">Kuickpay</option>
            </select>
          </div>
          <form className="space-y-4" onSubmit={handleCheckout}>
            <div>
              <label className="block font-medium mb-1">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                className="w-full px-4 py-2 border rounded-md"
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
              } text-white font-semibold rounded-md ${
                !isButtonDisabled && "hover:bg-blue-600"
              }`}
              disabled={isButtonDisabled}
            >
              Pay Now
            </button>
          </form>

          <Dialog.Close asChild>
            <button className="absolute top-2 right-2">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
