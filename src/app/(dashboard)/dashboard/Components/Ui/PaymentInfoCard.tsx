import { Badge } from "@/src/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { PaymentHistoryCard } from "@/src/lib/schemas/payment";
import {
  BookOpenIcon,
  CalendarIcon,
  CreditCardIcon,
  DollarSignIcon,
} from "lucide-react";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
  });
};

const getCurrencySymbol = (currencyCode: number) => {
  const currencyMap: { [key: number]: string } = {
    1: "PKR",
    2: "$",
  };
  return currencyMap[currencyCode] || "$";
};

const PaymentInfoCard: React.FC<{ payment: PaymentHistoryCard }> = ({ payment }) => {

  return (
    <Card className="w-full max-w-[37rem] overflow-hidden transition-all duration-300 md:hover:scale-105 md:hover:shadow-lg">
      <CardHeader className="bg-gradient-to-br from-teal-900 via-teal-600 to-teal-900 pb-8 text-primary-foreground">
        <div className="">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg font-semibold text-white">
              {payment.course_code}
            </CardTitle>
            <Badge
              variant={payment.is_paid ? "default" : "destructive"}
              className="px-2 py-1 text-xs uppercase"
            >
              {payment.is_paid ? "Paid" : "Unpaid"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-2 pt-0 mobileM:p-4">
        <div className="-mt-8 flex flex-col space-y-4 rounded-t-xl bg-card p-4 shadow-md mobileM:-mt-10 sm:-mt-12 md:-mt-10 lg:-mt-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DollarSignIcon className="h-5 w-5 text-primary" />
              <p className="text-sm font-medium">Amount</p>
            </div>
            <p className="text-lg font-bold">
              {getCurrencySymbol(payment.payment_currency!)}{" "}
              {payment.payment_amount!.toFixed(2)}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CreditCardIcon className="h-5 w-5 text-primary" />
              <p className="text-sm font-medium">Payment Method</p>
            </div>
            <p className="text-sm">{payment.vendor_name}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Payment Date</span>
            </div>
            <span className="text-sm">{payment.payment_date ? formatDate(payment.payment_date) : "--"}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted p-4 text-xs text-muted-foreground">
        <div className="flex w-full items-center justify-between">
          <p>
            <span className="font-semibold">Voucher ID: </span>
            {payment.voucher_id}
          </p>
          {/* <span>Created: {formatDate(payment.created_at)}</span> */}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PaymentInfoCard;
