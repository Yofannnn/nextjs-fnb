"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { AppNavigation } from "@/components/layouts/AppNavigation";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppNavigation />
          {children}
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </NextThemesProvider>
  );
}
