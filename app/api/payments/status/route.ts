import { NextRequest, NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/next";
import { getAuth } from "@clerk/nextjs/server";
// import { rateLimit } from "@/lib/rate-limit";

interface StatusQuery {
  reference: string;
}

export async function GET(req: NextRequest) {
  // await rateLimit(req);
  try {
    const { userId } = getAuth(req);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { searchParams } = new URL(req.url);
    const reference = searchParams.get("reference");
    if (!reference) return NextResponse.json({ error: "Missing reference" }, { status: 400 });
    const payments = await fetchQuery(api.payments.getUserPayments, { userId });
    const payment = payments.find((p: any) => p.reference === reference);
    if (!payment) return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    return NextResponse.json({ status: payment.status, updatedAt: payment.updatedAt });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Status polling failed" }, { status: 400 });
  }
}
