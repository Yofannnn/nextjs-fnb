"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardTitle } from "@/components/ui/card";
import { BellIcon, BookOpenCheckIcon, ChevronRightIcon, LucideIcon, ShoppingBagIcon, TicketPercentIcon, User2Icon } from "lucide-react";

interface MenuSection {
  title: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  label: string;
  sub: string;
  icon: LucideIcon;
  url: string;
}

const menuSections: MenuSection[] = [
  {
    title: "Account",
    items: [
      { id: "profile", label: "Personal Info", sub: "Edit profile & preferences", icon: User2Icon, url: "" },
      { id: "online-order", label: "Online Order History", sub: "View your online order history", icon: BookOpenCheckIcon, url: "/member/online-orders" },
      { id: "cart", label: "Cart", sub: "Your cart", icon: ShoppingBagIcon, url: "/cart" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { id: "notif", label: "Notifications", sub: "Promos & order updates", icon: BellIcon, url: "" },
      { id: "promo", label: "Vouchers & Promos", sub: "Vouchers & Promos", icon: TicketPercentIcon, url: "" },
    ],
  },
];

export function ProfileMenuList() {
  const router = useRouter();

  return menuSections.map((section, si) => (
    <motion.div key={section.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * si + 0.3, duration: 0.4 }}>
      <Card className="overflow-hidden">
        <CardTitle className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-4 ">{section.title}</CardTitle>
        <div className="px-2">
          {section.items.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.35 }}
              whileHover={{ x: 4 }}
              onClick={() => router.push(item.url)}
              className="w-full flex items-center gap-4 p-3.5 rounded-2xl hover:bg-muted hover:text-muted-foreground transition-colors group text-left"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-foreground text-background">
                <item.icon size={19} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold transition-colors">{item.label}</p>
                <p className="text-xs truncate">{item.sub}</p>
              </div>
              <ChevronRightIcon size={16} className="transition-colors shrink-0" />
            </motion.button>
          ))}
        </div>
      </Card>
    </motion.div>
  ));
}
