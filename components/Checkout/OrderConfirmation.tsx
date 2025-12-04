import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Download, Mail } from "lucide-react";

interface OrderConfirmationProps {
  orderNumber: string;
  shippingInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  items: Array<{
    productId: string;
    productName: string;
    productImage: string;
    price: number;
    quantity: number;
    sellerName: string;
  }>;
  subtotal: number;
  shippingCost: number;
  total: number;
}

export default function OrderConfirmation({
  orderNumber,
  shippingInfo,
  items,
  subtotal,
  shippingCost,
  total,
}: OrderConfirmationProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-8 max-w-4xl mx-auto">
      {/* Success Header */}
      <div className="text-center mb-6 md:mb-8">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 md:w-20 md:h-20 text-green-500" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4 inline-block">
          <p className="text-xs md:text-sm text-gray-600">Order Number</p>
          <p className="text-xl md:text-2xl font-bold text-[#77d4ff]">
            {orderNumber}
          </p>
        </div>
      </div>

      {/* Email Notification */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 md:p-4 mb-6 md:mb-8 flex items-start gap-3">
        <Mail className="w-4 h-4 md:w-5 md:h-5 text-green-600 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-xs md:text-sm font-semibold text-green-900">
            Confirmation email sent
          </p>
          <p className="text-xs md:text-sm text-green-700">
            We&apos;ve sent an order confirmation to{" "}
            <span className="font-medium break-all">{shippingInfo.email}</span>
          </p>
        </div>
      </div>

      {/* Order Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
        {/* Shipping Information */}
        <div>
          <h2 className="text-base md:text-lg font-bold text-slate-900 mb-4">
            Shipping Address
          </h2>
          <div className="space-y-1 text-xs md:text-sm text-gray-700">
            <p className="font-medium">{shippingInfo.fullName}</p>
            <p>{shippingInfo.address}</p>
            <p>
              {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
            </p>
            <p>{shippingInfo.country}</p>
            <p className="pt-2">{shippingInfo.phone}</p>
            <p>{shippingInfo.email}</p>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <h2 className="text-base md:text-lg font-bold text-slate-900 mb-4">
            Order Summary
          </h2>
          <div className="space-y-2 text-xs md:text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium text-slate-900">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium text-green-600">FREE</span>
            </div>
            <div className="flex justify-between pt-2 border-t">
              <span className="font-bold text-slate-900">Total</span>
              <span className="font-bold text-[#77d4ff]">
                ${total.toFixed(2)}
              </span>
            </div>
            <div className="pt-2 border-t">
              <p className="text-gray-600">Payment Method</p>
              <p className="font-medium text-slate-900">Credit Card</p>
            </div>
            <div>
              <p className="text-gray-600">Estimated Delivery</p>
              <p className="font-medium text-slate-900">5-7 business days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-base md:text-lg font-bold text-slate-900 mb-4">
          Order Items
        </h2>
        <div className="space-y-3 md:space-y-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex gap-3 md:gap-4 border-b pb-3 md:pb-4 last:border-b-0"
            >
              <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-md overflow-hidden">
                <Image
                  src={item.productImage || "/placeholder.png"}
                  alt={item.productName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm md:text-base font-medium text-slate-900 truncate">
                  {item.productName}
                </h3>
                <p className="text-xs md:text-sm text-gray-600">
                  by {item.sellerName}
                </p>
                <p className="text-xs md:text-sm text-gray-600">
                  Quantity: {item.quantity}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm md:text-base font-semibold text-slate-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-4 md:pt-6 border-t">
        <button className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-slate-900 font-semibold px-4 md:px-6 py-2.5 md:py-3 rounded-lg transition-colors text-sm md:text-base">
          <Download className="w-4 h-4 md:w-5 md:h-5" />
          Download Receipt
        </button>
        <Link
          href="/shop"
          className="flex items-center justify-center bg-[#77d4ff] hover:bg-[#5fc7ff] text-white font-semibold px-4 md:px-6 py-2.5 md:py-3 rounded-lg transition-colors text-sm md:text-base"
        >
          Continue Shopping
        </Link>
      </div>

      {/* Note */}
      <p className="text-center text-xs md:text-sm text-gray-500 mt-6 md:mt-8">
        Need help? Contact us at support@handcraftedhaven.com
      </p>
    </div>
  );
}
