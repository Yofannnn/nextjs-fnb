"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ComponentRenderFn, DialogTriggerState, HTMLProps } from "@base-ui/react";
import { useLogout } from "@/features/auth/hooks/useAuthMutations";

export function AuthLogOutDialog({ children }: { children?: ComponentRenderFn<HTMLProps, DialogTriggerState> }) {
  const router = useRouter();
  const mutation = useLogout();

  const handleLogout = async () => {
    await mutation.mutateAsync();
    router.replace("/");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}>
      <AlertDialog>
        <AlertDialogTrigger
          render={
            children ?? (
              <Button variant="destructive" className="w-full">
                <LogOutIcon />
                <p>Log out</p>
              </Button>
            )
          }
        />
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <LogOutIcon />
            </AlertDialogMedia>
            <AlertDialogTitle>Log out</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to log out?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={handleLogout}>
              Log out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}
