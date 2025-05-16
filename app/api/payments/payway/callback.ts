import { NextRequest, NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import { fetchAction } from "convex/next";
import { getAuth } from "@clerk/nextjs/server";
// import { rateLimit } from "@/lib/rate-limit"; // Implement or import your rate limiter

// TypeScript type for callback payload
interface PayWayCallbackPayload {
  reference: string;
  status: "pending" | "success" | "failed" | "cancelled";
  metadata?: any;
}

export async function POST(req: NextRequest) {
  // await rateLimit(req); // Uncomment if you have a rate limiter
  try {
    const { userId } = getAuth(req);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const payload = (await req.json()) as PayWayCallbackPayload;
    await fetchAction(api.payments_extended.handlePaymentWebhook, {
      reference: payload.reference,
      status: payload.status,
      metadata: payload.metadata,
    });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Callback failed" }, { status: 400 });
  }
}
