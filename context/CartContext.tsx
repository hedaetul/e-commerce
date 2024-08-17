"use client";

import { toast } from "@/components/ui/use-toast";
import { auth, firestore } from "@/lib/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

type CartItem = {
  id: string;
  name: string;
  photo: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  subtotal: number;
  shippingCharge: number;
  tax: number;
  discount: number;
  totalAmount: number;
  selectedPaymentMethod: string;
  updateSubtotal: (amount: number) => void;
  updateShippingCharge: (amount: number) => void;
  updateTax: (amount: number) => void;
  updateDiscount: (amount: number) => void;
  updateSelectedPaymentMethod: (method: string) => void;
  clearCart: () => void;
  addFormData: Record<string, any>;
  setAddFormData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  saveOrderData: () => Promise<void>;
  orderData: object | null;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const [subtotal, setSubtotal] = useState<number>(calculateSubtotal);
  const [shippingCharge, setShippingCharge] = useState<number>(() => {
    const savedShippingCharge = localStorage.getItem("shippingCharge");
    return savedShippingCharge ? parseFloat(savedShippingCharge) : 0;
  });

  const [tax, setTax] = useState<number>(() => {
    const savedTax = localStorage.getItem("tax");
    return savedTax ? parseFloat(savedTax) : 0;
  });

  const [discount, setDiscount] = useState<number>(() => {
    const savedDiscount = localStorage.getItem("discount");
    return savedDiscount ? parseFloat(savedDiscount) : 0;
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>(
    () => {
      const savedPaymentMethod = localStorage.getItem("selectedPaymentMethod");
      return savedPaymentMethod ? savedPaymentMethod : "credit-card";
    },
  );

  const [addFormData, setAddFormData] = useState<Record<string, any>>({});
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [orderData, setOrderData] = useState<object | null>(null);

  const router = useRouter();

  useEffect(() => {
    const newSubtotal = calculateSubtotal();
    setSubtotal(newSubtotal);

    const newTotalAmount = newSubtotal + shippingCharge + tax - discount;
    setTotalAmount(newTotalAmount);

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("subtotal", newSubtotal.toFixed(2));
    localStorage.setItem("shippingCharge", shippingCharge.toFixed(2));
    localStorage.setItem("tax", tax.toFixed(2));
    localStorage.setItem("discount", discount.toFixed(2));
    localStorage.setItem("totalAmount", newTotalAmount.toFixed(2));
    localStorage.setItem("selectedPaymentMethod", selectedPaymentMethod);
  }, [cartItems, shippingCharge, tax, discount, selectedPaymentMethod]);

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex(
        (cartItem) => cartItem.id === item.id,
      );
      if (itemIndex >= 0) {
        const newItems = [...prevItems];
        newItems[itemIndex].quantity += item.quantity;
        return newItems;
      }
      return [...prevItems, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item,
      ),
    );
  };

  const updateSubtotal = (amount: number) => {
    setSubtotal(amount);
  };

  const updateShippingCharge = (amount: number) => {
    setShippingCharge(amount);
  };

  const updateTax = (amount: number) => {
    setTax(amount);
  };

  const updateDiscount = (amount: number) => {
    setDiscount(amount);
  };

  const updateSelectedPaymentMethod = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  const saveOrderData = async () => {
    if (!auth.currentUser) {
      toast({
        title: "User is not authenticated",
        description: "User must be logged in to place an order",
        className: "bg-rose-600 text-white",
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
        setOrderData(orderData); // Save orderData to state
        router.push(`/confirmation?orderId=${orderId}`);
        clearCart();
      } catch (error) {
        console.error("Error saving order to Firestore:", error);
        throw new Error("Error saving order to Firestore");
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        subtotal,
        shippingCharge,
        tax,
        discount,
        totalAmount,
        selectedPaymentMethod,
        updateSubtotal,
        updateShippingCharge,
        updateTax,
        updateDiscount,
        updateSelectedPaymentMethod,
        clearCart,
        addFormData,
        setAddFormData,
        saveOrderData,
        orderData,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
