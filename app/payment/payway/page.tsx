import { PayWayButton } from "@/components/payments/PayWayButton";

export default function PayWayPaymentPage() {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">PayWay Payment</h2>
      <PayWayButton amount={100} currency="USD" />
    </div>
  );
}
