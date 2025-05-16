import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export function PaymentStatus({ status }: { status: string }) {
  if (!status) return null;
  return (
    <Alert>
      <AlertTitle>Payment Status</AlertTitle>
      <AlertDescription>{status}</AlertDescription>
    </Alert>
  );
}
