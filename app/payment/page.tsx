"use client";

import { Toaster } from "@/components/ui/toaster";
import { useCart } from "@/context/CartContext";
import convertSubCurrency from "@/lib/convertSubCurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import AppWrapper from "../AppWrapper";
import CheckoutForm from "./components/checkoutForm";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const PaymentPage: React.FC = () => {
  const {
    totalAmount,
    subtotal,
    shippingCharge,
    tax,
    discount,
    saveOrderData,
    clearCart,
    cartItems,
  } = useCart();

  const saveOrder = async () => {
    clearCart();
  };

  const amount = totalAmount;

  return (
    <AppWrapper>
      <div className="container mx-auto grid grid-cols-3 gap-8 px-4 py-8">
        <div className="col-span-2">
          <Elements
            stripe={stripePromise}
            options={{
              mode: "payment",
              amount: convertSubCurrency(amount),
              currency: "usd",
            }}
          >
            <CheckoutForm amount={amount} />
          </Elements>
        </div>
        <div className="col-span-1">
          <div className="h-fit rounded-lg bg-white p-6 shadow-lg">
            <h1 className="mb-6 text-2xl font-bold">Order Summary</h1>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-semibold">Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Shipping Charge:</span>
                <span>${shippingCharge.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Discount:</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toaster />
    </AppWrapper>
  );
};

export default PaymentPage;
