"use client";

import AuthForm from "@/components/layout/authForm";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import React, { useState } from "react";
import AppWrapper from "../AppWrapper";
import PaymentMethodSection from "./components/paymentMethod";

const PaymentPage: React.FC = () => {
  const { user } = useAuth();
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    totalAmount,
    subtotal,
    shippingCharge,
    tax,
    discount,
    saveOrderData,
  } = useCart();

  const handleAuthClose = () => {
    setShowAuthForm(false);
    setErrorMessage("");
  };

  const saveOrder = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You need to be logged in to place an order.",
        variant: "destructive",
        duration: 2000,
      });
      setTimeout(() => {
        setShowAuthForm(true);
      }, 2000); 
      return;
    }
    try {
      await saveOrderData();
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  return (
    <AppWrapper>
      <div className="container mx-auto grid grid-cols-3 gap-8 px-4 py-8">
        <div className="col-span-2">
          <PaymentMethodSection onSubmit={saveOrder} />
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

      {showAuthForm && (
        <AuthForm
          isLogin={isLogin}
          toggleLoginSignup={() => setIsLogin(!isLogin)}
          setError={setErrorMessage}
          onClose={handleAuthClose}
        />
      )}
      <Toaster />
    </AppWrapper>
  );
};

export default PaymentPage;
