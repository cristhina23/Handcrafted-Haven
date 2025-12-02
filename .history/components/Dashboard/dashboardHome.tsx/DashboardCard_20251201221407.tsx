import {
  ShoppingCart,
  DollarSign,
  User,
  CreditCard,
} from "lucide-react";

interface Props {
  title: string;
  value: string;
  change?: string;
  changeType?: "up" | "down" | "none";
  link: string;
  icon: "cart" | "dollar" | "user" | "card";
}

export default function DashboardCard({
  title,
  value,
  change,
  changeType = "none",
  link,
  icon,
}: Props) {
  const icons = {
    cart: <ShoppingCart className="text-blue-400" />,
    dollar: <DollarSign className="text-blue-400" />,
    user: <User className="text-blue-400" />,
    card: <CreditCard className="text-blue-400" />,
  };

  return (
    <div className="bg-white border-2 border-slate-200 p-6 rounded-xl shadow-lg  flex flex-col gap-3">
      
      {/* Título + Icono */}
      <div className="flex items-center justify-between text-sm text-slate-800">
        <span>{title}</span>
        {icons[icon]}
      </div>

      {/* Valor */}
      <h2 className="text-3xl font-bold text-slate-800">{value}</h2>

      {/* Cambio */}
      {changeType !== "none" && (
        <p
          className={`text-sm ${
            changeType === "up" ? "text-green-400" : "text-red-400"
          }`}
        >
          {changeType === "up" ? "↑" : "↓"} {change}
        </p>
      )}

      {/* Link */}
      <a className="text-blue-500 text-sm mt-2 hover:underline cursor-pointer">
        {link}
      </a>
    </div>
  );
}
