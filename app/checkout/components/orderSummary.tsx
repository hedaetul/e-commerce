import React from "react";

type OrderSummaryProps = {
  subtotal: number;
  shippingCharge: number;
  tax: number;
  discount: number;
  total: number;
};

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  shippingCharge,
  tax,
  discount,
  total,
}) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
      <div className="space-y-2">
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
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
