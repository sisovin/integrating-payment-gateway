import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createPayment = mutation({
  args: {
    userId: v.string(),
    provider: v.string(),
    amount: v.number(),
    currency: v.string(),
    reference: v.string(),
    status: v.string(),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("payments", {
      ...args,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const updatePaymentStatus = mutation({
  args: {
    reference: v.string(),
    status: v.string(),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const payment = await ctx.db
      .query("payments")
      .filter((q) => q.eq(q.field("reference"), args.reference))
      .first();
    if (!payment) throw new Error("Payment not found");
    await ctx.db.patch(payment._id, {
      status: args.status,
      metadata: args.metadata,
      updatedAt: Date.now(),
    });
    return true;
  },
});

export const getUserPayments = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("payments")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();
  },
});
