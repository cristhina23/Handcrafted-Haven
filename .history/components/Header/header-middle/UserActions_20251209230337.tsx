"use client";

import { FC, useState } from "react";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useUser, SignInButton, UserButton, SignedOut } from "@clerk/nextjs";
import { MenuIcon, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const UserActions: FC = () => {
  const { isSignedIn, user } = useUser();
  const { itemCount, openCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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

      <MenuIcon className="text-slate-900 w-4 h-4 sm:w-5 sm:h-5 md:hidden" />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50"
          >
            <div className="p-4 flex justify-between items-center border-b">
              <h2 className="text-lg font-bold">Menu</h2>
              <button onClick={toggleMenu} className="text-slate-900 font-bold text-xl">×</button>
            </div>

            <ul className="p-4 flex flex-col gap-4">
              <li><Link href="/" className="hover:text-blue-500">Home</Link></li>
              <li><Link href="/about" className="hover:text-blue-500">About</Link></li>
              <li>< href="/contact" className="hover:text-blue-500">Contact</></li>
              <li><a href="/dashboard" className="hover:text-blue-500">Dashboard</a></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>

    
  );
};

export default UserActions;
