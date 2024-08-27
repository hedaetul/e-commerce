"use client";

import { Toaster } from "@/components/ui/toaster";
import { useCart } from "@/context/CartContext";
import convertSubCurrency from "@/lib/convertSubCurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import AppWrapper from "../AppWrapper";
import OrderSummary from "../checkout/components/orderSummary";
import CheckoutForm from "./components/checkoutForm";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const PaymentPage: React.FC = () => {
  const { totalAmount, subtotal, shippingCharge, tax, discount } = useCart();

  const amount = totalAmount;

  return (
    <AppWrapper>
      <div className="container mx-auto grid gap-8 px-4 py-8 md:grid-cols-3">
        <div className="md:col-span-2">
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
        <OrderSummary
          subtotal={subtotal}
          shippingCharge={shippingCharge}
          tax={tax}
          discount={discount}
          total={totalAmount}
        />
      </div>

      <Toaster />
    </AppWrapper>
  );
};

export default PaymentPage;
