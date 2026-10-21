"use client";

import { useParams } from "next/navigation";

export default function AdminOnlineOrderDetailPage() {
  const params = useParams<{ orderId: string }>();
  const orderId = params.orderId;

  return <div className="w-full flex justify-center items-center py-60">Admin Online Order Detail Page {orderId}</div>;
}
