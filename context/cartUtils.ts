import { CartItem } from "./cartTypes";

export const calculateSubtotal = (cartItems: CartItem[]): number => {
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
};

export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  const saved = localStorage.getItem(key);

  if (saved) {
    try {
      return saved ? JSON.parse(saved) : defaultValue;
    } catch (error) {
      console.log(error);
      localStorage.removeItem(key);
      return defaultValue;
    }
  }
  return defaultValue;
};

export const saveToLocalStorage = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};
