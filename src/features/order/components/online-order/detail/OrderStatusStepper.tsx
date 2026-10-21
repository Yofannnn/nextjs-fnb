import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Store, CheckCircle2, Clock, Bike, ClipboardCheck, CookingPot, X } from "lucide-react";
import { cn } from "@/lib/class-name.util";
import { DeliveryType, OrderStatus } from "@/features/order/types/order.type";
import { Button } from "@/components/ui/button";

interface StepProps {
  active?: boolean;
  completed?: boolean;
  icon?: React.ReactNode;
  label: string;
  description?: string;
}

interface StepperProps {
  activeStep: number;
  children: React.ReactElement<StepProps>[];
}

function Step({ active, completed, icon, label, description }: StepProps) {
  const getStepStyles = () => {
    if (completed || active) return "bg-primary text-primary-foreground";
    return "bg-muted text-muted-foreground border-2 border-border";
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn("size-8 md:size-10 lg:size-12 rounded-full flex items-center justify-center font-medium transition-all duration-300", getStepStyles())}>
        {completed ? <CheckCircle2 className="w-5 h-5" /> : icon}
      </div>
      <div className="text-center space-y-0.5 pt-1">
        <p className={cn("text-xs md:text-sm font-semibold transition-colors whitespace-nowrap", active ? "text-primary" : completed ? "text-primary" : "text-muted-foreground")}>{label}</p>
        {description && <p className="text-[9px] md:text-xs text-muted-foreground hidden md:block whitespace-nowrap">{description}</p>}
      </div>
    </div>
  );
}

function Stepper({ activeStep, children }: StepperProps) {
  const totalSteps = React.Children.count(children);
  const gridCols = totalSteps * 2 - 1;

  return (
    <div className="w-full">
      <div
        className="grid items-start"
        style={{
          gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
        }}
      >
        {React.Children.map(children, (child, index) => {
          const isActive = index === activeStep;
          const isCompleted = index < activeStep;
          const isLast = index === totalSteps - 1;

          return (
            <>
              <div className="flex flex-col items-center">
                {React.cloneElement(child, {
                  active: isActive,
                  completed: isCompleted,
                })}
              </div>

              {!isLast && <div className={cn("h-0.5 self-start mt-4 md:mt-5 lg:mt-6 transition-all duration-500", isCompleted ? "bg-primary" : "bg-muted")} />}
            </>
          );
        })}
      </div>
    </div>
  );
}

export function OrderStatusStepper({ orderId, orderStatus, deliveryType = DeliveryType.DELIVERY }: { orderId: string; orderStatus: OrderStatus; deliveryType?: DeliveryType }) {
  const route = useRouter();
  const searchParams = useSearchParams();
  const guestToken = searchParams.get("guestToken");

  const getActiveStep = (status: OrderStatus): number => {
    switch (status) {
      case OrderStatus.PENDING:
      case OrderStatus.CONFIRMED:
        return 0;
      case OrderStatus.PREPARING:
        return 1;
      case OrderStatus.READY:
        return deliveryType === DeliveryType.PICKUP ? 2 : 2;
      case OrderStatus.COMPLETED:
        return deliveryType === DeliveryType.PICKUP ? 3 : 3;
      case OrderStatus.CANCELLED:
      case OrderStatus.REJECTED:
        return 0;
      default:
        return 0;
    }
  };

  const getSteps = () => {
    if (deliveryType === DeliveryType.PICKUP) {
      return [
        { icon: <ClipboardCheck className="size-5 lg:size-6" />, label: "Confirmed" },
        { icon: <CookingPot className="size-5 lg:size-6" />, label: "Preparing" },
        { icon: <Store className="size-5 lg:size-6" />, label: "Ready for Pickup" },
        { icon: <CheckCircle2 className="size-5 lg:size-6" />, label: "Picked Up" },
      ];
    }

    return [
      { icon: <ClipboardCheck className="size-5 lg:size-6" />, label: "Confirmed" },
      { icon: <CookingPot className="size-5 lg:size-6" />, label: "Preparing" },
      { icon: <Bike className="size-5 lg:size-6" />, label: "On the Way" },
      { icon: <CheckCircle2 className="size-5 lg:size-6" />, label: "Delivered" },
    ];
  };

  const steps = getSteps();
  const activeStep = getActiveStep(orderStatus);

  if (orderStatus === OrderStatus.PENDING) {
    return (
      <div className="flex items-center justify-center w-full px-4 py-6">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <div className="size-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
            <Clock className="w-6 h-6 text-yellow-500" />
          </div>
          <p className="text-sm font-semibold">Awaiting Payment</p>
          <Button type="button" variant="outline" onClick={() => route.push(`/checkout/pay/${orderId}${guestToken ? `?guestToken=${guestToken}` : ""}`)}>
            Please complete your payment
          </Button>
        </div>
      </div>
    );
  }

  if (orderStatus === OrderStatus.CANCELLED || orderStatus === OrderStatus.REJECTED) {
    return (
      <div className="flex items-center justify-center w-full px-4 py-6">
        <div className="flex flex-col items-center gap-2 text-destructive">
          <div className="size-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <X />
          </div>
          <p className="text-sm font-semibold text-destructive">{orderStatus === OrderStatus.CANCELLED ? "Order Cancelled" : "Order Rejected"}</p>
        </div>
      </div>
    );
  }

  return (
    <Stepper activeStep={activeStep}>
      {steps.map((step, index) => (
        <Step key={index} icon={step.icon} label={step.label} />
      ))}
    </Stepper>
  );
}
