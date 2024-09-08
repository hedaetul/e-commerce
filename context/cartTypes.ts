import { Timestamp } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";

export type CartItem = {
  id: string;
  name: string;
  photo: any;
  price: number;
  quantity: number;
};

export type OrderData = {
  orderId: string;
  date: Timestamp;
  subtotal: number;
  shippingCharge: number;
  tax: number;
  discount: number;
  totalAmount: number;
  addFormData: Record<string, any>;
  paymentMethod: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
};

export type CartContextType = {
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
  setSelectedPaymentMethod: Dispatch<SetStateAction<string>>;
  clearCart: () => void;
  addFormData: Record<string, any>;
  setAddFormData: Dispatch<SetStateAction<Record<string, any>>>;
  saveOrderData: () => Promise<void>;
  successMessage: boolean;
  setSuccessMessage: Dispatch<SetStateAction<boolean>>;
};
