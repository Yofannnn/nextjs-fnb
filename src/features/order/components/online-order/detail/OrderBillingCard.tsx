"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/formatters/date.formatter";
import { OrderPaymentInfo, OrderStatus } from "@/features/order/types/order.type";
import { ArrowRight } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { formatPaymentMethod, formatPaymentStatus } from "@/features/payment/utils/payment.formatter";
import { useSession } from "@/stores/session.store";

interface OrderBillingCardProps {
  status: OrderStatus;
  payment: OrderPaymentInfo;
}

export function OrderBillingCard({ status, payment }: OrderBillingCardProps) {
  const router = useRouter();
  const params = useParams<{ orderId: string }>();
  const searchParams = useSearchParams();
  const orderId = params.orderId;
  const guestToken = searchParams.get("guestToken");
  const user = useSession((state) => state.user);
  const isAuth = user !== null;
  const paymentUrl = isAuth ? `/member/online-orders/${orderId}/payments/${payment.transactionId}` : `/guest/online-orders/${orderId}/payments/${payment.transactionId}?guestToken=${guestToken}`;

  if (status === OrderStatus.PENDING || status === OrderStatus.CANCELLED || status === OrderStatus.REJECTED) return null;

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <h4 className="font-semibold">Billing</h4>
      </CardHeader>
      <CardContent className="px-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Payment Method:</span>
          <span className="text-sm">{payment.method ? formatPaymentMethod(payment.method) : "-"}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Payment Status:</span>
          <span className="text-sm">{formatPaymentStatus(payment.status)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Paid At:</span>
          <span className="text-sm">{payment.paidAt ? formatDate(payment.paidAt) : "-"}</span>
        </div>
        <Separator className="my-6 h-0.5" />
        <Button type="button" variant="outline" className="w-full flex items-center justify-center" onClick={() => router.push(paymentUrl)}>
          Payment Detail
          <ArrowRight className="size-4 ml-0.5" />
        </Button>
      </CardContent>
    </Card>
  );
}
