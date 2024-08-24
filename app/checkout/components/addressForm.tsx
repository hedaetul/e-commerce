"use client";

import AuthForm from "@/components/layout/authForm";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AddressFormField from "./addressFormField"; 

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
  const { user } = useAuth();
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

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
  const { addFormData, setAddFormData, saveOrderData } = useCart();
  const [errorMessage, setErrorMessage] = useState("");

  const handleAuthClose = () => {
    setShowAuthForm(false);
    setErrorMessage("");
  };

  const onSubmit = async (formData: AddressFormValues) => {
    setAddFormData(formData);

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You need to be logged in to place an order.",
        variant: "destructive",
        duration: 2000,
      });
      setTimeout(() => {
        setShowAuthForm(true);
      }, 2000);
      return;
    }
    try {
      await saveOrderData();
      router.push("/payment");
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  return (
    <>
      <div className="rounded-lg bg-white px-6">
        <h1 className="mb-6 text-2xl font-bold">{title}</h1>
        <div className="w-full">
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              <div className="flex flex-col gap-4">
                <AddressFormField
                  control={control}
                  name="fullName"
                  label="Full Name"
                  placeholder="Enter your Full name"
                  errors={formState.errors}
                />
                <AddressFormField
                  control={control}
                  name="phoneNumber"
                  label="Phone Number"
                  placeholder="Enter your Phone Number"
                  errors={formState.errors}
                />
                <AddressFormField
                  control={control}
                  name="zipCode"
                  label="Zip Code"
                  placeholder="Enter your zip code"
                  errors={formState.errors}
                />
                <AddressFormField
                  control={control}
                  name="address1"
                  label="Address 1"
                  placeholder="Enter your Address-1"
                  errors={formState.errors}
                />
              </div>
              <div className="flex flex-col gap-4">
                <AddressFormField
                  control={control}
                  name="email"
                  label="Email"
                  placeholder="Enter your email address"
                  errors={formState.errors}
                />
                <AddressFormField
                  control={control}
                  name="company"
                  label="Company"
                  placeholder="Enter your company name"
                  errors={formState.errors}
                />
                <AddressFormField
                  control={control}
                  name="country"
                  label="Country"
                  placeholder="Enter your country name"
                  errors={formState.errors}
                />
                <AddressFormField
                  control={control}
                  name="address2"
                  label="Address 2"
                  placeholder="Enter your Address-2"
                  errors={formState.errors}
                />
              </div>
            </form>
          </Form>
          <div className="mt-6 flex w-full justify-between gap-6">
            <Button className="w-full" variant="outline">
              Back to cart
            </Button>
            <Button className="w-full" onClick={() => handleSubmit(onSubmit)()} type="submit">
              Place Order
            </Button>
          </div>
        </div>
      </div>
      {showAuthForm && (
        <AuthForm
          isLogin={isLogin}
          toggleLoginSignup={() => setIsLogin(!isLogin)}
          setError={setErrorMessage}
          onClose={handleAuthClose}
        />
      )}
    </>
  );
};

export default AddressForm;
