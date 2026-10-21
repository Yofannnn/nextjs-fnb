"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UserRoleType } from "@/features/user/types/user.type";
import { useSession } from "@/stores/session.store";
import { Ellipsis } from "lucide-react";
import { OrderStatus } from "@/features/order/types/order.type";
import { formatOrderStatus } from "@/features/order/utils/order.formatter";

const ORDER_STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.REJECTED, OrderStatus.CANCELLED],
  [OrderStatus.CONFIRMED]: [OrderStatus.PREPARING, OrderStatus.CANCELLED],
  [OrderStatus.PREPARING]: [OrderStatus.READY, OrderStatus.CANCELLED],
  [OrderStatus.READY]: [OrderStatus.COMPLETED, OrderStatus.CANCELLED],
  [OrderStatus.COMPLETED]: [],
  [OrderStatus.CANCELLED]: [],
  [OrderStatus.REJECTED]: [],
};

export function OrderStatusChangeDropdown({ orderStatus }: { orderStatus: OrderStatus }) {
  const user = useSession((state) => state.user);

  if (!user || user.role !== UserRoleType.ADMIN) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost">
            <Ellipsis className="size-5" />
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Change Status to</DropdownMenuLabel>
          {ORDER_STATUS_TRANSITIONS[orderStatus].map((status) => (
            <DropdownMenuItem key={status}>{formatOrderStatus(status)}</DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
