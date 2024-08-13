// ShippingAddressForm.tsx

import React from 'react';
import AddressForm from './addressForm';
import { AddressData } from '@/types/addressTypes'; 

interface ShippingAddressFormProps {
  shippingData: AddressData;
  handleShippingInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showShippingAddress: boolean;
  handleShippingAddressToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({
  shippingData,
  handleShippingInputChange,
  showShippingAddress,
  handleShippingAddressToggle,
}) => (
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
      <AddressForm
        formData={shippingData}
        handleInputChange={handleShippingInputChange}
        title='Shipping Address'
      />
    )}
  </div>
);

export default ShippingAddressForm;
