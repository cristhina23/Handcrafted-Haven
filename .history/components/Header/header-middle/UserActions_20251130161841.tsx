"use client";

import { FC } from "react";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useUser, SignInButton, UserButton, SignedOut } from "@clerk/nextjs";

const UserActions: FC = () => {
  const { isSignedIn, user } = useUser();

  return (
    <div className="flex gap-4 sm:gap-6 mr-4">
      {/* Wishlist */}
      <div className="flex gap-1 sm:gap-2 items-center cursor-pointer transform transition-transform duration-400 hover:scale-110">
        <FaRegHeart className="text-slate-900 w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-slate-900 text-xs sm:text-sm">Wishlist</span>
      </div>

      {/* Cart */}
      <div className="flex gap-1 sm:gap-2 items-center cursor-pointer transform transition-transform duration-400 hover:scale-110">
        <AiOutlineShoppingCart className="text-slate-900 w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-slate-900 text-xs sm:text-sm">Cart</span>
      </div>

      {/* Account - Cambia según si está logueado */}
      {isSignedIn ? (
        <div className="flex gap-2 items-center">
          <span className="text-slate-900 text-xs sm:text-sm hidden sm:inline">
            {user?.firstName || "Account"}
          </span>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-8 h-8 sm:w-9 sm:h-9",
              },
            }}
          />
        </div>
      ) : (
         <>
          <UserButton>
        <UserButton.MenuItems>
          <UserButton.Link
            label="Profile"
            labelIcon={<User className="size-4" />}
            href="/profile"
          />
        </UserButton.MenuItems>
      </UserButton>

      <SignedOut>
        <SignInButton mode="modal">
          <div className="flex gap-1 sm:gap-2 items-center cursor-pointer transform transition-transform duration-400 hover:scale-110">
            <FaRegUser className="text-slate-900 w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-slate-900 text-xs sm:text-sm">Login</span>
          </div>
        </SignInButton>
      </SignedOut>
         </>
        
      )}
    </div>
  );
};

export default UserActions;
