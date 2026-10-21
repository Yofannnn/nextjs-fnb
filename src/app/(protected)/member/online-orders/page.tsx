"use client";

import { useState } from "react";
import { OrderStatus, OrderType } from "@/features/order/types/order.type";
import { useOrdersQuery } from "@/features/order/hooks/useOrder";
import { OnlineOrderList } from "@/features/order/components/online-order/list/OnlineOrderList";

export default function MemberOnlineOrderListPage() {
  const [activeTab, setActiveTab] = useState<OrderStatus>(OrderStatus.CONFIRMED);
  const query = useOrdersQuery({ type: OrderType.ONLINE, status: activeTab });

  return <OnlineOrderList query={query} activeTab={activeTab} setActiveTab={setActiveTab} />;
}
