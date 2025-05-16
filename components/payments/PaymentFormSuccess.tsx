import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export interface PaymentFormSuccessProps {
  reference: string;
  onReset?: () => void;
}

export function PaymentFormSuccess({ reference, onReset }: PaymentFormSuccessProps) {
  return (
    <Card className="w-full max-w-lg mx-auto text-center">
      <CardContent className="flex flex-col items-center justify-center py-8">
        <CheckCircle2 className="w-12 h-12 text-green-500 mb-2" />
        <div className="font-semibold text-lg mb-1">Payment Successful!</div>
        <div className="text-muted-foreground text-sm mb-2">Reference: {reference}</div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" onClick={onReset} className="w-full">
          Make Another Payment
        </Button>
      </CardFooter>
    </Card>
  );
}
