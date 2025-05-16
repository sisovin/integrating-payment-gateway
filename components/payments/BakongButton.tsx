"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { initiateBakongPayment } from "@/lib/payments/bakong";

export function BakongButton({ amount, currency }: { amount: number; currency: string }) {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    await initiateBakongPayment({ amount, currency });
    setLoading(false);
  };

  return (
    <Button onClick={handlePay} disabled={loading}>
      {loading ? "Processing..." : "Pay with Bakong"}
    </Button>
  );
}
