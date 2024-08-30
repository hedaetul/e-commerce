"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { CartContextType, CartItem } from "./cartTypes";
import {
  calculateSubtotal,
  loadFromLocalStorage,
  saveToLocalStorage,
} from "./cartUtils";
import { useOrderManagement } from "./useOrderManagement";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() =>
    loadFromLocalStorage("cartItems", []),
  );
  const [subtotal, setSubtotal] = useState<number>(
    calculateSubtotal(cartItems),
  );
  const [shippingCharge, setShippingCharge] = useState<number>(() =>
    loadFromLocalStorage("shippingCharge", 12),
  );
  const [tax, setTax] = useState<number>(() => loadFromLocalStorage("tax", 3));
  const [discount, setDiscount] = useState<number>(() =>
    loadFromLocalStorage("discount", 5),
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>(
    () => loadFromLocalStorage("selectedPaymentMethod", ""),
  );
  const [addFormData, setAddFormData] = useState<Record<string, any>>({});
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  console.log(successMessage);
  

  const { saveOrderData, orderData } = useOrderManagement({
    cartItems,
    subtotal,
    shippingCharge,
    tax,
    discount,
    totalAmount,
    addFormData,
    selectedPaymentMethod,
  });

  useEffect(() => {
    const newSubtotal = calculateSubtotal(cartItems);
    setSubtotal(newSubtotal);
    const newTotalAmount = newSubtotal + shippingCharge + tax - discount;
    setTotalAmount(newTotalAmount);

    saveToLocalStorage("cartItems", cartItems);
    saveToLocalStorage("subtotal", newSubtotal);
    saveToLocalStorage("shippingCharge", shippingCharge);
    saveToLocalStorage("tax", tax);
    saveToLocalStorage("discount", discount);
    saveToLocalStorage("totalAmount", newTotalAmount);
    saveToLocalStorage("selectedPaymentMethod", 'cash-on-delivery');
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

  const clearCart = () => {
    setCartItems([]);
    saveToLocalStorage("cartItems", []);
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
        setSelectedPaymentMethod,
        clearCart,
        addFormData,
        setAddFormData,
        saveOrderData,
        successMessage,
        setSuccessMessage,
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
