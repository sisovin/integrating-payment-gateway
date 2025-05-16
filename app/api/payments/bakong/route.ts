import { NextRequest, NextResponse } from "next/server";
import { handleBakongWebhook } from "@/lib/payments/bakong";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = await handleBakongWebhook(body);
  return NextResponse.json(result);
}
