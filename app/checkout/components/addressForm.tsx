// AddressForm.tsx

import React from 'react';
import { AddressData } from '@/types/addressTypes'; // Adjust import path as needed

interface AddressFormProps {
  formData: AddressData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
}

const AddressForm: React.FC<AddressFormProps> = ({
  formData,
  handleInputChange,
  title,
}) => {
  return (
    <div className='bg-white p-6 rounded-lg'>
      <h1 className='text-2xl font-bold mb-6'>{title}</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col'>
            <label htmlFor='fullName' className='mb-1 font-medium'>
              Full Name
            </label>
            <input
              id='fullName'
              type='text'
              name='fullName'
              value={formData.fullName}
              onChange={handleInputChange}
              className='p-2 border border-gray-200 rounded-sm hover:border-gray-400 focus:border-red-400 focus:outline-none'
              aria-required='true'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='phoneNumber' className='mb-1 font-medium'>
              Phone Number
            </label>
            <input
              id='phoneNumber'
              type='text'
              name='phoneNumber'
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className='p-2 border border-gray-200 rounded-sm hover:border-gray-400 focus:border-red-400 focus:outline-none'
              aria-required='true'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='zipCode' className='mb-1 font-medium'>
              Zip Code
            </label>
            <input
              id='zipCode'
              type='text'
              name='zipCode'
              value={formData.zipCode}
              onChange={handleInputChange}
              className='p-2 border border-gray-200 rounded-sm hover:border-gray-400 focus:border-red-400 focus:outline-none'
              aria-required='true'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='address1' className='mb-1 font-medium'>
              Address 1
            </label>
            <input
              id='address1'
              type='text'
              name='address1'
              value={formData.address1}
              onChange={handleInputChange}
              className='p-2 border border-gray-200 rounded-sm hover:border-gray-400 focus:border-red-400 focus:outline-none'
              aria-required='true'
            />
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col'>
            <label htmlFor='email' className='mb-1 font-medium'>
              Email
            </label>
            <input
              id='email'
              type='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              className='p-2 border border-gray-200 rounded-sm hover:border-gray-400 focus:border-red-400 focus:outline-none'
              aria-required='true'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='company' className='mb-1 font-medium'>
              Company
            </label>
            <input
              id='company'
              type='text'
              name='company'
              value={formData.company}
              onChange={handleInputChange}
              className='p-2 border border-gray-200 rounded-sm hover:border-gray-400 focus:border-red-400 focus:outline-none'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='country' className='mb-1 font-medium'>
              Country
            </label>
            <input
              id='country'
              type='text'
              name='country'
              value={formData.country}
              onChange={handleInputChange}
              className='p-2 border border-gray-200 rounded-sm hover:border-gray-400 focus:border-red-400 focus:outline-none'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='address2' className='mb-1 font-medium'>
              Address 2
            </label>
            <input
              id='address2'
              type='text'
              name='address2'
              value={formData.address2}
              onChange={handleInputChange}
              className='p-2 border border-gray-200 rounded-sm hover:border-gray-400 focus:border-red-400 focus:outline-none'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
