"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Package } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./components/formSchema";
import ImageUpload from "./components/imageUpload";
import PricingAndInventory from "./components/pricingAndInventory";
import ProductDetails from "./components/productDetails";
import VendorWrapper from "../components/VendorWrapper";
import { useRouter } from "next/navigation";

const AddProduct = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      tags: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <VendorWrapper>
      <div className="mx-auto w-full max-w-3xl rounded-lg bg-white p-6 shadow">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center text-2xl font-bold">
          <Package className="mr-2" />
          Add Product
        </h2>
        <Button
          variant="outline"
          className="bg-red-100 text-red-600 hover:bg-red-200" onClick={()=> router.push('/vendor-account/products')}
        >
          Back to Product List
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <ProductDetails control={form.control} />
          <ImageUpload control={form.control} />
          <PricingAndInventory control={form.control} />
          <Button
            type="submit"
            className="bg-pink-500 text-white hover:bg-pink-600"
          >
            Save product
          </Button>
        </form>
      </Form>
    </div>
    </VendorWrapper>
  );
};

export default AddProduct;
