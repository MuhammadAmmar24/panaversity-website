// Payment Methods Data: used in Dashboard page, PaynowDialog.tsx component

interface PaymentMethod {
    id: string;
    name: string;
    description: string;
    info: string;
  }

export const paymentMethods: PaymentMethod[] = [
  {
    id: "blinq",
    name: "Blinq",
    description: "For Pakistani Students",
    info: "Pay from Internet/Mobile Banking, Credit/Debit Cards, Mobile Wallets",
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "For International Students",
    info: "Stripe offers global payment processing with support for multiple currencies",
  },
];