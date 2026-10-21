"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PaymentActions } from "@/features/payment/components/detail/PaymentActions";
import { PaymentSummary } from "@/features/payment/components/detail/PaymentSummary";
import { PaymentDetail } from "@/features/payment/types/payment.type";
import { PaymentTransactionStatusBadge } from "@/features/payment/components/shared/PaymentTransactionStatusBadge";
import { LoadingBar } from "@/components/ui/loader";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { UseQueryResult } from "@tanstack/react-query";

interface PaymentDetailViewProps {
  query: UseQueryResult<NoInfer<PaymentDetail>, Error>;
}

export function PaymentDetailView({ query }: PaymentDetailViewProps) {
  const { data, isLoading, error } = query;

  if (isLoading) {
    return (
      <div className="w-full h-svh flex justify-center items-center">
        <LoadingBar />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-svh flex justify-center items-center">
        <ErrorAlert error={error} />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full h-svh flex justify-center items-center">
        <ErrorAlert error={{ message: "Payment not found" }} />
      </div>
    );
  }

  return (
    <div className="w-full h-svh flex justify-center items-center max-w-6xl mx-auto p-4 md:p-6">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4">
          <div className="flex-1 space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold">Payment Detail</h2>
            <h6 className="text-xs font-mono">#{data.id}</h6>
            <PaymentTransactionStatusBadge status={data.status} />
          </div>
          <PaymentActions />
        </CardHeader>
        <CardContent className="space-y-6">
          <PaymentSummary payment={data} />
        </CardContent>
      </Card>
    </div>
  );
}
