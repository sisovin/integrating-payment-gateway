
export async function initiatePayWayPayment({ amount, currency }: { amount: number; currency: string }) {
  const res = await fetch("/api/payments/payway", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, currency }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "PayWay payment failed");
  }
  return await res.json();
}

export async function handlePayWayWebhook(payload: any) {
  // TODO: Validate and process webhook, update payment status in Convex
  return { success: true };
}
