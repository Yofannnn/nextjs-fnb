"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "@/stores/session.store";
import { UserRoleType } from "@/features/user/types/user.type";
import { AuthLogOutDialog } from "@/features/auth/components/AuthLogOutDialog";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Command } from "lucide-react";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useSession((s) => s.user);
  const hasHydrated = useSession((s) => s._hasHydrated);
  const isAuthorized = user?.role !== UserRoleType.MEMBER;

  useEffect(() => {
    if (!hasHydrated) return;
    if (!isAuthorized) router.replace("/");
  }, [hasHydrated, isAuthorized, router]);

  if (!hasHydrated || !isAuthorized) return null;

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
      defaultOpen={false}
    >
      <Sidebar variant="inset">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                render={
                  <div>
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-foreground text-background">
                      <Command className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">Dashboard</span>
                      <span className="truncate text-xs">Enterprise</span>
                    </div>
                  </div>
                }
              ></SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Order</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuButton render={<Link href="/admin/online-orders">Online Order</Link>} />
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Product</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuButton render={<Link href="/admin/products">Product Management</Link>} />
              <SidebarMenuButton render={<Link href="/admin/product-categories">Product Category Management</Link>} />
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <AuthLogOutDialog />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <nav className="w-full p-3">
          <SidebarTrigger size="lg" />
        </nav>
        <>{children}</>
      </SidebarInset>
    </SidebarProvider>
  );
}
