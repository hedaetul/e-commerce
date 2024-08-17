import React from "react";
import { useCart } from "@/context/CartContext";

const OrderSummary: React.FC = () => {
  const { subtotal, shippingCharge, tax, discount, totalAmount } = useCart();

  return (
    <div className="form-shadow h-fit rounded-lg bg-white p-6">
      <h1 className="mb-6 text-2xl font-bold">Order Summary</h1>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping Charge:</span>
          <span>${shippingCharge.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax:</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount:</span>
          <span>-${discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
