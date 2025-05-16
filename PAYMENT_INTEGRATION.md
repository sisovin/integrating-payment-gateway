# Payment Integration Guide

## Overview
This guide explains how to integrate PayWay and Bakong payment systems into the copa-starter-kit, following project conventions and security best practices.

---

## 1. Setup Instructions

1. **Install dependencies:**
   ```sh
   npm install convex @clerk/nextjs
   # and any payment SDKs as needed
   ```
2. **Copy environment variables:**
   ```sh
   cp .env.example .env.local
   # Fill in all required values
   ```
3. **Run Convex codegen:**
   ```sh
   npx convex dev & npx convex codegen
   ```
4. **Configure Clerk:**
   - Ensure Clerk is set up and middleware is active for all API routes.

---

## 2. Configuration Reference

See `.env.example` for all required variables:

- `PAYWAY_API_KEY`, `PAYWAY_MERCHANT_ID`, `PAYWAY_SECRET`, `PAYWAY_CALLBACK_URL`
- `BAKONG_CLIENT_ID`, `BAKONG_CLIENT_SECRET`, `BAKONG_API_URL`, `BAKONG_REDIRECT_URI`
- `PAYMENT_ENV` (development or production)

All configs are validated at runtime via `lib/auth.ts` and `lib/utils.ts`.

---

## 3. API Endpoints

- `POST /api/payments/payway` — Initiate PayWay payment
- `POST /api/payments/bakong` — Initiate Bakong payment
- `POST /api/payments/payway/callback` — PayWay callback handler
- `POST /api/payments/bakong/webhook` — Bakong webhook processor
- `GET  /api/payments/status?reference=...` — Poll payment status

All endpoints require Clerk authentication and are rate-limited.

---

## 4. Component Usage

Example (see `playground/page.tsx` for patterns):

```tsx
import { PaymentFormContainer } from "@/components/payments";

export default function FinancePage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Finance / Payments</h2>
      <PaymentFormContainer />
    </div>
  );
}
```

---

## 5. Error Handling

- All API routes return JSON with `error` and appropriate HTTP status codes.
- Client components display errors using shadcn-ui `Alert` components.
- Validation errors are thrown if configs are missing or invalid.

---

## 6. Required Permissions

- Users must be authenticated via Clerk.
- Only authorized users can initiate or poll payments.
- Webhook/callback endpoints should be restricted to trusted payment provider IPs.

---

## 7. Troubleshooting

- **Missing environment variables:** Ensure `.env.local` is complete and valid.
- **Convex errors:** Run `npx convex dev` and `npx convex codegen` after schema changes.
- **Auth errors:** Verify Clerk is configured and user is signed in.
- **Webhook issues:** Check provider dashboard and server logs for callback delivery.

---

## 8. Testing Procedures

- Use test credentials from PayWay and Bakong in development.
- Simulate callbacks/webhooks using tools like Postman or curl:
  ```sh
  curl -X POST http://localhost:3000/api/payments/payway/callback \
    -H "Content-Type: application/json" \
    -d '{"reference":"test-ref","status":"success"}'
  ```
- Check Convex dashboard for payment records.
- Validate UI updates and error handling in the browser.

---

## 9. Security Considerations

- All secrets are loaded from environment variables.
- Use HTTPS for all endpoints and callbacks.
- Validate all incoming webhook/callback requests (IP allowlist, signatures).
- Never log or expose sensitive credentials.
- Rotate credentials regularly and use least-privilege principles.

---

For more details, see the main `README.md` and provider documentation.
