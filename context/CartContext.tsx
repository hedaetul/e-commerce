'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface CartItem {
  id: string;
  name: string;
  photo: string;
  price: number;
  quantity: number;
}

interface Address {
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  totalAmount: number;
  subtotal: number;
  shippingCharge: number;
  tax: number;
  discount: number;
  billingAddress: Address | null;
  shippingAddress: Address | null;
  selectedPaymentMethod: string;
  updateSubtotal: (amount: number) => void;
  updateShippingCharge: (amount: number) => void;
  updateTax: (amount: number) => void;
  updateDiscount: (amount: number) => void;
  updateBillingAddress: (address: Address) => void;
  updateShippingAddress: (address: Address) => void;
  updateSelectedPaymentMethod: (method: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [subtotal, setSubtotal] = useState<number>(() => {
    const savedSubtotal = localStorage.getItem('subtotal');
    return savedSubtotal ? parseFloat(savedSubtotal) : 100;
  });

  const [shippingCharge, setShippingCharge] = useState<number>(() => {
    const savedShippingCharge = localStorage.getItem('shippingCharge');
    return savedShippingCharge ? parseFloat(savedShippingCharge) : 10;
  });

  const [tax, setTax] = useState<number>(() => {
    const savedTax = localStorage.getItem('tax');
    return savedTax ? parseFloat(savedTax) : 8;
  });

  const [discount, setDiscount] = useState<number>(() => {
    const savedDiscount = localStorage.getItem('discount');
    return savedDiscount ? parseFloat(savedDiscount) : 5;
  });

  const [billingAddress, setBillingAddress] = useState<Address | null>(() => {
    const savedAddress = localStorage.getItem('billingAddress');
    return savedAddress ? JSON.parse(savedAddress) : null;
  });

  const [shippingAddress, setShippingAddress] = useState<Address | null>(() => {
    const savedAddress = localStorage.getItem('shippingAddress');
    return savedAddress ? JSON.parse(savedAddress) : null;
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>(() => {
    const savedPaymentMethod = localStorage.getItem('selectedPaymentMethod');
    return savedPaymentMethod ? savedPaymentMethod : 'credit-card';
  });

  const totalAmount = subtotal + shippingCharge + tax - discount;

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('subtotal', subtotal.toFixed(2));
    localStorage.setItem('shippingCharge', shippingCharge.toFixed(2));
    localStorage.setItem('tax', tax.toFixed(2));
    localStorage.setItem('discount', discount.toFixed(2));
    localStorage.setItem('totalAmount', totalAmount.toFixed(2));
    if (billingAddress) {
      localStorage.setItem('billingAddress', JSON.stringify(billingAddress));
    }
    if (shippingAddress) {
      localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
    }
    localStorage.setItem('selectedPaymentMethod', selectedPaymentMethod);
  }, [cartItems, subtotal, shippingCharge, tax, discount, totalAmount, billingAddress, shippingAddress, selectedPaymentMethod]);

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((cartItem) => cartItem.id === item.id);
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
        item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
      )
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

  const updateBillingAddress = (address: Address) => {
    setBillingAddress(address);
  };

  const updateShippingAddress = (address: Address) => {
    setShippingAddress(address);
  };

  const updateSelectedPaymentMethod = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalAmount,
        subtotal,
        shippingCharge,
        tax,
        discount,
        billingAddress,
        shippingAddress,
        selectedPaymentMethod,
        updateSubtotal,
        updateShippingCharge,
        updateTax,
        updateDiscount,
        updateBillingAddress,
        updateShippingAddress,
        updateSelectedPaymentMethod,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
