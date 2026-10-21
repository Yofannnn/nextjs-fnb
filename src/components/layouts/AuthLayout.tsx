"use client";

import Link from "next/link";
import { Suspense } from "react";
import { AuthOperationMode } from "@/features/auth/types/auth.dto";
import { AuthFormCard } from "@/features/auth/components/AuthFormCard";
import { usePathname } from "next/navigation";

interface AuthLayoutProps {
  children: React.ReactNode;
  page: AuthOperationMode;
  title: string;
  description: string;
}

export function AuthLayout({ children, page, title, description }: AuthLayoutProps) {
  const pathName = usePathname();

  return (
    <Suspense>
      <div className="w-full flex-col h-svh flex justify-center items-center px-4 py-16">
        <AuthFormCard page={page} title={title} description={description}>
          {children}
        </AuthFormCard>
        {pathName === "/register" && (
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
            By clicking continue, you agree to our <Link href="/terms">Terms of Service</Link> and <Link href="/privacy">Privacy Policy</Link>.
          </div>
        )}
      </div>
    </Suspense>
  );
}
