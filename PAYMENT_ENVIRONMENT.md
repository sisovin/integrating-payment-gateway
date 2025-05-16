# Payment Integration Environment Configuration

## Required Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```
# PayWay
PAYWAY_API_KEY=your_payway_api_key
PAYWAY_MERCHANT_ID=your_payway_merchant_id
PAYWAY_SECRET=your_payway_secret
PAYWAY_CALLBACK_URL=https://yourdomain.com/api/payments/payway/callback

# Bakong
BAKONG_CLIENT_ID=your_bakong_client_id
BAKONG_CLIENT_SECRET=your_bakong_client_secret
BAKONG_API_URL=https://bakong.example.com/api
BAKONG_REDIRECT_URI=https://yourdomain.com/api/payments/bakong/webhook

# Common
PAYMENT_ENV=development # or production
```

## TypeScript Types
- See `lib/utils.ts` for `PayWayConfig`, `BakongConfig`, and `PaymentEnvConfig`.

## Validation Utilities
- Use `validatePayWayConfig`, `validateBakongConfig`, and `validatePaymentEnvConfig` from `lib/utils.ts` to ensure all required fields are present.

## Runtime Checks
- Use `getPayWayConfig`, `getBakongConfig`, and `getPaymentEnvConfig` from `lib/auth.ts` to safely access and validate configs at runtime.

## Production vs Development
- Set `PAYMENT_ENV` to `production` in your production environment. Use different credentials and endpoints for each environment.
- Never commit real secrets to version control.

## Security Considerations
- All secrets must be loaded from environment variables, not hardcoded.
- Validate all configs at startup and before use.
- Use HTTPS for all callback/redirect URLs.
- Restrict callback/webhook endpoints to trusted sources (e.g., IP allowlist, signature verification).
- Rotate credentials regularly and use least-privilege principles.

---

For more details, see the main `README.md` and provider documentation.
