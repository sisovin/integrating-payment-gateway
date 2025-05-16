"use client";
import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, User, Calendar, KeyRound } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { PaymentMethodLogo } from "./PaymentMethodLogo";

// TypeScript interfaces
export interface PaymentFormValues {
  amount: number;
  currency: string;
  method: "payway" | "bakong";
}

export interface PaymentFormProps {
  defaultCurrency?: string;
  onSuccess?: (reference: string) => void;
}

export function PaymentForm({ defaultCurrency = "USD", onSuccess }: PaymentFormProps) {
  const [values, setValues] = useState<PaymentFormValues>({ amount: 0, currency: defaultCurrency, method: "payway" });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // Card input handlers
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and spaces, format as 1234 5678 9012 3456
    let value = e.target.value.replace(/[^0-9]/g, "");
    value = value.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(value.slice(0, 19));
  };
  const handleCardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setCardName(e.target.value);
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Format as MM/YY
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 2) value = value.slice(0,2) + "/" + value.slice(2,4);
    setExpiry(value.slice(0,5));
  };
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => setCvv(e.target.value.replace(/[^0-9]/g, "").slice(0,3));

  const handleMethodChange = (value: "payway" | "bakong") => {
    setValues((prev) => ({ ...prev, method: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    // Basic validation
    if (!cardNumber || cardNumber.replace(/\s/g, "").length !== 16) {
      setError("Please enter a valid card number.");
      return;
    }
    if (!cardName) {
      setError("Please enter the cardholder name.");
      return;
    }
    if (!expiry || !/^\d{2}\/\d{2}$/.test(expiry)) {
      setError("Please enter a valid expiry date (MM/YY).");
      return;
    }
    if (!cvv || cvv.length !== 3) {
      setError("Please enter a valid 3-digit CVV.");
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onSuccess?.("demo-reference");
    }, 1200);
    // Here you would call your payment API
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit} autoComplete="off">
        <CardHeader className="pb-2">
          <h3 className="text-xl font-bold text-center">Payment Gateway</h3>
          <p className="text-sm text-muted-foreground text-center mt-1">Complete your payment using one of our supported payment methods</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="mb-6 border-b">
              <div className="flex w-full">
                <RadioGroup value={values.method} onValueChange={handleMethodChange} className="flex w-full">
                  <div className="flex w-full">
                    <label 
                      htmlFor="payway" 
                      className={`flex-1 flex items-center justify-center py-3 px-4 cursor-pointer transition-colors border-b-2 ${values.method === 'payway' ? 'border-primary font-semibold' : 'border-transparent'}`}
                    >
                      <RadioGroupItem value="payway" id="payway" disabled={processing} className="hidden" />
                      <PaymentMethodLogo method="payway" className="h-5 w-auto" />
                    </label>
                    <label 
                      htmlFor="bakong" 
                      className={`flex-1 flex items-center justify-center py-3 px-4 cursor-pointer transition-colors border-b-2 ${values.method === 'bakong' ? 'border-primary font-semibold' : 'border-transparent'}`}
                    >
                      <RadioGroupItem value="bakong" id="bakong" disabled={processing} className="hidden" />
                      <PaymentMethodLogo method="bakong" className="h-5 w-auto" />
                    </label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
          <div className="rounded-lg">
            <h4 className="font-semibold text-base">Credit Card Payment</h4>
            <p className="text-xs text-muted-foreground mb-5">Enter your card details to complete payment</p>
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardNumber" className="flex items-center gap-1 mb-1.5"> <CreditCard className="w-4 h-4 text-muted-foreground" /> Card Number</Label>
                <Input id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" autoComplete="cc-number" required disabled={processing} value={cardNumber} onChange={handleCardNumberChange} inputMode="numeric" maxLength={19} className="border-gray-200 focus:ring-0 focus:border-gray-300" />
              </div>
              <div>
                <Label htmlFor="cardName" className="flex items-center gap-1 mb-1.5"> <User className="w-4 h-4 text-muted-foreground" /> Cardholder Name</Label>
                <Input id="cardName" name="cardName" placeholder="John Doe" autoComplete="cc-name" required disabled={processing} value={cardName} onChange={handleCardNameChange} className="border-gray-200 focus:ring-0 focus:border-gray-300" />
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Label htmlFor="expiry" className="flex items-center gap-1 mb-1.5"> <Calendar className="w-4 h-4 text-muted-foreground" /> Expiry Date</Label>
                  <Input id="expiry" name="expiry" placeholder="MM/YY" autoComplete="cc-exp" required disabled={processing} value={expiry} onChange={handleExpiryChange} maxLength={5} className="border-gray-200 focus:ring-0 focus:border-gray-300" />
                </div>
                <div className="flex-1">
                  <Label htmlFor="cvv" className="flex items-center gap-1 mb-1.5"> <KeyRound className="w-4 h-4 text-muted-foreground" /> CVV</Label>
                  <Input id="cvv" name="cvv" placeholder="123" autoComplete="cc-csc" required disabled={processing} value={cvv} onChange={handleCvvChange} maxLength={3} type="password" className="border-gray-200 focus:ring-0 focus:border-gray-300" />
                </div>
              </div>
            </div>
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={processing} className="w-full font-bold text-base h-11 bg-black hover:bg-black/90 text-white pt-8">
            {processing ? (
              <span className="flex items-center justify-center gap-2"><svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>Processing...</span>
            ) : "Pay Now"}
          </Button>
        </CardFooter>
      </form>
      <div className="text-center text-xs text-muted-foreground mt-4 mb-2">
        Secure payments powered by PayWay and Bakong<br />
        Having trouble? <a href="#" className="underline hover:text-primary">Contact support</a>
      </div>
    </Card>
  );
}
