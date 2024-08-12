// src/pages/profile.tsx
'use client';

import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import AppWrapper from '../AppWrapper';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>Loading...</p>; // Handle the loading state or redirect to login page
  }

  const { displayName, email, photoURL } = user;

  // Dummy data for orders (replace with real data from your API)
  const orders = [
    { id: '12345', date: '2024-08-01', total: 99.99, status: 'Shipped' },
    { id: '67890', date: '2024-07-15', total: 49.99, status: 'Delivered' },
    { id: '54321', date: '2024-06-10', total: 19.99, status: 'Pending' },
  ];

  return (
    <AppWrapper>
      <div className='container mx-auto px-4 py-8'>
        {/* Profile Header */}
        <div className='bg-white p-6 rounded-lg shadow-md mb-8'>
          <div className='flex items-center space-x-6'>
            <div className='relative w-24 h-24'>
              <Image
                src={photoURL || '/default-user-icon.png'}
                alt={displayName || 'User Profile'}
                fill
                style={{ objectFit: 'cover' }}
                className='rounded-full'
              />
            </div>
            <div>
              <h1 className='text-3xl font-semibold mb-2'>{displayName || 'User'}</h1>
              <p className='text-gray-600'>{email}</p>
              <div className='mt-4'>
                <Link href='/edit-profile'>
                  <div className='text-blue-500 hover:underline cursor-pointer'>Edit Profile</div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Card */}
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-2xl font-semibold mb-4'>Previous Orders</h2>
          <div className='space-y-4'>
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.id} className='border border-gray-200 rounded-lg p-4'>
                  <div className='flex justify-between mb-2'>
                    <span className='font-medium'>Order ID:</span>
                    <span>{order.id}</span>
                  </div>
                  <div className='flex justify-between mb-2'>
                    <span className='font-medium'>Date:</span>
                    <span>{order.date}</span>
                  </div>
                  <div className='flex justify-between mb-2'>
                    <span className='font-medium'>Total:</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='font-medium'>Status:</span>
                    <span className={`font-medium ${order.status === 'Shipped' ? 'text-green-500' : order.status === 'Delivered' ? 'text-blue-500' : 'text-yellow-500'}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p>No previous orders found.</p>
            )}
          </div>
        </div>
      </div>
    </AppWrapper>
  );
};

export default ProfilePage;
