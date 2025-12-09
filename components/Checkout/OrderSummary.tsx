import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

interface OrderSummaryProps {
  items: Array<{
    productId: string;
    productName: string;
    productImage: string;
    price: number;
    quantity: number;
    variants?: {
      size: string | null;
      color: string | null;
      material: string | null;
    };
    dimensions?: string | null;
    shippingMethod?: string;
  }>;
  subtotal: number;
  shippingCost: number;
  total: number;
  onUpdateQuantity: (itemIndex: number, newQuantity: number) => void;
  onRemoveItem: (itemIndex: number) => void;
}

export default function OrderSummary({
  items,
  subtotal,
  shippingCost,
  total,
  onUpdateQuantity,
  onRemoveItem,
}: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 lg:sticky lg:top-8">
      <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-4">
        Order Summary
      </h2>

      {/* Items */}
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {items.map((item, index) => (
          <div
            key={`${item.productId}-${index}`}
            className="flex gap-3 pb-4 border-b last:border-b-0"
          >
            <div className="relative w-12 h-12 md:w-16 md:h-16 flex-shrink-0 rounded-md overflow-hidden">
              <Image
                src={item.productImage || "/placeholder.png"}
                alt={item.productName}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xs md:text-sm font-medium text-slate-900 truncate mb-1">
                {item.productName}
              </h3>

              {/* Variants Display */}
              {item.variants && (
                <div className="text-xs text-gray-600 mb-1 space-y-0.5">
                  {item.variants.size && (
                    <p>
                      Size:{" "}
                      <span className="font-medium text-slate-700">
                        {item.variants.size}
                      </span>
                    </p>
                  )}
                  {item.variants.color && (
                    <p>
                      Color:{" "}
                      <span className="font-medium text-slate-700">
                        {item.variants.color}
                      </span>
                    </p>
                  )}
                  {item.variants.material && (
                    <p>
                      Material:{" "}
                      <span className="font-medium text-slate-700">
                        {item.variants.material}
                      </span>
                    </p>
                  )}
                </div>
              )}

              {item.dimensions && (
                <p className="text-xs text-gray-600 mb-1">
                  Dimensions:{" "}
                  <span className="font-medium text-slate-700">
                    {item.dimensions}
                  </span>
                </p>
              )}

              {item.shippingMethod && (
                <p className="text-xs text-gray-600 mb-1">
                  Shipping:{" "}
                  <span className="font-medium text-slate-700">
                    {item.shippingMethod}
                  </span>
                </p>
              )}

              <p className="text-xs md:text-sm font-semibold text-slate-900 mb-2">
                ${item.price.toFixed(2)} each
              </p>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() =>
                      onUpdateQuantity(index, Math.max(1, item.quantity - 1))
                    }
                    className="p-1 hover:bg-gray-100 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3 h-3 md:w-4 md:h-4 text-gray-600" />
                  </button>
                  <span className="px-2 md:px-3 text-xs md:text-sm font-medium min-w-[24px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                    className="p-1 hover:bg-gray-100 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3 h-3 md:w-4 md:h-4 text-gray-600" />
                  </button>
                </div>

                <button
                  onClick={() => onRemoveItem(index)}
                  className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                </button>

                <span className="text-xs md:text-sm font-semibold text-[#77d4ff] ml-auto">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-slate-900">
            ${subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-green-600">
            {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between text-lg font-bold pt-2 border-t">
          <span className="text-slate-900">Total</span>
          <span className="text-[#77d4ff]">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
