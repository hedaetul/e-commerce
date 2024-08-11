'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useState } from 'react';
import AppWrapper from '../AppWrapper';
import AddressForm from './components/addressForm';

const Checkout: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    zipCode: '',
    address1: '',
    email: '',
    company: '',
    country: '',
    address2: '',
  });
  const [showShippingAddress, setShowShippingAddress] = useState(true);
  const [subtotal, setSubtotal] = useState(() => {
    const savedSubtotal = localStorage.getItem('totalAmount');
    return savedSubtotal ? parseFloat(savedSubtotal) : 100;
  });
  const [shippingCharge, setShippingCharge] = useState(10);
  const [tax, setTax] = useState(8);
  const [discount, setDiscount] = useState(5);

  const total = subtotal + shippingCharge + tax - discount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleShippingAddressToggle = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowShippingAddress(!e.target.checked);
  };

  return (
    <AppWrapper>
      <div className='container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div className='md:col-span-2'>
          <div className='bg-white p-6 rounded-lg form-shadow mb-6'>
            <AddressForm
              formData={formData}
              handleInputChange={handleInputChange}
              title='Billing Address'
            />
          </div>

          <div className='bg-white p-6 rounded-lg form-shadow mb-6'>
            <label htmlFor='sameAsBilling' className='flex items-center mb-4'>
              <input
                id='sameAsBilling'
                type='checkbox'
                onChange={handleShippingAddressToggle}
                className='mr-2'
              />
              <span>Shipping address is the same as billing address</span>
            </label>
            {showShippingAddress && (
              <div>
                <AddressForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  title='Shipping Address'
                />
              </div>
            )}
          </div>
        </div>

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
          <div className='flex justify-between mt-6'>
            <Link href='/carts'>
              <Button variant='outline'>Back to Cart</Button>
            </Link>
            <Link href='/payment'>
              <Button>Proceed to Payment</Button>
            </Link>
          </div>
        </div>
      </div>
    </AppWrapper>
  );
};

export default Checkout;
