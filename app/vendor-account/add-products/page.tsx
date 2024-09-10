"use client";

import products from "@/app/api/product/products.json";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Package } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import VendorWrapper from "../components/VendorWrapper";
import AddProductDetails from "./components/addProductDetails";
import { formSchema } from "./components/formSchema";
import ImageUpload from "./components/imageUpload";
import PricingAndInventory from "./components/pricingAndInventory";

const AddProduct = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  type ProductValues = z.infer<typeof formSchema>;
  const form = useForm<ProductValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: `product-${products.length + 1}`,
      name: "",
      category: "",
      description: "",
    },
  });
  console.log(products);
  console.log(products.length);

  const onSubmit = async (values: ProductValues) => {
    setLoading(true);
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Success: ", data.message);
        router.push("/vendor-account/products");
      } else {
        console.log("Failed to add product");
      }
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <VendorWrapper>
      <div className="mx-auto w-full max-w-3xl rounded-lg bg-white p-6 shadow">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="flex items-center text-2xl font-bold">
            <Package className="mr-2 text-rose-500" />
            Add Product
          </h2>
          <Button
            variant="outline"
            className="bg-red-100 text-red-600 hover:bg-red-200"
            onClick={() => router.push("/vendor-account/products")}
          >
            Back to Product List
          </Button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <AddProductDetails control={form.control} />
            <ImageUpload control={form.control} />
            <PricingAndInventory control={form.control} />
            <Button
              type="submit"
              className="bg-pink-500 text-white hover:bg-pink-600"
            >
              {loading ? "Saving Product" : "Save Product"}
            </Button>
          </form>
        </Form>
      </div>
    </VendorWrapper>
  );
};

export default AddProduct;
