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
        roles: ["seller"]
      },
      { 
        name: "products",  
        href: "/dashboard/products", 
        icon: Package,
        roles: ["seller"],
        sublinks: [
          { name: "All Products", href: "/dashboard/products?tab=all" },
          { name: "Add Product", href: "/dashboard/products?tab=add" }
        ]
      },
      { 
        name: "orders", 
        href: "/dashboard/orders", 
        icon: ShoppingCart,
        roles: ["seller"]
      },
      /* { 
        name: "statistics", 
        href: "/dashboard/statistics", 
        icon: BarChart3,
        roles: ["seller"]
      },
      { 
        name: "notifications", 
        href: "/dashboard/notifications", 
        icon: Bell,
        roles: ["seller", "user"],
        
      },
      { 
        name: "messages", 
        href: "/dashboard/messages", 
        icon: MessageSquare,
        roles: ["user", "seller"],
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
        roles: ["seller"],
        sublinks: [
          { name: "Store Info", href: "/dashboard/my-store" },
          /* { name: "delivery options", href: "/dashboard/my-store/delivery" },
          { name: "payment methods", href: "/dashboard/my-store/payments" }, */
        ]
      },
      { 
        name: "my-profile", 
        href: "/dashboard/my-profile",
        roles: ["seller", "user"], 
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
        roles: ["seller", "user"],
        sublinks: [
          { name: "Account", href: "/dashboard/settings/account" },
          { name: "Security", href: "/dashboard/settings/security" },
        ]
      },
      { 
        name: "help", 
        href: "/dashboard/help", 
        roles: ["seller", "user"],
        icon: HelpCircle 
      },
      {
        name: "Order History", 
        href: "/order-history", 
        roles: ["seller", "user"],
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

