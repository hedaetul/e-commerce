'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { format } from 'date-fns';
import Link from 'next/link';
import React from 'react';

const ConfirmationPage: React.FC = () => {
  const {
    subtotal,
    shippingCharge,
    tax,
    discount,
    totalAmount,
    billingAddress,
    shippingAddress,
    selectedPaymentMethod,
    cartItems,
  } = useCart();

  const orderId = 'ORDER12345'; // Replace with dynamic order ID
  const orderDate = format(new Date(), 'MMMM dd, yyyy');

  return (
    <div className='container mx-auto px-4 py-8'>
      <header className='bg-gray-800 text-white py-4 flex-col-center gap-3 text-center'>
        <h1 className='icon-7'>Bajar</h1>
        <p className='text-lg text-rose-100 italic'>Order Confirmation</p>
      </header>

      <div className='bg-white p-6 rounded-lg shadow-lg mt-8'>
        <div className='mb-4'>
          <p className='text-gray-600 text-sm'>Date: {orderDate}</p>
          <p className='text-gray-600 text-sm'>Order ID: {orderId}</p>
        </div>

        <div className='mb-6'>
          <h2 className='text-xl font-semibold mb-2'>Payment Method</h2>
          <p className='text-gray-800'>
            {selectedPaymentMethod.replace(/-/g, ' ').toUpperCase()}
          </p>
        </div>

        <div className='mb-6'>
          <h2 className='text-xl font-semibold mb-2'>Order Summary</h2>
          <ul className='space-y-2'>
            {cartItems.map((item) => (
              <li key={item.id} className='flex justify-between'>
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>

        <hr className='my-4 border-gray-300' />

        <div className='flex justify-between font-bold text-lg'>
          <span>Total:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <footer className='bg-gray-100 text-gray-600 py-4 text-center mt-8'>
        <p>If you have any questions or need assistance, please contact us:</p>
        <p>Email: support@bajar.com | Phone: (123) 456-7890</p>
      </footer>

      <div className='text-center mt-8'>
        <Button variant='outline'>
          <Link href='/'>Back to Home</Link>
        </Button>
        <Button className='ml-4'>
          <a href='#' onClick={() => window.print()}>
            Print Receipt
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
