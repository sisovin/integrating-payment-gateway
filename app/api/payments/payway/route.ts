import { NextRequest, NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import { getAuth } from "@clerk/nextjs/server";
import { fetchMutation } from "convex/next";

// Simulate PayWay API call and return a fake reference
async function callPayWayAPI({ amount, currency }: { amount: number; currency: string }) {
  // In production, call the real PayWay API here
  return { reference: `payway-${Date.now()}` };
}

export async function POST(req: NextRequest) {
  const { amount, currency } = await req.json();
  const { userId } = getAuth(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Call PayWay API to create payment
  const { reference } = await callPayWayAPI({ amount, currency });

  // Create payment record in Convex
  await fetchMutation(api.payments.createPayment, {
    userId,
    provider: "payway",
    amount,
    currency,
    reference,
    status: "pending",
  });

  // Return reference to client (could be used for redirect, etc.)
  return NextResponse.json({ reference });
}
