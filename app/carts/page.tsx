'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import AppWrapper from '../AppWrapper';

const Carts: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, totalAmount } = useCart();

  const handlePlaceOrder = () => {
    // Implement order placing logic
    // Optionally redirect to another page
  };

  return (
    <AppWrapper>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-2xl font-bold mb-4'>Your Cart</h1>
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
              <Button
                onClick={handlePlaceOrder}
                className='bg-blue-500 hover:bg-blue-600 text-white'
              >
                Place Order
              </Button>
            </div>
          </div>
        )}
      </div>
    </AppWrapper>
  );
};

export default Carts;
