'use client';

import { useAuth } from '@/context/AuthContext';
import Google from '@/dist/images/google.png';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'; // Adjust path as needed
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

  const FormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid Email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must have at least 6 characters'),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit, control, formState } = form;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      if (isLogin) {
        await loginWithEmail(data.email, data.password);
      } else {
        await signupWithEmail(data.email, data.password);
      }
      onClose(); // Close the dialog on successful login/signup
    } catch (error: any) {
      const errorMessage =
        error.message || 'An error occurred. Please try again.';
      setError(errorMessage);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      onClose(); // Close the dialog on successful Google login
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
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        id='email'
                        type='text'
                        placeholder='Your email'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{formState.errors.email?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        id='password'
                        type='password'
                        placeholder='Your password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {formState.errors.password?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow-md'
              >
                {isLogin ? 'Log In' : 'Sign Up'}
              </Button>
            </form>
          </Form>
          <Button
            className='w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg shadow-md flex items-center justify-center mt-4'
            onClick={handleGoogleLogin}
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
