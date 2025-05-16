"use client";
import { useState } from "react";
import { PaymentForm } from "./PaymentForm";
import { PaymentFormSuccess } from "./PaymentFormSuccess";

export function PaymentFormContainer() {
  const [reference, setReference] = useState<string | null>(null);

  if (reference) {
    return (
      <div className="w-full">
        <PaymentFormSuccess reference={reference} onReset={() => setReference(null)} />
      </div>
    );
  }

  return (
    <div className="w-full">
      <PaymentForm onSuccess={setReference} />
    </div>
  );
}
