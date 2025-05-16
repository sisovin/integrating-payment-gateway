import { mutation, query, action } from "./_generated/server";
import { v } from "convex/values";

// TypeScript types matching schema.ts
type PaymentStatus = "pending" | "success" | "failed" | "cancelled";

type PaymentProvider = "payway" | "bakong";

export interface PaymentIntentInput {
  userId: string;
  provider: PaymentProvider;
  amount: number;
  currency: string;
  reference: string;
  metadata?: any;
}

export interface TransactionRecord {
  paymentId: string;
  status: PaymentStatus;
  processedAt: number;
  receiptUrl?: string;
}

// Payment intent creation (with error handling)
export const createPaymentIntent = mutation({
  args: {
    userId: v.string(),
    provider: v.union(v.literal("payway"), v.literal("bakong")),
    amount: v.number(),
    currency: v.string(),
    reference: v.string(),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    try {
      // Example: check user exists (auth pattern)
      const user = await ctx.db.query("users").filter(q => q.eq(q.field("userId"), args.userId)).first();
      if (!user) throw new Error("User not found");
      // Example: check subscription (subscription model)
      // const subscription = await ctx.db.query("subscriptions").filter(q => q.eq(q.field("userId"), args.userId)).first();
      // if (!subscription) throw new Error("No active subscription");
      const paymentId = await ctx.db.insert("payments", {
        ...args,
        status: "pending",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      return { paymentId };
    } catch (err: any) {
      // Error handling (auth.config.ts style)
      throw new Error(err.message || "Failed to create payment intent");
    }
  },
});

// Webhook handler (for payment provider callbacks)
export const handlePaymentWebhook = action({
  args: {
    reference: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("success"),
      v.literal("failed"),
      v.literal("cancelled")
    ),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    try {
      const payment = await ctx.db.query("payments").filter(q => q.eq(q.field("reference"), args.reference)).first();
      if (!payment) throw new Error("Payment not found");
      await ctx.db.patch(payment._id, {
        status: args.status,
        metadata: args.metadata,
        updatedAt: Date.now(),
      });
      // Record transaction
      // await ctx.db.insert("transactions", { paymentId: payment._id, status: args.status, processedAt: Date.now() });
      return { ok: true };
    } catch (err: any) {
      throw new Error(err.message || "Webhook processing failed");
    }
  },
});

// Transaction recording (for finance/page.ts)
export const recordTransaction = mutation({
  args: {
    paymentId: v.id("payments"),
    status: v.union(
      v.literal("pending"),
      v.literal("success"),
      v.literal("failed"),
      v.literal("cancelled")
    ),
    receiptUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    try {
      // Optionally, create a transactions table for detailed logs
      // await ctx.db.insert("transactions", { ...args, processedAt: Date.now() });
      // Update payment status
      await ctx.db.patch(args.paymentId, {
        status: args.status,
        updatedAt: Date.now(),
      });
      return { ok: true };
    } catch (err: any) {
      throw new Error(err.message || "Transaction recording failed");
    }
  },
});

// Receipt generation (stub)
export const generateReceipt = action({
  args: { paymentId: v.id("payments") },
  handler: async (ctx, args) => {
    try {
      const payment = await ctx.db.get(args.paymentId);
      if (!payment) throw new Error("Payment not found");
      // Generate a receipt URL or object (stub)
      const receiptUrl = `/receipts/${payment.reference}`;
      // Optionally, update payment or transaction with receiptUrl
      return { receiptUrl };
    } catch (err: any) {
      throw new Error(err.message || "Receipt generation failed");
    }
  },
});
