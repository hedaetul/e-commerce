'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AppWrapper from '../AppWrapper';
import AddressForm from './components/addressForm';

const Checkout: React.FC = () => {
  const [billingData, setBillingData] = useState({
    fullName: '',
    phoneNumber: '',
    zipCode: '',
    address1: '',
    email: '',
    company: '',
    country: '',
    address2: '',
  });
  const [shippingData, setShippingData] = useState({
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
    const savedSubtotal = localStorage.getItem('subtotal');
    return savedSubtotal ? parseFloat(savedSubtotal) : 100;
  });
  const [shippingCharge, setShippingCharge] = useState(10);
  const [tax, setTax] = useState(8);
  const [discount, setDiscount] = useState(5);

  const total = subtotal + shippingCharge + tax - discount;

  useEffect(() => {
    const savedBillingData = localStorage.getItem('billingData');
    if (savedBillingData) {
      setBillingData(JSON.parse(savedBillingData));
    }
    const savedShippingData = localStorage.getItem('shippingData');
    if (savedShippingData) {
      setShippingData(JSON.parse(savedShippingData));
    }
  }, []);

  const handleBillingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedBillingData = { ...billingData, [name]: value };
    setBillingData(updatedBillingData);
    localStorage.setItem('billingData', JSON.stringify(updatedBillingData));
  };

  const handleShippingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedShippingData = { ...shippingData, [name]: value };
    setShippingData(updatedShippingData);
    localStorage.setItem('shippingData', JSON.stringify(updatedShippingData));
  };

  const handleShippingAddressToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setShippingData(billingData); 
    } else {
      setShowShippingAddress(true);
    }
  };

  console.log(billingData);
console.log(shippingData);


  return (
    <AppWrapper>
      <div className='container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div className='md:col-span-2'>
          <div className='bg-white p-6 rounded-lg form-shadow mb-6'>
            <AddressForm
              formData={billingData}
              handleInputChange={handleBillingInputChange}
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
                  formData={shippingData}
                  handleInputChange={handleShippingInputChange}
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
