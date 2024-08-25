import { auth, firestore } from "@/lib/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CartItem } from "./cartTypes";

type OrderManagementProps = {
  cartItems: CartItem[];
  subtotal: number;
  shippingCharge: number;
  tax: number;
  discount: number;
  totalAmount: number;
  addFormData: Record<string, any>;
  selectedPaymentMethod: string;
};

export const useOrderManagement = ({
  cartItems,
  subtotal,
  shippingCharge,
  tax,
  discount,
  totalAmount,
  addFormData,
  selectedPaymentMethod,
}: OrderManagementProps) => {
  const [orderData, setOrderData] = useState<object | null>(null);
  const router = useRouter();

  const saveOrderData = async () => {
    if (!auth.currentUser) {
      throw new Error("User must be logged in to place an order");
    }

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
      await setDoc(doc(firestore, "users", userId, "orders", orderId), orderData);
      setOrderData(orderData);
      router.push(`/confirmation?orderId=${orderId}`);
    } catch (error) {
      console.error("Error saving order to Firestore:", error);
      throw new Error("Error saving order to Firestore");
    }
  };

  return { saveOrderData, orderData };
};
