"use client";

import { useEffect, useState } from "react";
import { isOrderingAvailable, OPENING_TIME, ORDER_CUTOFF_TIME } from "@/features/order/utils/ordering-availability";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export function ClosedOrderAlertDialog() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(!isOrderingAvailable(new Date()));
  }, []);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Ordering is currently closed</AlertDialogTitle>
          <AlertDialogDescription>
            We&apos;re accepting orders from {OPENING_TIME} to {ORDER_CUTOFF_TIME}. If you still want to place an order, the order will be processed tomorrow.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => setIsOpen(false)}>Got it</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
