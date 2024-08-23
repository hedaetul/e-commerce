"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCart } from "@/context/CartContext";
import products from "@/data/product";
import Image from "next/image";
import React from "react";
import {
  FaDollarSign,
  FaLock,
  FaShippingFast,
  FaShoppingCart,
  FaUndoAlt,
} from "react-icons/fa";

interface Product {
  id: string;
  name: string;
  photo: string;
  price: number;
  description: string;
}

const HeroSection: React.FC = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Grid Container */}
        <div className="grid h-[500px] grid-cols-4 grid-rows-4 gap-4">
          {/* Carousel Item */}
          <div className="col-span-3 row-span-4">
            <Carousel>
              <CarouselContent>
                {/* First Carousel Item: Men's Collection */}
                <CarouselItem>
                  <div className="bg-image-1 h-full w-full rounded-sm">
                    <div className="p-32">
                      <h3 className="text-[30px] font-medium text-gray-800">
                        Lifestyle collection
                      </h3>
                      <h1 className="text-[60px] font-bold text-gray-800">
                        Men
                      </h1>
                      <h2 className="text-[30px] font-semibold uppercase text-gray-800">
                        Sale up to{" "}
                        <span className="text-base text-rose-700">30% off</span>
                      </h2>
                      <h4 className="text-lg text-gray-700">
                        Get free shipping on orders over $99.00
                      </h4>
                      <Button className="mt-8">Shop now</Button>
                    </div>
                  </div>
                </CarouselItem>

                {/* Second Carousel Item: Women's Collection */}
                <CarouselItem>
                  <div className="bg-image-1-0 h-full w-full rounded-sm">
                    <div className="p-32">
                      <h3 className="text-[30px] font-medium text-gray-800">
                        Lifestyle collection
                      </h3>
                      <h1 className="text-[60px] font-bold text-gray-800">
                        Women
                      </h1>
                      <h2 className="text-[30px] font-semibold uppercase text-gray-800">
                        Sale up to{" "}
                        <span className="text-base text-rose-700">40% off</span>
                      </h2>
                      <h4 className="text-lg text-gray-700">
                        Get free shipping on orders over $99.00
                      </h4>
                      <Button className="mt-8">Shop now</Button>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <div className="bg-image-2 col-start-4 row-span-2 rounded-sm">
            <div className="pl-7 pt-12">
              <h3 className="text-[13px] uppercase text-gray-700">
                New arrivals
              </h3>
              <h2 className="text-xl font-semibold uppercase text-gray-800">
                <span className="block">Summer</span> sale 20% off
              </h2>
              <Button variant="link" className="p-0">
                Shop Now
              </Button>
            </div>
          </div>

          <div className="bg-image-3 col-start-4 row-span-2 row-start-3 rounded-sm">
            <div className="pl-7 pt-12">
              <h3 className="text-[13px] uppercase text-gray-700">Gaming 4K</h3>
              <h2 className="text-xl font-semibold uppercase text-gray-800">
                <span className="block">Desktop &</span> Laptops
              </h2>
              <Button variant="link" className="p-0">
                Shop Now
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto my-12 rounded-sm bg-white px-6 py-3 shadow-sm">
          <div className="flex items-center justify-around">
            <div className="flex flex-col items-center">
              <FaShippingFast className="mb-2 text-3xl text-red-500" />
              <h5 className="text-lg font-semibold">Fast Delivery</h5>
              <p className="text-sm text-gray-600">Get your products quickly</p>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div className="flex flex-col items-center">
              <FaDollarSign className="mb-2 text-3xl text-red-500" />
              <h5 className="text-lg font-semibold">Money Guarantee</h5>
              <p className="text-sm text-gray-600">30 Days Money Back</p>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div className="flex flex-col items-center">
              <FaUndoAlt className="mb-2 text-3xl text-red-500" />
              <h5 className="text-lg font-semibold">65 Days for Return</h5>
              <p className="text-sm text-gray-600">Free Returns Policy</p>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div className="flex flex-col items-center">
              <FaLock className="mb-2 text-3xl text-red-500" />
              <h5 className="text-lg font-semibold">Payment Secure</h5>
              <p className="text-sm text-gray-600">Safe and Secure Payment</p>
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-gray-800">
          Deals of the day
        </h1>

        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
