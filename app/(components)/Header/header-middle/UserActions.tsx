import { FC } from "react";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";

const UserActions: FC = () => {
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

      {/* Account */}
      <div className="flex gap-1 sm:gap-2 items-center cursor-pointer transform transition-transform duration-400 hover:scale-110">
        <FaRegUser className="text-slate-900 w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-slate-900 text-xs sm:text-sm">Account</span>
      </div>
    </div>
  );
};

export default UserActions;
