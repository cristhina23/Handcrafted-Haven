"use client";

import { useState } from "react";
import { CreditCard, Lock } from "lucide-react";

interface PaymentFormProps {
  onSubmit: () => void;
  onBack: () => void;
}

export default function PaymentForm({ onSubmit, onBack }: PaymentFormProps) {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const [cardType, setCardType] = useState<
    "visa" | "mastercard" | "amex" | null
  >(null);

  const detectCardType = (number: string) => {
    const cleaned = number.replace(/\s/g, "");

    if (/^4/.test(cleaned)) return "visa";
    if (/^5[1-5]/.test(cleaned)) return "mastercard";
    if (/^3[47]/.test(cleaned)) return "amex";
    return null;
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const type = detectCardType(cleaned);
    setCardType(type);

    if (type === "amex") {
      // Amex: 4-6-5 format
      return cleaned.replace(/(\d{4})(\d{6})(\d{5})/, "$1 $2 $3").substr(0, 17);
    } else {
      // Visa/Mastercard: 4-4-4-4 format
      return cleaned
        .replace(/(\d{4})/g, "$1 ")
        .trim()
        .substr(0, 19);
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData({ ...formData, cardNumber: formatted });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Fake validation
    const cleaned = formData.cardNumber.replace(/\s/g, "");
    if (cleaned.length < 15) {
      alert("Please enter a valid card number");
      return;
    }
    if (formData.cvv.length < 3) {
      alert("Please enter a valid CVV");
      return;
    }

    onSubmit();
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <div className="flex items-center gap-2 mb-4 md:mb-6">
        <Lock className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
        <h2 className="text-xl md:text-2xl font-bold text-slate-900">
          Payment Details
        </h2>
      </div>

      <p className="text-xs md:text-sm text-gray-600 mb-4 md:mb-6">
        All transactions are secure and encrypted. This is a demo checkout - no
        real charges will be made.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
        {/* Card Number */}
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-1">
            Card Number *
          </label>
          <div className="relative">
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleCardNumberChange}
              required
              maxLength={19}
              className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#77d4ff] focus:border-transparent"
              placeholder="1234 5678 9012 3456"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {cardType === "visa" && (
                <div className="text-blue-600 font-bold text-lg">VISA</div>
              )}
              {cardType === "mastercard" && (
                <div className="flex gap-0.5">
                  <div className="w-6 h-6 rounded-full bg-red-500"></div>
                  <div className="w-6 h-6 rounded-full bg-yellow-500 -ml-3"></div>
                </div>
              )}
              {cardType === "amex" && (
                <div className="text-blue-700 font-bold text-lg">AMEX</div>
              )}
              {!cardType && <CreditCard className="w-6 h-6 text-gray-400" />}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Accepted: Visa, Mastercard, American Express
          </p>
        </div>

        {/* Cardholder Name */}
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-1">
            Cardholder Name *
          </label>
          <input
            type="text"
            name="cardName"
            value={formData.cardName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#77d4ff] focus:border-transparent"
            placeholder="JOHN DOE"
            style={{ textTransform: "uppercase" }}
          />
        </div>

        {/* Expiry & CVV */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1">
              Month *
            </label>
            <select
              name="expiryMonth"
              value={formData.expiryMonth}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#77d4ff] focus:border-transparent"
            >
              <option value="">MM</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={String(month).padStart(2, "0")}>
                  {String(month).padStart(2, "0")}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1">
              Year *
            </label>
            <select
              name="expiryYear"
              value={formData.expiryYear}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#77d4ff] focus:border-transparent"
            >
              <option value="">YYYY</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1">
              CVV *
            </label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              required
              maxLength={cardType === "amex" ? 4 : 3}
              pattern="[0-9]{3,4}"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#77d4ff] focus:border-transparent"
              placeholder={cardType === "amex" ? "1234" : "123"}
            />
          </div>
        </div>

        {/* Demo Card Numbers */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
          <p className="text-sm font-semibold text-blue-900 mb-2">
            Demo Card Numbers:
          </p>
          <div className="text-xs space-y-1 text-blue-800">
            <p>Visa: 4111 1111 1111 1111</p>
            <p>Mastercard: 5555 5555 5555 4444</p>
            <p>Amex: 3782 822463 10005</p>
            <p className="mt-2 text-blue-600">
              Use any future expiry date and any CVV
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-slate-900 font-semibold py-2.5 md:py-3 rounded-lg transition-colors text-sm md:text-base"
          >
            Back to Shipping
          </button>
          <button
            type="submit"
            className="flex-1 bg-[#77d4ff] hover:bg-[#5fc7ff] text-white font-semibold py-2.5 md:py-3 rounded-lg transition-colors text-sm md:text-base"
          >
            Complete Order
          </button>
        </div>
      </form>
    </div>
  );
}
