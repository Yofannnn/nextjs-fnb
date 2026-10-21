export enum PaymentStatus {
  UNPAID = "UNPAID",
  PAID = "PAID",
  PARTIALLY_PAID = "PARTIALLY_PAID",
  REFUNDED = "REFUNDED",
  FAILED = "FAILED",
}

export enum PaymentMethod {
  CASH = "CASH",
  CARD = "CARD",
  QRIS = "QRIS",
  E_WALLET = "E_WALLET",
  BANK_TRANSFER = "BANK_TRANSFER",
  OTHER = "OTHER",
}

export enum PaymentTransactionStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  EXPIRED = "EXPIRED",
  CANCELLED = "CANCELLED",
}

export enum PaymentTransactionType {
  CHARGE = "CHARGE",
  REFUND = "REFUND",
}

export interface PaymentDetail {
  id: string;
  orderId: string;
  type: PaymentTransactionType;
  amount: number;
  method: PaymentMethod | null;
  status: PaymentTransactionStatus;
  parentTransactionId: string | null;
  completedAt: Date | null;
  createdAt: Date;
}
