"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { initiatePayWayPayment } from "@/lib/payments/payway";

export function PayWayButton({ amount, currency }: { amount: number; currency: string }) {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    await initiatePayWayPayment({ amount, currency });
    setLoading(false);
  };

  return (
    <Button onClick={handlePay} disabled={loading}>
      {loading ? "Processing..." : "Pay with PayWay"}
    </Button>
  );
}
