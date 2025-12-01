import { hr } from "framer-motion/client";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  MessageSquare,
  Store,
  User,
  Settings,
  HelpCircle,
  Bell,
} from "lucide-react";

export const sidebarLinks = [
  {
    title: "Main",
    links: [
      { name: "dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "products",  href: "/dashboard/products", icon: Package },
      { name: "orders", href: "/dashboard/orders", icon: ShoppingCart },
      { name: "statistics", href: "/dashboard/statistics", icon: BarChart3 },
      { name: "notifications", href: "/dashboard/notifications", icon: Bell },
      { name: "messages", href: "/dashboard/messages", icon: MessageSquare },
    ],
  },
  {
    title: "Seller",
    links: [
      { name: "my-store", href: "/dashboard/my-store", icon: Store },
      { name: "my-profile", href: "/dashboard/my-profile", icon: User },
    ],
  },
  {
    title: "General",
    links: [
      { name: "settings", href: "/dashboard/settings", icon: Settings },
      { name: "help",  icon: HelpCircle },
    ],
  },
];
