'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import React, { useState } from 'react';
import { FaCashRegister, FaCcVisa, FaPaypal } from 'react-icons/fa';
import AppWrapper from '../AppWrapper';

const PaymentPage: React.FC = () => {
  const { totalAmount, subtotal, shippingCharge, tax, discount } = useCart();
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState('credit-card');

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment submission logic here
    alert('Payment submitted');
  };

  return (
    <AppWrapper>
      <div className='container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8'>
        {/* Payment Form */}
        <div className='md:col-span-2'>
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <h1 className='text-2xl font-bold mb-6'>Payment Method</h1>
            <div className='space-y-4'>
              {/* Payment Option Buttons */}
              <div className='flex space-x-4 mb-6'>
                <Button
                  onClick={() => handlePaymentMethodChange('credit-card')}
                  className={`flex-1  border rounded-lg py-2 flex items-center justify-center`}
                  variant={
                    selectedPaymentMethod === 'credit-card'
                      ? 'default'
                      : 'outline'
                  }
                >
                  <FaCcVisa className='mr-2' /> Pay with Credit Card
                </Button>
                <Button
                  onClick={() => handlePaymentMethodChange('paypal')}
                  className={`flex-1  border rounded-lg py-2 flex items-center justify-center`}
                  variant={
                    selectedPaymentMethod === 'paypal' ? 'default' : 'outline'
                  }
                >
                  <FaPaypal className='mr-2' /> Pay with PayPal
                </Button>
                <Button
                  onClick={() => handlePaymentMethodChange('cash-on-delivery')}
                  className={`flex-1  border rounded-lg py-2 flex items-center justify-center`}
                  variant={
                    selectedPaymentMethod === 'cash-on-delivery'
                      ? 'default'
                      : 'outline'
                  }
                >
                  <FaCashRegister className='mr-2' /> Cash on Delivery
                </Button>
              </div>

              {/* Credit Card Form */}
              {selectedPaymentMethod === 'credit-card' && (
                <form onSubmit={handleSubmit}>
                  <div className='space-y-4'>
                    <div>
                      <label
                        htmlFor='cardNumber'
                        className='block text-gray-700'
                      >
                        Card Number
                      </label>
                      <input
                        type='text'
                        id='cardNumber'
                        placeholder='1234 5678 9012 3456'
                        className='w-full mt-1 p-2 border border-gray-300 rounded-lg focus:border-red-400 focus:outline-none'
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='nameOnCard'
                        className='block text-gray-700'
                      >
                        Name on Card
                      </label>
                      <input
                        type='text'
                        id='nameOnCard'
                        placeholder='John Doe'
                        className='w-full mt-1 p-2 border border-gray-300 rounded-lg focus:border-red-400 focus:outline-none'
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor='expDate' className='block text-gray-700'>
                        Expiration Date
                      </label>
                      <input
                        type='text'
                        id='expDate'
                        placeholder='MM/YY'
                        className='w-full mt-1 p-2 border border-gray-300 rounded-lg focus:border-red-400 focus:outline-none'
                        required
                      />
                    </div>
                    <Button
                      type='submit'
                      className='w-full py-2 px-4 rounded-lg'
                    >
                      Submit Payment
                    </Button>
                  </div>
                </form>
              )}

              {/* PayPal Form */}
              {selectedPaymentMethod === 'paypal' && (
                <form onSubmit={handleSubmit}>
                  <div className='space-y-4'>
                    <div>
                      <label
                        htmlFor='paypalEmail'
                        className='block text-gray-700'
                      >
                        PayPal Email
                      </label>
                      <input
                        type='email'
                        id='paypalEmail'
                        placeholder='you@example.com'
                        className='w-full mt-1 p-2 border border-gray-300 rounded-lg focus:border-red-400 focus:outline-none'
                        required
                      />
                    </div>
                    <Button
                      type='submit'
                      className='w-full py-2 px-4 rounded-lg'
                    >
                      Submit Payment
                    </Button>
                  </div>
                </form>
              )}

              {/* Cash on Delivery */}
              {selectedPaymentMethod === 'cash-on-delivery' && (
                <div className='text-gray-700'>
                  <p>You will pay with cash upon delivery.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Summary Card */}
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
