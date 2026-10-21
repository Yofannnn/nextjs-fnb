import { OrderStatus, OrderSummary } from "@/features/order/types/order.type";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderListItem } from "@/features/order/components/online-order/list/OrderListItem";
import { OrderItemCardSkeleton } from "@/features/order/components/online-order/list/OrderListItemSkeleton";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { formatOrderStatus } from "@/features/order/utils/order.formatter";
import { OrderListEmpty } from "@/features/order/components/online-order/list/OrderListEmpty";
import { UseQueryResult } from "@tanstack/react-query";

interface OnlineOrderListProps {
  query: UseQueryResult<NoInfer<OrderSummary[]>, Error>;
  activeTab: OrderStatus;
  setActiveTab: (value: OrderStatus) => void;
}

const orderStatus = Object.values(OrderStatus);

export function OnlineOrderList({ query, activeTab, setActiveTab }: OnlineOrderListProps) {
  const { data = [], isLoading, error } = query;

  return (
    <section className="container mx-auto py-12 px-4 md:px-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Order history</h1>
        <p className="text-muted-foreground text-sm mt-1">Check the status of recent orders, manage returns, and discover similar products.</p>
      </div>

      <div className="py-4 mb-8 w-full overflow-x-auto">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as OrderStatus)}>
          <TabsList variant="line">
            {orderStatus.map((status) => (
              <TabsTrigger key={status} value={status}>
                {formatOrderStatus(status)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 5 }, (_, index) => <OrderItemCardSkeleton key={index} />)
        ) : error ? (
          <ErrorAlert className="mx-auto py-10" error={error} />
        ) : data.length === 0 ? (
          <OrderListEmpty />
        ) : (
          data.map((order) => <OrderListItem key={order.id} order={order} />)
        )}
      </div>
    </section>
  );
}
