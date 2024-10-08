"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import AppWrapper from "../AppWrapper";
import AddressForm from "./components/addressForm";
import OrderSummary from "./components/orderSummary";

const Checkout: React.FC = () => {
  const router = useRouter();
  const { cartItems, clearCart,totalAmount,tax,shippingCharge,discount } = useCart();

  const [subtotal, setSubtotal] = useState(() => {
    const savedSubtotal = localStorage.getItem("subtotal");
    return savedSubtotal ? parseFloat(savedSubtotal) : 100;
  });
 


  return (
    <AppWrapper>
      <div className="container mx-auto grid md:grid-cols-3 gap-8 px-4 py-8">
        <div className="md:col-span-2">
          <AddressForm title="Address Form" />
        </div>
        <div className="md:col-span-1">
          <OrderSummary
            subtotal={subtotal}
            shippingCharge={shippingCharge}
            tax={tax}
            discount={discount}
            total={totalAmount}
          />
        </div>
      </div>
    </AppWrapper>
  );
};

export default Checkout;
