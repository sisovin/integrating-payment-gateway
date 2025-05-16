import { validatePayWayConfig, validateBakongConfig, validatePaymentEnvConfig } from "./utils";

export function getPayWayConfig() {
  const config = {
    apiKey: process.env.PAYWAY_API_KEY,
    merchantId: process.env.PAYWAY_MERCHANT_ID,
    secret: process.env.PAYWAY_SECRET,
    callbackUrl: process.env.PAYWAY_CALLBACK_URL,
  };
  validatePayWayConfig(config);
  return config;
}

export function getBakongConfig() {
  const config = {
    clientId: process.env.BAKONG_CLIENT_ID,
    clientSecret: process.env.BAKONG_CLIENT_SECRET,
    apiUrl: process.env.BAKONG_API_URL,
    redirectUri: process.env.BAKONG_REDIRECT_URI,
  };
  validateBakongConfig(config);
  return config;
}

export function getPaymentEnvConfig() {
  const config = {
    env: process.env.PAYMENT_ENV as "development" | "production",
  };
  validatePaymentEnvConfig(config);
  return config;
}
