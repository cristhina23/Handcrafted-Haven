import { FC } from "react";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";

const UserActions: FC = () => {
  return (
    <div className="flex gap-6 mr-4">
      {/* Wishlist */}
      <div className="flex gap-2 items-center cursor-pointer transform transition-transform duration-400 hover:scale-110">
        <FaRegHeart size={20} className="text-slate-900" />
        <span className="text-slate-900">Wishlist</span>
      </div>

      {/* Cart */}
      <div className="flex gap-2 items-center cursor-pointer transform transition-transform duration-400 hover:scale-110">
        <AiOutlineShoppingCart size={20} className="text-slate-900" />
        <span className="text-slate-900">Cart</span>
      </div>

      {/* Account */}
      <div className="flex gap-2 items-center cursor-pointer transform transition-transform duration-400 hover:scale-110">
        <FaRegUser size={20} className="text-slate-900" />
        <span className="text-slate-900">Account</span>
      </div>
    </div>
  );
};

export default UserActions;
