"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useParams, useRouter } from "next/navigation";

interface GuestOrderAccessExpiredDialogProps {
  open: boolean;
}

export function GuestOrderAccessExpiredDialog({ open }: GuestOrderAccessExpiredDialogProps) {
  const router = useRouter();
  const params = useParams<{ orderId: string }>();
  const orderId = params.orderId;

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Order access expired</AlertDialogTitle>
          <AlertDialogDescription>Your order access has expired, please request a new one.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => router.replace("/")}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => router.replace(`/request-order-access?orderId=${orderId}`)}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
