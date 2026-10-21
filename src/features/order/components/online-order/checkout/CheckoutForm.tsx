import { Control, Controller, FieldErrors, UseFormSetValue, useWatch } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DeliveryType } from "@/features/order/types/order.type";
import { CheckoutSchemaType } from "@/features/order/schemas/order.schema";
import { Input } from "@/components/ui/input";
import { useSession } from "@/stores/session.store";
import { OrderSchedule } from "./OrderSchedule";
import { DeliveryMap } from "./DeliveryMap";
import { useEffect } from "react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useDeliveryLocationStore } from "@/features/order/stores/delivery-location.store";
import Link from "next/link";
import { createRedirectUrl } from "@/lib/redirect";

interface CreateOnlineOrderFormProps {
  control: Control<CheckoutSchemaType>;
  errors: FieldErrors<CheckoutSchemaType>;
  setValue: UseFormSetValue<CheckoutSchemaType>;
  disabled?: boolean;
}

const deliveryTypes = [
  { value: DeliveryType.DELIVERY, label: "Delivery" },
  { value: DeliveryType.PICKUP, label: "Pickup" },
];

export function CreateOnlineOrderForm({ control, errors, setValue, disabled }: CreateOnlineOrderFormProps) {
  const { accessToken } = useSession();
  const isAuthenticated = accessToken !== null;
  const clearDeliveryLocation = useDeliveryLocationStore((state) => state.clearDeliveryLocation);

  const deliveryType = useWatch({
    control,
    name: "deliveryType",
  });

  useEffect(() => {
    if (deliveryType !== DeliveryType.DELIVERY) {
      setValue("deliveryLatitude", undefined);
      setValue("deliveryLongitude", undefined);
      setValue("deliveryAddress", undefined);

      clearDeliveryLocation();
    }
  }, [clearDeliveryLocation, deliveryType, setValue]);

  return (
    <>
      {!isAuthenticated && (
        <Controller
          name="guestEmail"
          control={control}
          render={({ field }) => (
            <Field>
              <div className="w-full flex justify-between items-center">
                <FieldLabel htmlFor="guestEmail">Email</FieldLabel>{" "}
                <Link href={createRedirectUrl("/login", "/checkout")} className="text-xs underline underline-offset-4 hover:text-muted-foreground">
                  Have an account? Login here
                </Link>
              </div>
              <Input
                id="guestEmail"
                type="email"
                placeholder="Enter product name"
                disabled={disabled}
                {...field}
                value={field.value ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value === "" ? undefined : value);
                }}
              />
              <FieldError>{errors.guestEmail?.message}</FieldError>
            </Field>
          )}
        />
      )}

      {!isAuthenticated && (
        <Controller
          name="guestName"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor="guestName">Name</FieldLabel>
              <Input
                id="guestName"
                type="text"
                placeholder="Enter your name"
                disabled={disabled}
                {...field}
                value={field.value ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value === "" ? undefined : value);
                }}
              />
              <FieldError>{errors.guestName?.message}</FieldError>
            </Field>
          )}
        />
      )}

      <Controller
        name="deliveryType"
        control={control}
        render={({ field }) => (
          <Field>
            <FieldLabel htmlFor="deliveryType">Delivery Type</FieldLabel>
            <Select items={deliveryTypes} id="deliveryType" name="deliveryType" disabled={disabled} value={field.value || ""} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                {deliveryTypes.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError>{errors.deliveryType?.message}</FieldError>
          </Field>
        )}
      />

      {deliveryType === DeliveryType.DELIVERY && <DeliveryMap errors={errors} setValue={setValue} />}

      <OrderSchedule errors={errors} setValue={setValue} />
    </>
  );
}
