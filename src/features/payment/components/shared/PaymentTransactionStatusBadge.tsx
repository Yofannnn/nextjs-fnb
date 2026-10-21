import { PaymentTransactionStatus } from "@/features/payment/types/payment.type";
import { Badge } from "@/components/ui/badge";
import { AlertCircleIcon, CheckCircleIcon, ClockIcon, XCircleIcon } from "lucide-react";
import { formatPaymentTransactionStatus } from "@/features/payment/utils/payment.formatter";
import { cn } from "@/lib/class-name.util";

const getStatusConfig = (status: PaymentTransactionStatus) => {
  const configs = {
    [PaymentTransactionStatus.PENDING]: {
      icon: ClockIcon,
      className: "bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100",
    },
    [PaymentTransactionStatus.SUCCESS]: {
      icon: CheckCircleIcon,
      className: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
    },
    [PaymentTransactionStatus.FAILED]: {
      icon: XCircleIcon,
      className: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",
    },
    [PaymentTransactionStatus.EXPIRED]: {
      icon: AlertCircleIcon,
      className: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100",
    },
    [PaymentTransactionStatus.CANCELLED]: {
      icon: XCircleIcon,
      className: "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100",
    },
  };
  return configs[status] || configs[PaymentTransactionStatus.PENDING];
};

export function PaymentTransactionStatusBadge({ status }: { status: PaymentTransactionStatus }) {
  const { icon: Icon, className } = getStatusConfig(status);

  return (
    <Badge variant="outline" className={cn("flex items-center gap-1.5 px-3 py-1.5 text-xs md:text-sm font-medium border transition-colors", className)}>
      <Icon className="h-3.5 w-3.5" />
      {formatPaymentTransactionStatus(status)}
    </Badge>
  );
}
