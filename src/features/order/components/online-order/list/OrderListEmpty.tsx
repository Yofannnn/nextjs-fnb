"use client";

import { cn } from "@/lib/class-name.util";

export function OrderListEmpty({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12", className)}>
      <h2 className="text-lg font-semibold text-muted-foreground">No orders found</h2>
    </div>
  );
}
