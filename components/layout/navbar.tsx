'use client';

import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaRegUser } from 'react-icons/fa';
import { MdCategory, MdOutlineLocalGroceryStore } from 'react-icons/md';
import AuthForm from './authForm/authForm';

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
              onClick={handleOpenDialog} // Open the dialog on click
            >
              <FaRegUser className='text-lg' />
            </span>
            <span className='bg-slate-100 hover:bg-slate-200 h-10 w-10 rounded-full flex items-center justify-center cursor-pointer'>
              <MdOutlineLocalGroceryStore className='text-lg' />
            </span>
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
              <a
                key={link.text}
                href={link.href}
                className='text-gray-600 hover:text-gray-900'
              >
                {link.text}
              </a>
            ))}
          </div>
        </div>
      </div>
      {/* Render AuthForm directly as a dialog */}
      {isDialogOpen && (
        <AuthForm
          isLogin={isLogin}
          toggleLoginSignup={toggleLoginSignup}
          setError={handleError}
          onClose={handleCloseDialog} // Pass handleCloseDialog to AuthForm
        />
      )}
    </div>
  );
};

export default Navbar;
