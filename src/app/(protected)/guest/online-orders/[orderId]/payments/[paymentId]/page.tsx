"use client";

import React from "react";
import { useParams, useSearchParams } from "next/navigation";
import { usePaymentById } from "@/features/payment/hooks/usePayment";
import { PaymentDetailView } from "@/features/payment/components/detail/PaymentDetailView";

export default function GuestPaymentDetailPage() {
  const params = useParams<{ orderId: string; paymentId: string }>();
  const paymentId = params.paymentId;
  const orderId = params.orderId;
  const searchParams = useSearchParams();
  const guestToken = searchParams.get("guestToken");
  const query = usePaymentById({ orderId, paymentId, guestToken: guestToken ?? undefined });

  return <PaymentDetailView query={query} />;
}
