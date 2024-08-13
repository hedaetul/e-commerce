import React from 'react';
import { OrderSummaryProps } from '@/types/orderTypes'; // Import the types

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  shippingCharge,
  tax,
  discount,
  total,
}) => (
  <div className='bg-white p-6 h-fit rounded-lg form-shadow'>
    <h1 className='text-2xl font-bold mb-6'>Order Summary</h1>
    <div className='space-y-4'>
      <div className='flex justify-between'>
        <span>Subtotal:</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className='flex justify-between'>
        <span>Shipping Charge:</span>
        <span>${shippingCharge.toFixed(2)}</span>
      </div>
      <div className='flex justify-between'>
        <span>Tax:</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <div className='flex justify-between'>
        <span>Discount:</span>
        <span>-${discount.toFixed(2)}</span>
      </div>
      <div className='flex justify-between font-bold'>
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  </div>
);

export default OrderSummary;
