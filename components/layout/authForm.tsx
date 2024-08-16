"use client";

import { useAuth } from "@/context/AuthContext";
import Google from "@/dist/images/google.png";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"; // Adjust path as needed
import { Input } from "../ui/input";

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
    email: z.string().min(1, "Email is required").email("Invalid Email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must have at least 6 characters"),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
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
        error.message || "An error occurred. Please try again.";
      setError(errorMessage);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      onClose(); // Close the dialog on successful Google login
    } catch (error: any) {
      const errorMessage =
        error.message || "An error occurred. Please try again.";
      setError(errorMessage);
    }
  };

  return (
    <Dialog.Root open={true} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
      <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="relative w-full max-w-sm rounded-lg bg-white p-8 shadow-lg">
          <Dialog.Title className="mb-4 text-center text-2xl font-semibold text-gray-800">
            Welcome to Bajar
          </Dialog.Title>
          <p className="mb-6 text-center text-lg text-gray-600">
            {isLogin ? "Log in to your account" : "Create a new account"}
          </p>
          <button
            type="button"
            className="absolute right-4 top-4 text-gray-700 hover:text-gray-900"
            onClick={onClose}
          >
            &times;
          </button>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="text"
                        placeholder="Your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{formState.errors.email?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Your password"
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
                type="submit"
                className="w-full rounded-lg bg-blue-600 py-2 text-white shadow-md hover:bg-blue-700"
              >
                {isLogin ? "Log In" : "Sign Up"}
              </Button>
            </form>
          </Form>
          <Button
            className="mt-4 flex w-full items-center justify-center rounded-lg bg-red-600 py-2 text-white shadow-md hover:bg-red-700"
            onClick={handleGoogleLogin}
          >
            <span className="mr-2 flex items-center justify-center rounded-full bg-white p-2">
              <Image src={Google} alt="Google Logo" width={16} height={16} />
            </span>
            Continue with Google
          </Button>
          <p className="mt-4 text-center text-sm text-gray-500">
            {isLogin ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={toggleLoginSignup}
                  className="text-blue-600 underline"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={toggleLoginSignup}
                  className="text-blue-600 underline"
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
