"use client";

import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useCart } from "@/context/CartContext";
import React from "react";
import { FaCashRegister, FaCcVisa, FaPaypal } from "react-icons/fa";

interface PaymentMethodSectionProps {
  onSubmit: (e: React.FormEvent) => void;
}

const PaymentMethodSection: React.FC<PaymentMethodSectionProps> = ({
  onSubmit,
}) => {
  const { selectedPaymentMethod, updateSelectedPaymentMethod } = useCart();

  const handlePaymentMethodChange = (method: string) => {
    updateSelectedPaymentMethod(method);
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <h1 className="mb-6 text-2xl font-bold">Payment Method</h1>
      <div className="space-y-4">
        <div className="mb-6 flex space-x-4">
          <Button
            onClick={() => handlePaymentMethodChange("credit-card")}
            className={`flex flex-1 items-center justify-center rounded-lg border py-2`}
            variant={
              selectedPaymentMethod === "credit-card" ? "default" : "outline"
            }
          >
            <FaCcVisa className="mr-2" /> Pay with Credit Card
          </Button>
          <Button
            onClick={() => handlePaymentMethodChange("paypal")}
            className={`flex flex-1 items-center justify-center rounded-lg border py-2`}
            variant={selectedPaymentMethod === "paypal" ? "default" : "outline"}
          >
            <FaPaypal className="mr-2" /> Pay with PayPal
          </Button>
          <Button
            onClick={() => handlePaymentMethodChange("cash-on-delivery")}
            className={`flex flex-1 items-center justify-center rounded-lg border py-2`}
            variant={
              selectedPaymentMethod === "cash-on-delivery"
                ? "default"
                : "outline"
            }
          >
            <FaCashRegister className="mr-2" /> Cash on Delivery
          </Button>
        </div>
        <Toaster />

        {selectedPaymentMethod === "credit-card" && (
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="cardNumber" className="block text-gray-700">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-red-400 focus:outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="nameOnCard" className="block text-gray-700">
                Name on Card
              </label>
              <input
                type="text"
                id="nameOnCard"
                placeholder="John Doe"
                className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-red-400 focus:outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="expDate" className="block text-gray-700">
                Expiration Date
              </label>
              <input
                type="text"
                id="expDate"
                placeholder="MM/YY"
                className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-red-400 focus:outline-none"
                required
              />
            </div>
            <div className="mt-6 flex space-x-4">
              <Button
                variant="outline"
                type="button"
                className="w-1/2 rounded-lg px-4 py-2"
                onClick={() => window.history.back()}
              >
                Back to Checkout Details
              </Button>
              <Button type="submit" className="w-1/2 rounded-lg px-4 py-2">
                Submit Payment
              </Button>
            </div>
          </form>
        )}

        {selectedPaymentMethod === "paypal" && (
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="paypalEmail" className="block text-gray-700">
                PayPal Email
              </label>
              <input
                type="email"
                id="paypalEmail"
                placeholder="you@example.com"
                className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-red-400 focus:outline-none"
                required
              />
            </div>
            <div className="mt-6 flex space-x-4">
              <Button
                variant="outline"
                type="button"
                className="w-1/2 rounded-lg px-4 py-2"
                onClick={() => window.history.back()}
              >
                Back to Checkout Details
              </Button>
              <Button type="submit" className="w-1/2 rounded-lg px-4 py-2">
                Submit Payment
              </Button>
            </div>
          </form>
        )}

        {selectedPaymentMethod === "cash-on-delivery" && (
          <div className="text-gray-700">
            <p>You will pay with cash upon delivery.</p>
            <div className="mt-6 flex space-x-4">
              <Button
                type="button"
                variant="outline"
                className="w-1/2 rounded-lg px-4 py-2"
                onClick={() => window.history.back()}
              >
                Back to Checkout Details
              </Button>
              <Button
                type="button"
                className="w-1/2 rounded-lg px-4 py-2"
                onClick={onSubmit}
              >
                Confirm Order
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodSection;
