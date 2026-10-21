import { PaymentMethod, PaymentStatus, PaymentTransactionStatus, PaymentTransactionType } from "@/features/payment/types/payment.type";

export function formatPaymentMethod(method: PaymentMethod): string {
  return method
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function formatPaymentType(type: PaymentTransactionType): string {
  return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
}

export function formatPaymentStatus(status: PaymentStatus): string {
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}

export function formatPaymentTransactionStatus(status: PaymentTransactionStatus): string {
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}
