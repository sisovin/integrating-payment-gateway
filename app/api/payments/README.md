# Payment API Routes

This folder contains Next.js API routes for payment provider integrations:

- `payway/route.ts`: Handles PayWay payment requests and webhooks
- `bakong/route.ts`: Handles Bakong payment requests and webhooks
- `callback/route.ts`: Unified callback handler (optional)

These routes call utility functions in `lib/payments/` and update payment state in Convex.
