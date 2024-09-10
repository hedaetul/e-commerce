"use client";

import Spinner from "@/components/custom/spinner"; // Assuming you have a spinner component
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/productType";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import products from "../api/product/products.json";
import AppWrapper from "../AppWrapper";

const ProductDetails: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { addToCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  useEffect(() => {
    if (productId) {
      const selectedProduct = products.find((p) => p.id === productId);
      setProduct(selectedProduct || null);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity: 1 });
      router.push("/carts");
    }
  };

  return (
    <AppWrapper>
      <section className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex h-96 items-center justify-center">
            <Spinner />
          </div>
        ) : product ? (
          <div className="flex flex-col md:flex-row">
            <div className="mb-6 flex-1 md:mb-0">
              <Image
                src={product.photo || "/images/default-product.jpg"}
                alt={product.name}
                width={600}
                height={600}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2 md:ml-6">
              <h1 className="text-2xl font-bold text-gray-800">
                {product.name}
              </h1>
              <h3 className="font-medium italic text-gray-700">
                Brand: <span className="text-gray-800">{product.brand}</span>
              </h3>
              <p className="mt-2 text-2xl font-bold text-red-500">
                ${product.price.toFixed(2)}
              </p>
              <p className="italic text-gray-800">
                {product.stock > 0
                  ? `In Stock (${product.stock})`
                  : "Out of Stock"}
              </p>
              <p className="text-md mt-4 text-gray-700">
                {product.description}
              </p>

              <Button
                className="mt-6 rounded-md px-4 py-2 transition-colors duration-300 ease-in-out hover:border-gray-500"
                onClick={handleAddToCart}
              >
                <FaShoppingCart className="mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        ) : (
          // Display if no product is found
          <div className="flex h-96 items-center justify-center">
            <p className="text-xl text-gray-700">Product not found</p>
          </div>
        )}
      </section>
    </AppWrapper>
  );
};

export default ProductDetails;
