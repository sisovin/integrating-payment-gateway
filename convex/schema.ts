import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  payments: defineTable({
    userId: v.string(), // Clerk user ID
    provider: v.union(v.literal("payway"), v.literal("bakong")),
    amount: v.number(),
    currency: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("success"),
      v.literal("failed"),
      v.literal("cancelled")
    ),
    reference: v.string(), // Payment reference/ID from provider
    metadata: v.optional(v.any()), // Extra info (e.g., webhook payload)
    createdAt: v.number(),
    updatedAt: v.number(),
  }),
  transactions: defineTable({
    paymentId: v.id("payments"),
    type: v.union(v.literal("charge"), v.literal("refund")),
    status: v.union(
      v.literal("pending"),
      v.literal("success"),
      v.literal("failed"),
      v.literal("cancelled")
    ),
    amount: v.number(),
    currency: v.string(),
    reference: v.string(),
    metadata: v.optional(v.any()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),
});
