"use client";

import { FormProvider } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { LoadingBar } from "@/components/ui/loader";
import { SubmitButton } from "@/components/shared/SubmitButton";
import { useOnlineOrderItems, useOnlineOrderQuote } from "@/features/order/hooks/useOnlineOrder";
import { CreateOnlineOrderForm } from "@/features/order/components/online-order/checkout/CheckoutForm";
import { useCreateOnlineOrder } from "@/features/order/hooks/useOnlineOrderMutations";
import { useOnlineOrderForm } from "@/features/order/hooks/useOnlineOrderForm";
import { OnlineOrderSummary } from "@/features/order/components/online-order/checkout/OnlineOrderSummary";
import { CheckoutEmptyState } from "@/features/order/components/online-order/checkout/CheckoutEmptyState";
import { CheckoutErrorState } from "@/features/order/components/online-order/checkout/CheckoutErrorState";
import { CheckoutItemList } from "@/features/order/components/online-order/checkout/CheckoutItemList";
import { ClosedOrderAlertDialog } from "@/features/order/components/online-order/checkout/ClosedOrderAlertDialog";
import { GuestCheckoutSuccessDialog } from "@/features/order/components/online-order/checkout/GuestCheckoutSuccessDialog";

export default function CheckoutPage() {
  const { data: checkoutItems, isLoading: isCheckoutItemsLoading, error: checkoutItemsError } = useOnlineOrderItems();
  const { data: quote } = useOnlineOrderQuote();
  const form = useOnlineOrderForm();
  const mutation = useCreateOnlineOrder();

  const onSubmit = form.handleSubmit((values) => {
    mutation.mutate(values);
  });

  if (isCheckoutItemsLoading)
    return (
      <div className="w-full h-svh flex flex-col gap-4 justify-center items-center">
        <LoadingBar />
      </div>
    );

  if (checkoutItemsError) return <CheckoutErrorState />;

  if (!checkoutItems.products.length) return <CheckoutEmptyState />;

  return (
    <div className="w-full pt-20 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 sm:px-6 md:px-8">
        <div className="order-2 md:order-1 col-span-1 px-2 mb-6 md:mb-0">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Billing Information</h2>
          <div>
            <FormProvider {...form}>
              <form onSubmit={onSubmit}>
                <div className="space-y-3 mb-6">
                  <CreateOnlineOrderForm control={form.control} errors={form.formState.errors} setValue={form.setValue} disabled={mutation.isPending} />
                </div>
                <SubmitButton className="mt-20 mb-4 w-full" isSubmitting={mutation.isPending} submitText="Place order" />
              </form>
            </FormProvider>
          </div>
        </div>
        <div className="col-span-1 px-2 mb-6 order-1 md:order-2">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Order Summary</h2>
          <CheckoutItemList checkoutItems={checkoutItems.products} />
          <Separator className="w-full bg-muted-foreground my-4" />
          {quote && <OnlineOrderSummary subtotal={quote.subtotal} tax={quote.tax} serviceCharge={quote.serviceCharge} deliveryFee={quote.deliveryFee} discount={quote.discount} total={quote.total} />}
        </div>
      </div>
      <ClosedOrderAlertDialog />
      <GuestCheckoutSuccessDialog open={mutation.isSuccess} />
    </div>
  );
}
