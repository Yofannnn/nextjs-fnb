"use client";

import Script from "next/script";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { LoadingBar } from "@/components/ui/loader";
import { usePaymentFlow } from "@/features/payment/hooks/usePaymentFlow";

export default function PayOnlineOrderPage() {
  const params = useParams<{ orderId: string }>();
  const orderId = params.orderId;
  const searchParams = useSearchParams();
  const guestToken = searchParams.get("guestToken");

  const [snapLoaded, setSnapLoaded] = useState(false);

  const { errorInitiating, errorPaying } = usePaymentFlow({ orderId, snapLoaded, guestToken: guestToken ?? undefined });

  return (
    <>
      <Script
        id="midtrans-snap"
        src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL}
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="afterInteractive"
        onLoad={() => setSnapLoaded(true)}
      />

      <div className="flex h-svh w-full items-center justify-center p-4">{errorInitiating || errorPaying ? <ErrorAlert error={errorInitiating || errorPaying} /> : <LoadingBar />}</div>
    </>
  );
}
