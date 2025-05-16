// Payment config types
export interface PayWayConfig {
  apiKey: string;
  merchantId: string;
  secret: string;
  callbackUrl: string;
}

export interface BakongConfig {
  clientId: string;
  clientSecret: string;
  apiUrl: string;
  redirectUri: string;
}

export interface PaymentEnvConfig {
  env: "development" | "production";
}

// Validation utilities
export function validatePayWayConfig(config: Partial<PayWayConfig>): asserts config is PayWayConfig {
  if (!config.apiKey || !config.merchantId || !config.secret || !config.callbackUrl) {
    throw new Error("Invalid PayWay configuration: missing required fields");
  }
}

export function validateBakongConfig(config: Partial<BakongConfig>): asserts config is BakongConfig {
  if (!config.clientId || !config.clientSecret || !config.apiUrl || !config.redirectUri) {
    throw new Error("Invalid Bakong configuration: missing required fields");
  }
}

export function validatePaymentEnvConfig(config: Partial<PaymentEnvConfig>): asserts config is PaymentEnvConfig {
  if (!config.env || (config.env !== "development" && config.env !== "production")) {
    throw new Error("Invalid PAYMENT_ENV value");
  }
}
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
