"use client";

import { SellerProvider } from "@/contexts/SellerContext";
import { CartProvider } from "@/contexts/CartContext";
import ProfileChecker from "@/components/ProfileChecker";
import AOSWrapper from "@/components/ui/AosWrapper";
import CartModal from "@/components/Cart/CartModal";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SellerProvider>
      <CartProvider>
        <ProfileChecker>
          <AOSWrapper />
          {children}
          <CartModal />
        </ProfileChecker>
      </CartProvider>
    </SellerProvider>
  );
}
