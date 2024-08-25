
import { CartItem } from "./cartTypes";

export const calculateSubtotal = (cartItems: CartItem[]): number => {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultValue;
};

export const saveToLocalStorage = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};
