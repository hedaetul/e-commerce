'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { auth, firestore } from '@/lib/firebase';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import AppWrapper from '../AppWrapper';
import BillingAddressForm from './components/billingAddressForm';
import ShippingAddressForm from './components/shippingAddressForm';
import OrderSummary from './components/orderSummary';

const Checkout: React.FC = () => {
  const router = useRouter();
  const { cartItems, clearCart } = useCart(); // Get cart items and clear function from CartContext
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

  const handleShippingInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updatedShippingData = { ...shippingData, [name]: value };
    setShippingData(updatedShippingData);
    localStorage.setItem('shippingData', JSON.stringify(updatedShippingData));
  };

  const handleShippingAddressToggle = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.checked) {
      setShippingData(billingData);
      setShowShippingAddress(false);
    } else {
      setShowShippingAddress(true);
    }
  };

  const handleConfirmOrder = async () => {
    if (!auth.currentUser) {
      // Handle user not authenticated case
      return;
    }

    const orderId = new Date().toISOString(); // Generate a unique order ID
    const userId = auth.currentUser.uid;

    // Create order data
    const orderData = {
      orderId,
      date: Timestamp.now(),
      subtotal,
      shippingCharge,
      tax,
      discount,
      totalAmount: total,
      billingAddress: billingData,
      shippingAddress: showShippingAddress ? billingData : shippingData,
      paymentMethod: 'Credit Card', // Or whichever payment method the user selected
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    try {
      // Save order to Firestore
      await setDoc(
        doc(firestore, 'users', userId, 'orders', orderId),
        orderData
      );

      // Clear local storage and cart
      localStorage.removeItem('cart');
      localStorage.removeItem('billingData');
      localStorage.removeItem('shippingData');
      clearCart();

      // Redirect to confirmation page
      router.push('/confirmation');
    } catch (error) {
      console.error('Error saving order to Firestore:', error);
      // Handle error (e.g., show a notification to the user)
    }
  };

  return (
    <AppWrapper>
      <div className='container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div className='md:col-span-2'>
          <BillingAddressForm
            billingData={billingData}
            handleBillingInputChange={handleBillingInputChange}
          />
          <ShippingAddressForm
            shippingData={shippingData}
            handleShippingInputChange={handleShippingInputChange}
            showShippingAddress={showShippingAddress}
            handleShippingAddressToggle={handleShippingAddressToggle}
          />
        </div>

        <OrderSummary
          subtotal={subtotal}
          shippingCharge={shippingCharge}
          tax={tax}
          discount={discount}
          total={total}
        />

        <div className='flex justify-between mt-6'>
          <Link href='/carts'>
            <Button variant='outline'>Back to Cart</Button>
          </Link>
          <Button onClick={handleConfirmOrder}>Confirm Order</Button>
        </div>
      </div>
    </AppWrapper>
  );
};

export default Checkout;
