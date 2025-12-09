"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import OrderSummary from "./OrderSummary";
import ShippingForm from "./ShippingForm";
import PaymentForm from "./PaymentForm";
import OrderConfirmation from "./OrderConfirmation";

export default function CheckoutContainer() {
  const { items, totalPrice, clearCart, updateQuantity, removeFromCart } =
    useCart();
  const { isSignedIn } = useUser();
  const router = useRouter();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Confirmation
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });
  const [shippingCost, setShippingCost] = useState(0);
  const [orderNumber, setOrderNumber] = useState("");

  // Redirect if not signed in
  if (!isSignedIn) {
    router.push("/sign-in?redirect_url=/checkout");
    return null;
  }

  // Redirect if cart is empty
  if (items.length === 0 && step === 1) {
    router.push("/shop");
    return null;
  }

  const handleShippingSubmit = (data: typeof shippingInfo, cost: number) => {
    setShippingInfo(data);
    setShippingCost(cost);
    setStep(2);
  };

  const handlePaymentSubmit = () => {
    // Generate fake order number
    const orderNum = `ORD-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)
      .toUpperCase()}`;
    setOrderNumber(orderNum);
    clearCart();
    setStep(3);
  };

  const handleUpdateQuantity = (itemIndex: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(itemIndex, newQuantity);
  };

  const handleRemoveItem = (itemIndex: number) => {
    removeFromCart(itemIndex);
    // If cart becomes empty, redirect to shop
    if (items.length === 1) {
      router.push("/shop");
    }
  };

  const totalWithShipping = totalPrice + shippingCost;

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8 flex justify-center">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Checkout
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Complete your order in {step === 3 ? "3" : "3"} simple steps
          </p>
        </div>

        {/* Progress Steps */}
        {step !== 3 && (
          <div className="mb-6 md:mb-8 overflow-x-auto">
            <div className="flex items-center justify-center min-w-max px-4">
              <div className="flex items-center space-x-2 md:space-x-4">
                {/* Step 1 */}
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold text-sm md:text-base ${
                      step >= 1
                        ? "bg-[#77d4ff] text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    1
                  </div>
                  <span className="ml-1 md:ml-2 font-medium text-slate-900 text-sm md:text-base">
                    Shipping
                  </span>
                </div>

                <div className="w-8 md:w-16 h-1 bg-gray-300"></div>

                {/* Step 2 */}
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold text-sm md:text-base ${
                      step >= 2
                        ? "bg-[#77d4ff] text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    2
                  </div>
                  <span className="ml-1 md:ml-2 font-medium text-slate-900 text-sm md:text-base">
                    Payment
                  </span>
                </div>

                <div className="w-8 md:w-16 h-1 bg-gray-300"></div>

                {/* Step 3 */}
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold text-sm md:text-base ${
                      step >= 3
                        ? "bg-[#77d4ff] text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    3
                  </div>
                  <span className="ml-1 md:ml-2 font-medium text-slate-900 text-sm md:text-base">
                    Complete
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            {step === 1 && <ShippingForm onSubmit={handleShippingSubmit} />}
            {step === 2 && (
              <PaymentForm
                onSubmit={handlePaymentSubmit}
                onBack={() => setStep(1)}
              />
            )}
            {step === 3 && (
              <OrderConfirmation
                orderNumber={orderNumber}
                shippingInfo={shippingInfo}
                items={items}
                subtotal={totalPrice}
                shippingCost={shippingCost}
                total={totalWithShipping}
              />
            )}
          </div>

          {/* Order Summary Sidebar */}
          {step !== 3 && (
            <div className="lg:col-span-1 order-1 lg:order-2">
              <OrderSummary
                items={items}
                subtotal={totalPrice}
                shippingCost={shippingCost}
                total={totalWithShipping}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
