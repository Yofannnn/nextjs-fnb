"use client";

import React from "react";
import { useParams } from "next/navigation";
import { usePaymentById } from "@/features/payment/hooks/usePayment";
import { PaymentDetailView } from "@/features/payment/components/detail/PaymentDetailView";

export default function MemberPaymentDetailPage() {
  const params = useParams<{ orderId: string; paymentId: string }>();
  const paymentId = params.paymentId;
  const orderId = params.orderId;
  const query = usePaymentById({ orderId, paymentId });

  return <PaymentDetailView query={query} />;
}
