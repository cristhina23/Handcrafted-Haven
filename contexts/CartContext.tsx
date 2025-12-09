"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

interface CartItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  sellerId: string;
  sellerName: string;
  variants?: {
    size: string | null;
    color: string | null;
    material: string | null;
  };
  dimensions?: string | null;
  shippingMethod?: string;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totalPrice: number;
  isOpen: boolean;
  addToCart: (
    item: Omit<CartItem, "quantity"> & { quantity?: number },
    openModal?: boolean
  ) => void;
  removeFromCart: (itemIndex: number) => void;
  updateQuantity: (itemIndex: number, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  loadCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Initialize state from localStorage
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          const parsed = JSON.parse(savedCart);
          console.log("Loaded cart from localStorage:", parsed);
          // Validate that all items have required fields
          if (Array.isArray(parsed)) {
            const validItems = parsed.filter(
              (item) =>
                item.productId &&
                item.productName &&
                item.productImage &&
                typeof item.price === "number" &&
                typeof item.quantity === "number"
            );
            console.log("Valid items after filter:", validItems);
            return validItems;
          }
        } catch (error) {
          console.error("Error loading cart:", error);
          // Clear corrupted cart data
          localStorage.removeItem("cart");
        }
      }
    }
    return [];
  });
  const [isOpen, setIsOpen] = useState(false);
  const { user, isSignedIn } = useUser();

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items]);

  const loadCart = React.useCallback(async () => {
    if (!user) return;

    try {
      const response = await fetch(`/api/cart?userId=${user.id}`);
      if (response.ok) {
        const data = await response.json();
        if (data.cart && data.cart.items) {
          setItems(data.cart.items);
        }
      }
    } catch (error) {
      console.error("Error loading cart from database:", error);
    }
  }, [user]);

  // Load cart from database when user signs in
  useEffect(() => {
    let isMounted = true;

    const fetchCart = async () => {
      if (!isSignedIn || !user) return;

      try {
        const response = await fetch(`/api/cart?userId=${user.id}`);
        if (response.ok) {
          const data = await response.json();
          if (isMounted && data.cart && data.cart.items) {
            // Validate that items have all required fields before loading
            const validItems = data.cart.items.filter(
              (item: CartItem) =>
                item.productId &&
                item.productName &&
                item.productImage &&
                typeof item.price === "number" &&
                typeof item.quantity === "number" &&
                item.sellerId &&
                item.sellerName
              // variants, dimensions, and shippingMethod are optional
            ); // Only set items if we have valid data, otherwise keep localStorage data
            if (validItems.length > 0) {
              setItems(validItems);
            } else {
              console.log(
                "MongoDB cart has invalid format, keeping localStorage data"
              );
            }
          }
        }
      } catch (error) {
        console.error("Error loading cart from database:", error);
      }
    };

    fetchCart();

    return () => {
      isMounted = false;
    };
  }, [isSignedIn, user]);

  const syncCartToDatabase = async (updatedItems: CartItem[]) => {
    if (!user) return;

    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          items: updatedItems,
        }),
      });
    } catch (error) {
      console.error("Error syncing cart to database:", error);
    }
  };

  const addToCart = (
    item: Omit<CartItem, "quantity"> & { quantity?: number },
    openModal = true
  ) => {
    // Validate item before adding
    if (
      !item.productId ||
      !item.productName ||
      typeof item.price !== "number"
    ) {
      console.error("Invalid item data:", item);
      return;
    }

    console.log("Adding to cart:", item);

    setItems((prevItems) => {
      // Create a function to compare items including variants
      const isSameItem = (a: CartItem, b: typeof item) => {
        if (a.productId !== b.productId) return false;

        // Compare variants
        const aSize = a.variants?.size || null;
        const bSize = b.variants?.size || null;
        const aColor = a.variants?.color || null;
        const bColor = b.variants?.color || null;
        const aMaterial = a.variants?.material || null;
        const bMaterial = b.variants?.material || null;

        // Compare dimensions and shipping method
        const aDimensions = a.dimensions || null;
        const bDimensions = b.dimensions || null;
        const aShipping = a.shippingMethod || null;
        const bShipping = b.shippingMethod || null;

        return (
          aSize === bSize &&
          aColor === bColor &&
          aMaterial === bMaterial &&
          aDimensions === bDimensions &&
          aShipping === bShipping
        );
      };

      const existingItem = prevItems.find((i) => isSameItem(i, item));

      let updatedItems: CartItem[];

      if (existingItem) {
        // Same product with same variants - increase quantity
        updatedItems = prevItems.map((i) =>
          isSameItem(i, item)
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        );
      } else {
        // New item or different variant - add as separate item
        updatedItems = [
          ...prevItems,
          { ...item, quantity: item.quantity || 1 },
        ];
      }

      syncCartToDatabase(updatedItems);
      return updatedItems;
    });

    if (openModal) {
      setIsOpen(true);
    }
  };

  const removeFromCart = (itemIndex: number) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.filter((_, index) => index !== itemIndex);
      syncCartToDatabase(updatedItems);
      return updatedItems;
    });
  };

  const updateQuantity = (itemIndex: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(itemIndex);
      return;
    }

    setItems((prevItems) => {
      const updatedItems = prevItems.map((item, index) =>
        index === itemIndex ? { ...item, quantity } : item
      );
      syncCartToDatabase(updatedItems);
      return updatedItems;
    });
  };

  const clearCart = () => {
    setItems([]);
    syncCartToDatabase([]);
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        totalPrice,
        isOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
