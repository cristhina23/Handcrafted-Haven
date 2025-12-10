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
        role: ["seller"]
      },
      { 
        name: "products",  
        href: "/dashboard/products", 
        icon: Package,
        role: ["seller"],
        sublinks: [
          { name: "All Products", href: "/dashboard/products?tab=all" },
          { name: "Add Product", href: "/dashboard/products?tab=add" }
        ]
      },
      { 
        name: "orders", 
        href: "/dashboard/orders", 
        icon: ShoppingCart,
        role: ["seller"]
      },
      /* { 
        name: "statistics", 
        href: "/dashboard/statistics", 
        icon: BarChart3,
        role: ["seller"]
      },
      { 
        name: "notifications", 
        href: "/dashboard/notifications", 
        icon: Bell,
        role: ["seller", "user"],
        
      },
      { 
        name: "messages", 
        href: "/dashboard/messages", 
        icon: MessageSquare,
        role: ["user", "seller"],
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
        role: ["seller"],
        sublinks: [
          { name: "Store Info", href: "/dashboard/my-store" },
          /* { name: "delivery options", href: "/dashboard/my-store/delivery" },
          { name: "payment methods", href: "/dashboard/my-store/payments" }, */
        ]
      },
      { 
        name: "my-profile", 
        href: "/dashboard/my-profile",
        role: ["seller", "user"], 
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
        role: ["seller", "user"],
        sublinks: [
          { name: "Account", href: "/dashboard/settings/account" },
          { name: "Security", href: "/dashboard/settings/security" },
        ]
      },
      { 
        name: "help", 
        href: "/dashboard/help", 
        role: ["seller", "user"],
        icon: HelpCircle 
      },
      {
        name: "Order History", 
        href: "/order-history", 
        role: ["seller", "user"],
        icon: HelpCircle
      },
      {
        name: "logout", 
        href: "/logout", 
        role: ["seller", "user"],
        icon: HelpCircle
      }
    ],
  },
];

