import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function OrderItemCardSkeleton() {
  return (
    <Card className="border shadow-sm overflow-hidden">
      <div className="px-4 py-3 bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="w-full flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-x-6 gap-y-2 text-sm overflow-hidden">
          <div className="w-full sm:w-fit flex items-center gap-1">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        <div className="w-full sm:w-fit flex justify-between items-center gap-2 ml-auto sm:ml-0">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>
    </Card>
  );
}
