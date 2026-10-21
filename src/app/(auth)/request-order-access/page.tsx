"use client";

import { Suspense, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RequestOrderAccessForm } from "@/features/order/components/guest/RequestOrderAccessForm";
import { useGuestRequestOrderAccessForm } from "@/features/order/hooks/useRequestOrderAccessForm";
import { useSearchParams } from "next/navigation";
import { useGuestRequestOrderAccess } from "@/features/order/hooks/useRequestOrderAccessMutation";
import { FormProvider } from "react-hook-form";
import { SubmitButton } from "@/components/shared/SubmitButton";

export default function RequestOrderAccessPage() {
  return (
    <Suspense>
      <RequestOrderAccess />
    </Suspense>
  );
}

function RequestOrderAccess() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const form = useGuestRequestOrderAccessForm();
  const mutation = useGuestRequestOrderAccess();

  const onSubmit = form.handleSubmit((values) => mutation.mutate(values));

  useEffect(() => {
    if (orderId) form.setValue("orderId", orderId);
  }, [orderId, form]);

  return (
    <main className="w-full flex-col h-svh flex justify-center items-center px-4 py-16">
      <Card className="max-w-md w-full mx-4 my-10 shadow-lg">
        <CardHeader>
          <CardTitle>Renew Access Order</CardTitle>
          <CardDescription>Please enter your order ID and email address to renew your access order.</CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={onSubmit} className="space-y-6">
              <RequestOrderAccessForm control={form.control} errors={form.formState.errors} disabled={mutation.isPending} />
              <SubmitButton className="w-full" isSubmitting={mutation.isPending} />
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </main>
  );
}
