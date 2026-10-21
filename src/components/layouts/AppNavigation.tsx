"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useSession } from "@/stores/session.store";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { ShoppingCartIcon, UserIcon } from "lucide-react";
import { cn } from "@/lib/class-name.util";
import { useCartStore } from "@/features/cart/stores/cart.store";
import { UserRoleType } from "@/features/user/types/user.type";

const excludedPaths = ["/login", "/register", "/reset-password", "/forgot-password", "/verify-email", "/admin", "/member", "/guest", "/checkout"];

export function AppNavigation() {
  const user = useSession((state) => state.user);
  const pathName = usePathname();

  const dashboardUrl = useMemo(() => {
    if (!user) return "/login";
    if (user.role === UserRoleType.ADMIN) return "/admin";
    if (user.role === UserRoleType.MANAGER) return "/";
    if (user.role === UserRoleType.CASHIER) return "/";
    if (user.role === UserRoleType.KITCHEN) return "/";
    if (user.role === UserRoleType.BAR) return "/";
    if (user.role === UserRoleType.MEMBER) return "/member";
    return "/";
  }, [user]);

  const cartCount = useCartStore((state) => state.items.length);

  if (excludedPaths.some((excluded) => pathName.startsWith(excluded))) return null;

  const textClassName = "px-8 py-2.5 rounded-full border border-foreground hover:bg-foreground hover:text-background font-semibold";

  return (
    <header className="relative w-full z-50">
      <FloatingNav className="w-full flex justify-center items-center">
        <div className="p-1.5 w-[85%] rounded-full mt-3 bg-background">
          <nav className="flex justify-between w-full border border-foreground rounded-full">
            <div className="flex items-center justify-center">
              <Link href="/" className={cn(textClassName)}>
                Whiff
              </Link>
              <Link href="/menu" className={cn(textClassName, "hidden md:block")}>
                Menu
              </Link>
              <Link href="/reservation" className={cn(textClassName, "hidden md:block")}>
                Reservation
              </Link>
            </div>
            <div className="flex items-center justify-center">
              <Link href={dashboardUrl} className="p-2.5 border border-foreground rounded-full hover:bg-foreground hover:text-background">
                <UserIcon />
              </Link>
              <Link href="/cart" className="p-2.5 border border-foreground rounded-full hover:bg-foreground hover:text-background relative">
                <ShoppingCartIcon />
                {cartCount > 0 && <span className="absolute top-0 right-0 w-4 h-4 bg-foreground rounded-full flex justify-center items-center text-xs text-background">{cartCount}</span>}
              </Link>
            </div>
          </nav>
        </div>
      </FloatingNav>
    </header>
  );
}
