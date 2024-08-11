'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import AppWrapper from '../AppWrapper';

const Carts: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, totalAmount } = useCart();
  const router = useRouter();
  const [note, setNote] = useState('');
  const [voucher, setVoucher] = useState('');

  const handleApplyVoucher = () => {
    // Implement voucher application logic
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <AppWrapper>
      <div className='container mx-auto px-4 py-8 flex'>
        <div className='w-2/3 pr-4'>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className='flex justify-between items-center mb-4 p-4 border border-gray-200 rounded-lg'
                >
                  <div className='flex items-center'>
                    <Image
                      src={item.photo}
                      alt={item.name}
                      className='w-16 h-16 object-cover mr-4'
                    />
                    <div>
                      <h2 className='text-lg font-semibold'>{item.name}</h2>
                      <p className='text-gray-600'>${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <Button
                      variant='outline'
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className='mr-2'
                    >
                      -
                    </Button>
                    <span className='mx-2'>{item.quantity}</span>
                    <Button
                      variant='outline'
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className='mr-2'
                    >
                      +
                    </Button>
                    <Button
                      variant='outline'
                      onClick={() => removeFromCart(item.id)}
                      className='text-red-500'
                    >
                      <FaRegTrashAlt />
                    </Button>
                  </div>
                </div>
              ))}
              <div className='flex justify-between items-center mt-4'>
                <h2 className='text-xl font-bold'>
                  Total Amount: ${totalAmount.toFixed(2)}
                </h2>
              </div>
            </div>
          )}
        </div>

        <div className='w-1/3 pl-4'>
          <div className='bg-white p-4 border border-gray-200 rounded-lg shadow-md'>
            <h2 className='text-lg font-semibold mb-4'>Checkout</h2>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder='Add a note (optional)'
              className='w-full h-24 mb-4 p-2 border border-gray-300 rounded-lg'
            />
            <div className='mb-4'>
              <input
                type='text'
                value={voucher}
                onChange={(e) => setVoucher(e.target.value)}
                placeholder='Enter voucher code'
                className='w-full p-2 border border-gray-300 rounded-lg'
              />
              <Button
                onClick={handleApplyVoucher}
                variant='outline'
                className='mt-2 border-2 border-rose-500 text-rose-500 hover:bg-rose-600 hover:text-gray-100'
              >
                Apply Voucher
              </Button>
            </div>
            <Button
              onClick={handleCheckout}
              className='w-full'
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </AppWrapper>
  );
};

export default Carts;
