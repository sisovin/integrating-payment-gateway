import { NextRequest, NextResponse } from "next/server";
import { handlePaymentCallback } from "@/lib/payments/common";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = await handlePaymentCallback(body);
  return NextResponse.json(result);
}
