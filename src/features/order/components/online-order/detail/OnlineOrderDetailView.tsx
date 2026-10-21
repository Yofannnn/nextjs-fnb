import { OrderBillingCard } from "@/features/order/components/online-order/detail/OrderBillingCard";
import { OrderDeliveryLocation } from "@/features/order/components/online-order/detail/OrderDeliveryLocation";
import { OrderSummary } from "@/features/order/components/online-order/detail/OrderSummary";
import { OrderInfoCard } from "@/features/order/components/online-order/detail/OrderInfoCard";
import { OnlineOrderDetail } from "@/features/order/types/order.type";
import { OrderTrackingCard } from "@/features/order/components/online-order/detail/OrderTrackingCard";
import { LoadingBar } from "@/components/ui/loader";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { UseQueryResult } from "@tanstack/react-query";

interface OnlineOrderDetailViewProps {
  query: UseQueryResult<NoInfer<OnlineOrderDetail>, Error>;
}

export function OnlineOrderDetailView({ query }: OnlineOrderDetailViewProps) {
  const { data, isLoading, error } = query;

  if (isLoading) {
    return (
      <div className="w-full h-svh flex justify-center items-center p-4">
        <LoadingBar />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-svh flex justify-center items-center p-4">
        <ErrorAlert error={error} />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full h-svh flex justify-center items-center p-4">
        <ErrorAlert error={{ message: "Order not found" }} />
      </div>
    );
  }

  return (
    <section className="container mx-auto py-20 px-4 md:px-8">
      <h2 className="text-2xl font-bold tracking-tight">Order Detail</h2>

      <div className="mt-8 grid gap-6 lg:grid-cols-12 md:grid-cols-6">
        <div className="lg:col-span-8 md:col-span-6 space-y-6">
          <OrderInfoCard order={data} />
          <OrderTrackingCard order={data} />
        </div>

        <div className="lg:col-span-4 md:col-span-6 space-y-6">
          <OrderSummary pricing={data.pricing} deliveryType={data.fulfillment.deliveryType} />
          <OrderBillingCard status={data.status} payment={data.payment} />
          <OrderDeliveryLocation deliveryType={data.fulfillment.deliveryType} deliveryLocation={data.fulfillment.deliveryLocation} />
        </div>
      </div>
    </section>
  );
}
