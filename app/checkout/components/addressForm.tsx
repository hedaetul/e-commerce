"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/context/CartContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AddressSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  phoneNumber: z.string().min(1, "Phone Number is required"),
  zipCode: z.string(),
  address1: z.string().min(1, "Address 1 is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  country: z.string().min(1, "Country name is required"),
  address2: z.string().optional(),
});

type AddressFormValues = z.infer<typeof AddressSchema>;

const AddressForm = ({ title }: { title: string }) => {
  const router = useRouter();
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      zipCode: "",
      address1: "",
      email: "",
      company: "",
      country: "",
      address2: "",
    },
  });
  const { handleSubmit, control, formState } = form;
  const { addFormData, setAddFormData } = useCart();

  console.log(addFormData);

  const onSubmit = (formData: AddressFormValues) => {
    setAddFormData(formData);
    router.push('/payment')
  };

  return (
    <div className="rounded-lg bg-white px-6">
      <h1 className="mb-6 text-2xl font-bold">{title}</h1>
      <Toaster />

      <div className="w-full">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            <div className="flex flex-col gap-4">
              <FormField
                control={control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your Full name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {formState.errors.fullName?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        id="phoneNumber"
                        type="text"
                        placeholder="Enter your Phone Number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {formState.errors.phoneNumber?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip Code</FormLabel>
                    <FormControl>
                      <Input
                        id="zipCode"
                        type="text"
                        placeholder="Enter your zip code"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {formState.errors.zipCode?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="address1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address 1</FormLabel>
                    <FormControl>
                      <Input
                        id="address1"
                        type="text"
                        placeholder="Enter your Address-1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {formState.errors.address1?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-4">
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
                        placeholder="Enter your email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{formState.errors.email?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input
                        id="company"
                        type="text"
                        placeholder="Enter your company name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {formState.errors.company?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input
                        id="country"
                        type="text"
                        placeholder="Enter your country name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {formState.errors.country?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="address2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address 2</FormLabel>
                    <FormControl>
                      <Input
                        id="address2"
                        type="text"
                        placeholder="Enter your Address-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {formState.errors.address2?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <div className="mt-6 flex w-full justify-between gap-6">
          <Button className="w-full" variant="outline">
            Back to cart
          </Button>
          <Button
            className="w-full"
            onClick={() => handleSubmit(onSubmit)()}
            type="submit"
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
