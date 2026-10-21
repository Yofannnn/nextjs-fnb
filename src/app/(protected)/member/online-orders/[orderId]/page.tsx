"use client";

import { useParams } from "next/navigation";
import { useOrderById } from "@/features/order/hooks/useOrder";
import { OrderType } from "@/features/order/types/order.type";
import { OnlineOrderDetailView } from "@/features/order/components/online-order/detail/OnlineOrderDetailView";

export default function MemberOnlineOrderDetailPage() {
  const params = useParams<{ orderId: string }>();
  const orderId = params.orderId;
  const query = useOrderById(orderId, OrderType.ONLINE);

  return <OnlineOrderDetailView query={query} />;
}
