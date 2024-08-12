'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaRegUser } from 'react-icons/fa';
import { MdCategory, MdOutlineLocalGroceryStore } from 'react-icons/md';
import AuthForm from './authForm';
import { useAuth } from '@/context/AuthContext'; // Import the useAuth hook

const links = [
  { href: '#', text: 'Home' },
  { href: '#', text: 'User Account' },
  { href: '#', text: 'Vendor Account' },
  { href: '#', text: 'Track My Order' },
  { href: '#', text: 'Back to Demos' },
];

const Navbar: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { cartItems } = useCart();
  const cartItemCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  const { user } = useAuth(); // Use the useAuth hook

  const toggleLoginSignup = () => {
    setIsLogin(!isLogin);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleUserIconClick = () => {
    if (user) {
      // If user is logged in, redirect to the profile page
      window.location.href = '/profile';
    } else {
      // If user is not logged in, open the AuthForm dialog
      handleOpenDialog();
    }
  };

  return (
    <div className='w-screen shadow-lg'>
      <div className='container flex flex-col justify-between'>
        <div className='h-[5rem] flex justify-between items-center'>
          <h1 className='icon-7'>Bajar</h1>
          <div className='relative w-[660px]'>
            <AiOutlineSearch className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg' />
            <input
              type='text'
              className='w-full h-[44px] border border-gray-200 focus:border-blue-300 rounded-full pl-12 pr-5 outline-none'
              placeholder='Search'
            />
          </div>
          <div className='flex gap-3'>
            <span
              className='bg-slate-100 hover:bg-slate-200 h-10 w-10 rounded-full flex items-center justify-center cursor-pointer'
              onClick={handleUserIconClick} // Update click handler
            >
              <FaRegUser className='text-lg' />
            </span>
            <Link
              href='/carts'
              className='relative bg-slate-100 hover:bg-slate-200 h-10 w-10 rounded-full flex items-center justify-center'
            >
              <MdOutlineLocalGroceryStore className='text-lg' />
              {/* Cart item count badge */}
              {cartItemCount > 0 && (
                <span className='absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
        <div className='h-[3.75rem] flex justify-between items-center'>
          <div className='flex items-center hover:bg-slate-100 rounded px-4 py-1'>
            <MdCategory className='text-lg mr-2' />
            <a href='#' className='text-gray-600 hover:text-gray-900'>
              Category
            </a>
          </div>
          <div className='flex gap-5'>
            {links.map((link) => (
              <Link
                key={link.text}
                href={link.href}
                className='text-gray-600 hover:text-gray-900'
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
      {isDialogOpen && (
        <AuthForm
          isLogin={isLogin}
          toggleLoginSignup={toggleLoginSignup}
          setError={handleError}
          onClose={handleCloseDialog}
        />
      )}
    </div>
  );
};

export default Navbar;
