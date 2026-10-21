import { PaymentDetail, PaymentMethod, PaymentTransactionType } from "@/features/payment/types/payment.type";
import { CalendarIcon, CreditCardIcon, DollarSignIcon, ReceiptIcon, BanknoteIcon, QrCodeIcon, WalletIcon, Building2Icon, MoreHorizontalIcon, ArrowLeftRightIcon, RotateCcwIcon } from "lucide-react";
import { formatCurrencyToIDR } from "@/lib/formatters/currency.formatter";
import { formatDate } from "@/lib/formatters/date.formatter";
import { formatPaymentMethod, formatPaymentType } from "@/features/payment/utils/payment.formatter";

const getMethodIcon = (method: PaymentMethod | null) => {
  if (!method) return CreditCardIcon;
  const icons = {
    [PaymentMethod.CASH]: BanknoteIcon,
    [PaymentMethod.CARD]: CreditCardIcon,
    [PaymentMethod.QRIS]: QrCodeIcon,
    [PaymentMethod.E_WALLET]: WalletIcon,
    [PaymentMethod.BANK_TRANSFER]: Building2Icon,
    [PaymentMethod.OTHER]: MoreHorizontalIcon,
  };
  return icons[method] || CreditCardIcon;
};

const getTypeIcon = (type: PaymentTransactionType) => {
  const icons = {
    [PaymentTransactionType.CHARGE]: ArrowLeftRightIcon,
    [PaymentTransactionType.REFUND]: RotateCcwIcon,
  };
  return icons[type] || ArrowLeftRightIcon;
};

interface PaymentSummaryProps {
  payment: PaymentDetail;
}

export function PaymentSummary({ payment }: PaymentSummaryProps) {
  const summaryItems = [
    { label: "Order ID", value: payment.orderId, icon: ReceiptIcon },
    { label: "Amount", value: formatCurrencyToIDR(payment.amount), icon: DollarSignIcon },
    { label: "Method", value: payment.method ? formatPaymentMethod(payment.method) : "N/A", icon: getMethodIcon(payment.method) },
    { label: "Type", value: formatPaymentType(payment.type), icon: getTypeIcon(payment.type) },
    { label: "Created", value: formatDate(payment.createdAt), icon: CalendarIcon },
    { label: "Completed", value: payment.completedAt ? formatDate(payment.completedAt) : "N/A", icon: CalendarIcon },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 p-4 bg-muted/30 rounded-lg">
      {summaryItems.map((item, index) => (
        <div key={index} className="bg-muted/30 rounded-lg p-3">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {item.icon && <item.icon className="h-4 w-4" />}
              <span>{item.label}</span>
            </div>
            <div className="font-medium text-foreground">{item.value || "N/A"}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
