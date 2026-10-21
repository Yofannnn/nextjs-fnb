import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { CheckoutSchemaType } from "@/features/order/schemas/order.schema";
import { useEffect, useMemo, useState } from "react";
import { FieldErrors, UseFormSetValue } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { formatDate } from "@/lib/formatters/date.formatter";
import { toast } from "sonner";

interface OrderScheduleProps {
  setValue: UseFormSetValue<CheckoutSchemaType>;
  errors: FieldErrors<CheckoutSchemaType>;
}

const openingStore = process.env.NEXT_PUBLIC_OPENING_STORE!;
const closeOrder = process.env.NEXT_PUBLIC_CLOSE_ORDER!;

export function OrderSchedule({ errors, setValue }: OrderScheduleProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");

  const scheduledAt = useMemo(() => {
    if (!selectedDate || !selectedTime) return undefined;

    const [hours, minutes] = selectedTime.split(":").map(Number);

    const result = new Date(selectedDate);
    result.setHours(hours, minutes, 0, 0);

    return result;
  }, [selectedDate, selectedTime]);

  useEffect(() => {
    if (!scheduledAt) {
      setValue("scheduledAt", undefined);
      return;
    }

    if (scheduledAt < new Date()) {
      toast.error("Selected time is in the past.");

      setSelectedDate(undefined);
      setSelectedTime("");
      setValue("scheduledAt", undefined);
      return;
    }

    setValue("scheduledAt", scheduledAt.toISOString());
  }, [scheduledAt, setValue]);

  const handleDateChange = (date?: Date) => {
    if (!date) return;
    setSelectedDate(date);
  };

  const handleTimeChange = (time: string) => {
    if (time < openingStore || time > closeOrder) return;
    setSelectedTime(time);
  };

  const handleCancelSchedule = () => {
    setValue("scheduledAt", undefined);
    setSelectedDate(undefined);
    setSelectedTime("");
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Field>
            <FieldLabel htmlFor="scheduledAt">Scheduled at</FieldLabel>
            <Input id="scheduledAt" value={scheduledAt ? formatDate(scheduledAt, { dateStyle: "long" }) : "Schedule delivery?"} readOnly />
            <FieldError>{errors.scheduledAt?.message}</FieldError>
          </Field>
        }
        nativeButton={false}
      />
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Schedule</DialogTitle>
          <DialogDescription>Pick a date and time to schedule your order.</DialogDescription>
        </DialogHeader>
        <div>
          <Card className="mx-auto w-fit">
            <CardContent>
              <Calendar mode="single" selected={selectedDate} defaultMonth={selectedDate} captionLayout="dropdown" onSelect={handleDateChange} />
            </CardContent>
            <CardFooter className="border-t bg-card">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="time">Time</FieldLabel>
                  <Input
                    id="schedule-time"
                    type="time"
                    min={openingStore}
                    max={closeOrder}
                    step={60}
                    value={selectedTime}
                    onChange={(e) => handleTimeChange(e.target.value)}
                    className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  />
                </Field>
              </FieldGroup>
            </CardFooter>
          </Card>
        </div>
        <DialogFooter>
          <DialogClose
            render={
              <Button type="button" variant="outline" onClick={handleCancelSchedule}>
                Cancel
              </Button>
            }
          />
          <DialogClose render={<Button type="button">Save changes</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
