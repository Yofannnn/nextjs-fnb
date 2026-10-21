import { cn } from "@/lib/class-name.util";
import React from "react";

export function LoadingBar({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-row gap-2", className)}>
      <div className="w-3 h-10 rounded-lg bg-foreground animate-bounce"></div>
      <div className="w-3 h-10 rounded-lg bg-foreground animate-bounce [animation-delay:-.3s]"></div>
      <div className="w-3 h-10 rounded-lg bg-foreground animate-bounce [animation-delay:-.5s]"></div>
    </div>
  );
}

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div className="relative size-24 md:size-28">
        <div className="absolute w-full h-full rounded-full border-[3px] border-muted border-r-foreground border-b-foreground animate-spin duration-[3s]" />
        <div className="absolute w-full h-full rounded-full border-[3px] border-muted border-t-foreground animate-spin duration-[2s] direction-reverse" />
      </div>
      <div className="absolute inset-0 bg-linear-to-tr from-foreground/10 via-transparent to-foreground/5 animate-pulse rounded-full blur-sm" />
    </div>
  );
}

export function LoadingDot({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-row gap-2", className)}>
      <div className="size-2 md:size-3 rounded-full bg-foreground animate-bounce"></div>
      <div className="size-2 md:size-3 rounded-full bg-foreground animate-bounce [animation-delay:-.3s]"></div>
      <div className="size-2 md:size-3 rounded-full bg-foreground animate-bounce [animation-delay:-.5s]"></div>
    </div>
  );
}
