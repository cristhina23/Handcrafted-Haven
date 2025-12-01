// navigation.ts
import { 
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  MessageSquare,
  Store,
  User,
  Settings,
  HelpCircle
} from "lucide-react";

export const sidebarLinks = [
  {
    title: "Main",
    links: [
      { name: "dashboard", icon: <LayoutDashboard size={20} /> },
      { name: "products", icon: <Package size={20} /> },
      { name: "orders", icon: <ShoppingCart size={20} /> },
      { name: "statistics", icon: <BarChart3 size={20} /> },
      { name: "messages", icon: <MessageSquare size={20} /> },
    ],
  },
  {
    title: "Seller",
    links: [
      { name: "my-store", icon: <Store size={20} /> },
      { name: "my-profile", icon: <User size={20} /> },
    ],
  },
  {
    title: "General",
    links: [
      { name: "settings", icon: <Settings size={20} /> },
      { name: "help", icon: <HelpCircle size={20} /> },
    ],
  },
];
