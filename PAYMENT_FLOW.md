# Payment Flow Implementation Guide

## Overview
This document describes the complete payment flow for PayWay and Bakong in the copa-starter-kit, including routing, state management, schema, and security.

---

## 1. Payment Options in Dashboard
- `app/dashboard/finance/page.tsx` now links to `/payment/payway` and `/payment/bakong` for dedicated payment flows.
- Uses shadcn-ui `Card` and `Button` components for consistent UI.

## 2. Route Groups
- New route group: `app/payment/`
  - `payway/page.tsx` renders the PayWay payment component.
  - `bakong/page.tsx` renders the Bakong payment component.

## 3. Payment Components
- `components/payments/PayWayButton.tsx` and `BakongButton.tsx` handle payment initiation and loading state.
- Both use project-wide error handling and state conventions.

## 4. Convex Schema Extension
- `convex/schema.ts` now includes a `transactions` table:
  - Links to `payments` by `paymentId`
  - Tracks type (`charge`/`refund`), status, amount, currency, reference, and metadata

## 5. Environment Variables
- `.env.example` updated with all required PayWay and Bakong variables, plus environment selection.

## 6. Project Conventions
- **TypeScript:** All components and Convex functions are fully typed.
- **Error Handling:** All errors are surfaced to the UI and logged server-side.
- **Auth Validation:** Clerk is used for all user/session validation in API and UI.
- **State Management:** Convex is used for all persistent payment and transaction state.

## 7. Usage Example
```tsx
// In /dashboard/finance/page.tsx
<Link href="/payment/payway">Pay with PayWay</Link>
<Link href="/payment/bakong">Pay with Bakong</Link>
```

## 8. Security
- All secrets are loaded from environment variables.
- Webhook/callback endpoints must validate source and signatures.
- HTTPS is required for all production endpoints.

## 9. Testing
- See `PAYMENT_INTEGRATION.md` for a full testing plan, including unit, integration, and E2E tests.

---

For further details, see the main `README.md` and provider documentation.
