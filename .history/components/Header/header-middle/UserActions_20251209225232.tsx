"use client";

import { FC } from "react";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useUser, SignInButton, UserButton, SignedOut } from "@clerk/nextjs";
import { User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";

const UserActions: FC = () => {
  const { isSignedIn, user } = useUser();
  const { itemCount, openCart } = useCart();

  return (
    <div className="flex gap-4 sm:gap-6 mr-4">
      {/* Wishlist */}
      <div className="flex gap-1 sm:gap-2 items-center cursor-pointer transform transition-transform duration-400 hover:scale-110">
        <FaRegHeart className="text-slate-900 w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-slate-900 text-xs sm:text-sm">Wishlist</span>
      </div>

      {/* Cart */}
      <div
        onClick={openCart}
        className="flex gap-1 sm:gap-2 items-center cursor-pointer transform transition-transform duration-400 hover:scale-110 relative"
      >
        <div className="relative">
          <AiOutlineShoppingCart className="text-slate-900 w-4 h-4 sm:w-5 sm:h-5" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#77d4ff] text-slate-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {itemCount}
            </span>
          )}
        </div>
        <span className="text-slate-900 text-xs sm:text-sm">Cart</span>
      </div>

      {/* Account */}
      {isSignedIn ? (
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Link
              label="Profile"
              labelIcon={<User className="size-4" />}
              href={`/dashboard`}
            />
          </UserButton.MenuItems>
        </UserButton>
      ) : (
        <Button>
          <SignedOut>
          <SignInButton>
            <div>Login</div>
          </SignInButton>
        </SignedOut>
        </Button>
      )}
    </div>

    <
  );
};

export default UserActions;
