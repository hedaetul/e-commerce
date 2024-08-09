import Google from '@/dist/images/google.png';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

interface AuthFormProps {
  isLogin: boolean;
  toggleLoginSignup: () => void;
  toggleModal: () => void;
  setError: (message: string) => void; // Add this prop for error handling
}

const AuthForm: React.FC<AuthFormProps> = ({
  isLogin,
  toggleLoginSignup,
  toggleModal,
  setError, // Use the passed function to set errors
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
      toggleModal(); // Close the modal after successful login/signup
    } catch (error: any) {
      // Capture and set a formatted error message
      const errorMessage = error.message || 'An error occurred. Please try again.';
      setError(errorMessage); // Set error to be shown in the modal
    }
  };

  return (
    <div>
      <h2 className='text-xl font-bold mb-4'>
        {isLogin ? 'Login' : 'Sign Up'}
      </h2>
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
            Don`t have an account?{' '}
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
  );
};

export default AuthForm;
