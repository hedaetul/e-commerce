"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import products from "@/data/product";
import Image from "next/image";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";

interface Product {
  id: string;
  name: string;
  photo: string;
  price: number;
  description: string;
}
console.log(localStorage);

const HeroSection: React.FC = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-900">
          Discover Our Products
        </h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="transform rounded-lg border border-gray-200 bg-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:border-gray-500"
            >
              <div className="cover h-fit w-full rounded-t-lg">
                <Image
                  src={product.photo}
                  alt={product.name}
                  objectFit="cover"
                  className="object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h2 className="mb-2 overflow-hidden text-ellipsis whitespace-nowrap text-xl font-semibold text-gray-800">
                  {product.name}
                </h2>
                <p className="mb-2 text-lg font-semibold text-red-500">
                  ${product.price.toFixed(2)}
                </p>
                <p className="mb-4 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-600">
                  {product.description}
                </p>

                <Button
                  variant="outline"
                  className="w-full rounded-md px-6 py-2 transition-colors duration-300 ease-in-out hover:border-gray-500"
                  onClick={() => handleAddToCart(product)}
                >
                  <FaShoppingCart className="mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
