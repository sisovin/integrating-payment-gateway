
import React from "react";
import { PaymentFormContainer } from "@/components/payments/PaymentFormContainer";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="w-full max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Payment Gateway</h1>
          <p className="text-muted-foreground mt-2">
            Complete your payment using one of our supported payment methods
          </p>
        </div>

        <PaymentFormContainer />        
      </div>
    </div>
  );
}
