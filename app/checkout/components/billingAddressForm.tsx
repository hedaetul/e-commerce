// BillingAddressForm.tsx

import React from 'react';
import AddressForm from './addressForm';
import { AddressData } from '@/types/addressTypes'; // Adjust import path as needed

interface BillingAddressFormProps {
  billingData: AddressData;
  handleBillingInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BillingAddressForm: React.FC<BillingAddressFormProps> = ({
  billingData,
  handleBillingInputChange,
}) => (
  <div className='bg-white p-6 rounded-lg form-shadow mb-6'>
    <AddressForm
      formData={billingData}
      handleInputChange={handleBillingInputChange}
      title='Billing Address'
    />
  </div>
);

export default BillingAddressForm;
