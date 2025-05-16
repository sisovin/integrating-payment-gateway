import { NextRequest, NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import { fetchAction } from "convex/next";
import { getAuth } from "@clerk/nextjs/server";
// import { rateLimit } from "@/lib/rate-limit";

interface BakongWebhookPayload {
  reference: string;
  status: "pending" | "success" | "failed" | "cancelled";
  metadata?: any;
}

export async function POST(req: NextRequest) {
  // await rateLimit(req);
  try {
    const { userId } = getAuth(req);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const payload = (await req.json()) as BakongWebhookPayload;
    await fetchAction(api.payments_extended.handlePaymentWebhook, {
      reference: payload.reference,
      status: payload.status,
      metadata: payload.metadata,
    });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Webhook failed" }, { status: 400 });
  }
}
