import Image from "next/image";
import React from "react";

export function PaymentMethodLogo({ method, className }: { method: "payway" | "bakong"; className?: string }) {
  if (method === "payway") {
    return (
      <Image
        src="/aba-payway-logo.svg"
        alt="ABA PayWay"
        width={32}
        height={16}
        className={className}
        priority
      />
    );
  }  if (method === "bakong") {
    return (
      <Image
        src="/bakong-logo-orange.svg"
        alt="Bakong"
        width={32}
        height={16}
        className={className}
        priority
      />
    );
  }
  return null;
}
