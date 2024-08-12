'use client';

import { useAuth } from '@/context/AuthContext';
import Google from '@/dist/images/google.png';
import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface AuthFormProps {
  isLogin: boolean;
  toggleLoginSignup: () => void;
  setError: (message: string) => void;
  onClose: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  isLogin,
  toggleLoginSignup,
  setError,
  onClose,
}) => {
  const { loginWithEmail, signupWithEmail, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await loginWithEmail(email, password);
      } else {
        await signupWithEmail(email, password);
      }
      onClose();
    } catch (error: any) {
      const errorMessage =
        error.message || 'An error occurred. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <Dialog.Root open={true} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Overlay className='fixed inset-0 bg-black/40 z-50' />
      <Dialog.Content className='fixed inset-0 flex items-center justify-center z-50'>
        <div className='bg-white p-8 rounded-lg shadow-lg max-w-sm w-full relative'>
          <Dialog.Title className='text-2xl font-semibold mb-4 text-center text-gray-800'>
            Welcome to Bajar
          </Dialog.Title>
          <p className='text-lg text-center text-gray-600 mb-6'>
            {isLogin ? 'Log in to your account' : 'Create a new account'}
          </p>
          <button
            type='button'
            className='absolute top-4 right-4 text-gray-700 hover:text-gray-900'
            onClick={onClose}
          >
            &times;
          </button>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label htmlFor='email' className='block text-gray-700 mb-2'>
                Email Address
              </label>
              <Input
                id='email'
                type='email'
                className='w-full'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='password' className='block text-gray-700 mb-2'>
                Password
              </label>
              <Input
                id='password'
                type='password'
                className='w-full'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              type='submit'
              className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow-md'
            >
              {isLogin ? 'Log In' : 'Sign Up'}
            </Button>
          </form>
          <Button
            className='w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg shadow-md flex items-center justify-center mt-4'
            onClick={loginWithGoogle}
          >
            <span className='bg-white rounded-full p-2 mr-2 flex items-center justify-center'>
              <Image src={Google} alt='Google Logo' width={16} height={16} />
            </span>
            Continue with Google
          </Button>
          <p className='text-sm text-center text-gray-500 mt-4'>
            {isLogin ? (
              <>
                Don&apos;t have an account?{' '}
                <button
                  type='button'
                  onClick={toggleLoginSignup}
                  className='text-blue-600 underline'
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type='button'
                  onClick={toggleLoginSignup}
                  className='text-blue-600 underline'
                >
                  Log In
                </button>
              </>
            )}
          </p>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AuthForm;
