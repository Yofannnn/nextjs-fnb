"use client";

import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useSession } from "@/stores/session.store";
import { useRouter } from "next/navigation";

type GuestCheckoutSuccessDialogProps = {
  open: boolean;
};

export function GuestCheckoutSuccessDialog({ open }: GuestCheckoutSuccessDialogProps) {
  const router = useRouter();
  const user = useSession((state) => state.user);

  if (user !== null) return null;

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Order Placed Successfully</AlertDialogTitle>
          <AlertDialogDescription>Your order has been placed successfully. Please check your email for payment instructions.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => router.replace("/")}>Continue to Home</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
