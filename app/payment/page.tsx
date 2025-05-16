import { PaymentFormContainer } from "@/components/payments/PaymentFormContainer";

export default function PaymentPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="w-full max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Complete Your Payment</h1>
          <p className="text-muted-foreground mt-2">
            Select your preferred payment method below
          </p>
        </div>
        
        <PaymentFormContainer />
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Secure payments powered by PayWay and Bakong</p>
          <p className="mt-2">
            Having trouble?{" "}
            <a href="#" className="underline hover:text-primary">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
