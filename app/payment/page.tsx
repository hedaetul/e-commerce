"use client";

import AuthForm from "@/components/layout/authForm";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { auth, firestore } from "@/lib/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import AppWrapper from "../AppWrapper";
import PaymentMethodSection from "./components/paymentMethod";

const PaymentPage: React.FC = () => {
  const { user } = useAuth();
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  const {
    totalAmount,
    subtotal,
    shippingCharge,
    tax,
    discount,
    addFormData,
    selectedPaymentMethod,
    cartItems,
    clearCart,
  } = useCart();

  const handleAuthClose = () => {
    setShowAuthForm(false);
    setErrorMessage("");
  };

  const saveOrder = async () => {
    if (!auth.currentUser) {
      toast({
        title: "User is not authenticated",
        description: "User must be logged in to place an order",
      });
      throw new Error("User must be logged in to place an order");
    } else {
      const orderId = new Date().toISOString();
      const userId = auth.currentUser.uid;

      const orderData = {
        orderId,
        date: Timestamp.now(),
        subtotal,
        shippingCharge,
        tax,
        discount,
        totalAmount,
        addFormData,
        paymentMethod: selectedPaymentMethod,
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      };

      try {
        await setDoc(
          doc(firestore, "users", userId, "orders", orderId),
          orderData,
        );
        router.push("/confirmation");
        clearCart();
      } catch (error) {
        console.error("Error saving order to Firestore:", error);
        throw new Error("Error saving order to Firestore");
      }
    }
  };

  return (
    <AppWrapper>
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <PaymentMethodSection onSubmit={saveOrder} />
        </div>

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

      {showAuthForm && (
        <AuthForm
          isLogin={isLogin}
          toggleLoginSignup={() => setIsLogin(!isLogin)}
          setError={setErrorMessage}
          onClose={handleAuthClose}
        />
      )}
    </AppWrapper>
  );
};

export default PaymentPage;
