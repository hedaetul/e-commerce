import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { auth, firestore } from '@/lib/firebase';

interface AddressFormProps {
  title: string;
}

const AddressForm: React.FC<AddressFormProps> = ({ title }) => {
  const FormSchema = z.object({
    fullName: z.string().min(1, 'Full Name is required'),
    phoneNumber: z.string().min(1, 'Phone Number is required'),
    zipCode: z.string(),
    address1: z.string().min(1, 'Address 1 is required'),
    email: z.string().email('Invalid email address'),
    company: z.string().optional(),
    country: z.string().min(1, 'Country name is required'),
    address2: z.string().optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      zipCode: '',
      address1: '',
      email: '',
      company: '',
      country: '',
      address2: '',
    },
  });

  const { handleSubmit, control, formState } = form;
  const { cartItems, clearCart, subtotal, shippingCharge, tax, discount, totalAmount } = useCart();
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (!auth.currentUser) {
      // Handle user not authenticated case
      console.error('User is not authenticated');
      return;
    }

    const orderId = new Date().toISOString(); 
    const userId = auth.currentUser.uid;

    const orderData = {
      orderId,
      date: Timestamp.now(),
      subtotal,
      shippingCharge,
      tax,
      discount,
      totalAmount,
      billingAddress: data,
      shippingAddress: data, 
      paymentMethod: 'Credit Card', 
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    try {
      await setDoc(
        doc(firestore, 'users', userId, 'orders', orderId),
        orderData
      );

      localStorage.removeItem('cart');
      localStorage.removeItem('billingData');
      localStorage.removeItem('shippingData');
      clearCart();

      router.push('/confirmation');
    } catch (error) {
      console.error('Error saving order to Firestore:', error);
    }
  };

  return (
    <div className='bg-white p-6 rounded-lg'>
      <h1 className='text-2xl font-bold mb-6'>{title}</h1>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col gap-4'>
            <FormField
              control={control}
              name='fullName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      id='fullName'
                      type='text'
                      placeholder='Enter your Full name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{formState.errors.fullName?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name='phoneNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      id='phoneNumber'
                      type='text'
                      placeholder='Enter your Phone Number'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{formState.errors.phoneNumber?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name='zipCode'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input
                      id='zipCode'
                      type='text'
                      placeholder='Enter your zip code'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{formState.errors.zipCode?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name='address1'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address 1</FormLabel>
                  <FormControl>
                    <Input
                      id='address1'
                      type='text'
                      placeholder='Enter your Address-1'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{formState.errors.address1?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-col gap-4'>
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
                      placeholder='Enter your email address'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{formState.errors.email?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name='company'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input
                      id='company'
                      type='text'
                      placeholder='Enter your company name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{formState.errors.company?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name='country'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input
                      id='country'
                      type='text'
                      placeholder='Enter your country name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{formState.errors.country?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name='address2'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address 2</FormLabel>
                  <FormControl>
                    <Input
                      id='address2'
                      type='text'
                      placeholder='Enter your Address-2'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{formState.errors.address2?.message}</FormMessage>
                </FormItem>
              )}
            />
            <Button
              type='submit'
              className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow-md'
            >
              Confirm Order
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddressForm;
