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
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
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
            );

            // Only set items if we have valid data, otherwise keep localStorage data
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
      const existingItem = prevItems.find(
        (i) => i.productId === item.productId
      );

      let updatedItems: CartItem[];

      if (existingItem) {
        updatedItems = prevItems.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        );
      } else {
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

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.filter(
        (item) => item.productId !== productId
      );
      syncCartToDatabase(updatedItems);
      return updatedItems;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
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
