import PaymentInfoCard from "../Components/Ui/PaymentInfoCard";

interface PaymentInfo {
  course_code: string;
  voucher_id: string;
  paid_through: number;
  payment_date: string;
  payment_provider: string;
  payment_amount: number;
  student_course_id: number;
  payment_currency: number;
  course_name: string;
  created_at: string;
  paid_on: string;
  is_paid: boolean;
}

const PaymentHistory: React.FC = async () => {
  const paymentHistory: PaymentInfo[] = [
    {
      course_code: "AI-101",
      voucher_id: "8925383e-c51a-43a9-b69e-87e28f7028ed",
      paid_through: 3,
      payment_date: "2025-01-15T10:53:21",
      payment_provider: "blinq",
      payment_amount: 7000,
      student_course_id: 24,
      payment_currency: 1,
      course_name: "Modern AI Python Programming",
      created_at: "2025-01-15T05:52:36.587087",
      paid_on: "2025-01-15T05:52:36.587099",
      is_paid: true,
    },
    {
      course_code: "AI-101",
      voucher_id: "8925383e-c51a-43a9-b69e-87e28f7028ed",
      paid_through: 3,
      payment_date: "2025-01-15T10:53:21",
      payment_provider: "blinq",
      payment_amount: 7000,
      student_course_id: 24,
      payment_currency: 1,
      course_name: "Modern AI Python Programming",
      created_at: "2025-01-15T05:52:36.587087",
      paid_on: "2025-01-15T05:52:36.587099",
      is_paid: false,
    },
  ];

  return (
    <div className="py-2 sm:py-4 md:py-6 lg:py-8">
      <div className="mb-8 rounded-lg bg-white p-4 shadow-lg sm:p-6">
        <h1 className="text-2xl font-bold sm:text-3xl">Payment History</h1>
        <p className="pt-2">Stay updated with your transaction records.</p>
      </div>

      <div className="3xl:grid-cols-3 grid justify-items-center gap-8 md:grid-cols-2">
        {paymentHistory.map((payment) => (
          <PaymentInfoCard key={payment.voucher_id} payment={payment} />
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
