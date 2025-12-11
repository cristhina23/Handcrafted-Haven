"use client";

import { SellerProvider } from "@/contexts/SellerContext";
import { CartProvider } from "@/contexts/CartContext";
import ProfileChecker from "@/components/ProfileChecker";
import AOSWrapper from "@/components/ui/AosWrapper";
import CartModal from "@/components/Cart/CartModal";
import { Order } from "@/lib/models/Order";
import { SellerOrdersProvider } from "@/contexts/SellerOrdersContext";
import { OrderProvider } from "@/contexts/OrderContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SellerProvider>
      <OrderProvider>
      <SellerOrdersProvider>
      <CartProvider>
        <ProfileChecker>
          <AOSWrapper />
          {children}
          <CartModal />
        </ProfileChecker>
      </CartProvider>
      </SellerOrdersProvider>
      </OrderProvider>
    </SellerProvider>
  );
}
