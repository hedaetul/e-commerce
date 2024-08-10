'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Google from '@/dist/images/google.png';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

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
      onClose(); // Close the dialog on successful login/signup
    } catch (error: any) {
      const errorMessage = error.message || 'An error occurred. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <Dialog.Root open={true} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Overlay className='fixed inset-0 bg-black/30 z-50 opacity-0 transition-opacity duration-300 ease-in-out data-[state=open]:opacity-100' />
      <Dialog.Content className='fixed inset-0 flex items-center justify-center z-50 transform translate-y-5 opacity-0 transition-transform duration-300 ease-in-out data-[state=open]:translate-y-0 data-[state=open]:opacity-100'>
        <div className='bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative'>
          <Dialog.Title className='text-xl font-bold mb-4'>
            {isLogin ? 'Login' : 'Sign Up'}
          </Dialog.Title>
          <button
            type='button'
            className='absolute top-2 right-2 text-gray-600 hover:text-gray-900'
            onClick={onClose}
          >
            &times;
          </button>
          <form onSubmit={handleSubmit}>
            <Input
              type='email'
              placeholder='Email'
              className='w-full mb-3'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type='password'
              placeholder='Password'
              className='w-full mb-3'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type='submit'
              className='w-full bg-blue-500 hover:bg-blue-700 text-white mb-3'
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </Button>
          </form>
          <Button
            className='w-full bg-red-500 hover:bg-red-700 text-white mb-3 flex items-center justify-center'
            onClick={loginWithGoogle}
          >
            <span className='bg-white rounded-full p-2 mr-2 flex items-center justify-center'>
              <Image src={Google} alt='Google Logo' width={16} height={16} />
            </span>
            Continue with Google
          </Button>
          <p className='text-sm text-center'>
            {isLogin ? (
              <>
                Don’t have an account?{' '}
                <button
                  type='button'
                  onClick={toggleLoginSignup}
                  className='text-blue-500 underline'
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
                  className='text-blue-500 underline'
                >
                  Login
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
