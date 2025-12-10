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
      { 
        name: "dashboard", 
        href: "/dashboard", 
        icon: LayoutDashboard,
        role: "seller"
      },
      { 
        name: "products",  
        href: "/dashboard/products", 
        icon: Package,
        
        sublinks: [
          { name: "All Products", href: "/dashboard/products?tab=all" },
          { name: "Add Product", href: "/dashboard/products?tab=add" }
        ]
      },
      { 
        name: "orders", 
        href: "/dashboard/orders", 
        icon: ShoppingCart
      },
      /* { 
        name: "statistics", 
        href: "/dashboard/statistics", 
        icon: BarChart3 
      },
      { 
        name: "notifications", 
        href: "/dashboard/notifications", 
        icon: Bell 
      },
      { 
        name: "messages", 
        href: "/dashboard/messages", 
        icon: MessageSquare 
      }, */
    ],
  },
  {
    title: "Seller",
    links: [
      { 
        name: "my-store", 
        href: "/dashboard/my-store", 
        icon: Store,
        sublinks: [
          { name: "Store Info", href: "/dashboard/my-store" },
          /* { name: "delivery options", href: "/dashboard/my-store/delivery" },
          { name: "payment methods", href: "/dashboard/my-store/payments" }, */
        ]
      },
      { 
        name: "my-profile", 
        href: "/dashboard/my-profile", 
        icon: User 
      },
    ],
  },
  {
    title: "General",
    links: [
      { 
        name: "settings", 
        href: "/dashboard/settings", 
        icon: Settings,
        sublinks: [
          { name: "Account", href: "/dashboard/settings/account" },
          { name: "Security", href: "/dashboard/settings/security" },
        ]
      },
      { 
        name: "help", 
        href: "/dashboard/help", 
        icon: HelpCircle 
      },
    ],
  },
];

