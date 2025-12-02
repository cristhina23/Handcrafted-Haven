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
} from "lucide-react";

export const sidebarLinks = [
  {
    title: "Main",
    links: [
      { name: "dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "products",  href: "/dashboard/products", icon: Package },
      { name: "orders",  icon: ShoppingCart },
      { name: "statistics", icon: BarChart3 },
      { name: "messages", icon: MessageSquare },
    ],
  },
  {
    title: "Seller",
    links: [
      { name: "my-store", icon: Store },
      { name: "my-profile", icon: User },
    ],
  },
  {
    title: "General",
    links: [
      { name: "settings", icon: Settings },
      { name: "help", icon: HelpCircle },
    ],
  },
];
