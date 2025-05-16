import { BakongButton } from "@/components/payments/BakongButton";

export default function BakongPaymentPage() {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Bakong Payment</h2>
      <BakongButton amount={100} currency="USD" />
    </div>
  );
}
