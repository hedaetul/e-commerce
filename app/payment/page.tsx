'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import React from 'react';
import AppWrapper from '../AppWrapper';
import PaymentMethodSection from './components/paymentMethod';

const PaymentPage: React.FC = () => {
  const { totalAmount, subtotal, shippingCharge, tax, discount } = useCart();

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment submission logic here
    alert('Payment submitted');
  };

  return (
    <AppWrapper>
      <div className='container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div className='md:col-span-2'>
          <PaymentMethodSection onSubmit={handlePaymentSubmit} />
        </div>

        <div className='bg-white p-6 h-fit rounded-lg shadow-lg'>
          <h1 className='text-2xl font-bold mb-6'>Order Summary</h1>
          <div className='space-y-4'>
            <div className='flex justify-between'>
              <span className='font-semibold'>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className='flex justify-between'>
              <span className='font-semibold'>Shipping Charge:</span>
              <span>${shippingCharge.toFixed(2)}</span>
            </div>
            <div className='flex justify-between'>
              <span className='font-semibold'>Tax:</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className='flex justify-between'>
              <span className='font-semibold'>Discount:</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
            <div className='flex justify-between font-bold'>
              <span>Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </AppWrapper>
  );
};

export default PaymentPage;
