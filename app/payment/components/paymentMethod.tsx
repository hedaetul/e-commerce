'use client';

import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { FaCashRegister, FaCcVisa, FaPaypal } from 'react-icons/fa';

interface PaymentMethodSectionProps {
  onSubmit: (e: React.FormEvent) => void;
}

const PaymentMethodSection: React.FC<PaymentMethodSectionProps> = ({
  onSubmit,
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState('credit-card');

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-lg'>
      <h1 className='text-2xl font-bold mb-6'>Payment Method</h1>
      <div className='space-y-4'>
        <div className='flex space-x-4 mb-6'>
          <Button
            onClick={() => handlePaymentMethodChange('credit-card')}
            className={`flex-1 border rounded-lg py-2 flex items-center justify-center`}
            variant={
              selectedPaymentMethod === 'credit-card' ? 'default' : 'outline'
            }
          >
            <FaCcVisa className='mr-2' /> Pay with Credit Card
          </Button>
          <Button
            onClick={() => handlePaymentMethodChange('paypal')}
            className={`flex-1 border rounded-lg py-2 flex items-center justify-center`}
            variant={selectedPaymentMethod === 'paypal' ? 'default' : 'outline'}
          >
            <FaPaypal className='mr-2' /> Pay with PayPal
          </Button>
          <Button
            onClick={() => handlePaymentMethodChange('cash-on-delivery')}
            className={`flex-1 border rounded-lg py-2 flex items-center justify-center`}
            variant={
              selectedPaymentMethod === 'cash-on-delivery'
                ? 'default'
                : 'outline'
            }
          >
            <FaCashRegister className='mr-2' /> Cash on Delivery
          </Button>
        </div>

        {selectedPaymentMethod === 'credit-card' && (
          <form onSubmit={onSubmit} className='space-y-4'>
            <div>
              <label htmlFor='cardNumber' className='block text-gray-700'>
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
              <label htmlFor='nameOnCard' className='block text-gray-700'>
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
            <div className='flex space-x-4 mt-6'>
              <Button
                variant='outline'
                type='button'
                className='w-1/2 py-2 px-4 rounded-lg'
              >
                Back to Checkout Details
              </Button>
              <Button type='submit' className='w-1/2 py-2 px-4 rounded-lg'>
                Submit Payment
              </Button>
            </div>
          </form>
        )}

        {selectedPaymentMethod === 'paypal' && (
          <form onSubmit={onSubmit} className='space-y-4'>
            <div>
              <label htmlFor='paypalEmail' className='block text-gray-700'>
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
            <div className='flex space-x-4 mt-6'>
              <Button
                variant='outline'
                type='button'
                className='w-1/2 py-2 px-4 rounded-lg'
              >
                Back to Checkout Details
              </Button>
              <Button type='submit' className='w-1/2 py-2 px-4 rounded-lg'>
                Submit Payment
              </Button>
            </div>
          </form>
        )}

        {selectedPaymentMethod === 'cash-on-delivery' && (
          <div className='text-gray-700'>
            <p>You will pay with cash upon delivery.</p>
            <div className='flex space-x-4 mt-6'>
              <Button
                type='button'
                variant='outline'
                className='w-1/2 py-2 px-4 rounded-lg'
              >
                Back to Checkout Details
              </Button>
              <Button
                type='button'
                className='w-1/2 py-2 px-4 rounded-lg'
                onClick={() => alert('Order Confirmed')}
              >
                Confirm Order
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodSection;
