"use client";

import ProductCard from "@/components/productCard";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/protuctType";
import React, { useEffect, useState } from "react";
import {
  FaDollarSign,
  FaLock,
  FaShippingFast,
  FaUndoAlt,
} from "react-icons/fa";

const HeroSection: React.FC = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart({ ...product, quantity: 1 });
  };
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/product");
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.log("Failed to fetch products: ", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid h-[500px] grid-cols-4 grid-rows-5 gap-4 lg:grid-cols-4 lg:grid-rows-4">
          <div className="col-span-4 row-span-3 overflow-hidden lg:col-span-3 lg:row-span-4">
            <Carousel className="relative">
              <CarouselContent>
                <CarouselItem>
                  <div className="bg-image-1 w-full rounded-sm p-8 lg:p-32">
                    <h3 className="text-[24px] font-medium text-gray-800 lg:text-[30px]">
                      Lifestyle collection
                    </h3>
                    <h1 className="text-[40px] font-bold text-gray-800 lg:text-[60px]">
                      Men
                    </h1>
                    <h2 className="text-[24px] font-semibold uppercase text-gray-800 lg:text-[30px]">
                      Sale up to{" "}
                      <span className="text-base text-rose-500">30% off</span>
                    </h2>
                    <h4 className="text-lg text-gray-700 lg:text-lg">
                      Get free shipping on orders over{" "}
                      <span className="text-green-500">$99.00</span>
                    </h4>
                    <Button className="mt-4 lg:mt-8">Shop now</Button>
                  </div>
                </CarouselItem>

                <CarouselItem>
                  <div className="bg-image-1-0 w-full rounded-sm p-8 lg:p-32">
                    <h3 className="text-[24px] font-medium text-gray-800 lg:text-[30px]">
                      Lifestyle collection
                    </h3>
                    <h1 className="text-[40px] font-bold text-gray-800 lg:text-[60px]">
                      Women
                    </h1>
                    <h2 className="text-[24px] font-semibold uppercase text-gray-800 lg:text-[30px]">
                      Sale up to{" "}
                      <span className="text-base text-rose-500">40% off</span>
                    </h2>
                    <h4 className="text-lg text-gray-700 lg:text-lg">
                      Get free shipping on orders over{" "}
                      <span className="block text-green-500">$99.00</span>
                    </h4>
                    <Button className="mt-4 lg:mt-8">Shop now</Button>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 transform" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 transform" />
            </Carousel>
          </div>

          <div className="bg-image-2 col-span-2 row-span-2 rounded-sm lg:col-start-4 lg:row-span-2">
            <div className="pl-4 pt-8 lg:pl-7 lg:pt-12">
              <h3 className="text-[13px] uppercase text-gray-700">
                New arrivals
              </h3>
              <h2 className="text-lg font-semibold uppercase text-gray-800 lg:text-lg">
                <span className="block">Summer</span> sale 20% off
              </h2>
              <Button variant="link" className="p-0">
                Shop Now
              </Button>
            </div>
          </div>

          <div className="bg-image-3 col-span-2 row-span-2 rounded-sm lg:col-start-4 lg:row-span-2">
            <div className="pl-4 pt-8 lg:pl-7 lg:pt-12">
              <h3 className="text-[13px] uppercase text-gray-700">Gaming 4K</h3>
              <h2 className="text-lg font-semibold uppercase text-gray-800 lg:text-lg">
                <span className="block">Desktop &</span> Laptops
              </h2>
              <Button variant="link" className="p-0">
                Shop Now
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto my-12 rounded-sm bg-white px-4 py-3 shadow-sm lg:px-6">
          <div className="flex flex-col items-center justify-around lg:flex-row">
            <div className="my-2 flex flex-col items-center lg:my-0">
              <FaShippingFast className="text-2lg lg:text-3lg mb-2 text-red-500" />
              <h5 className="text-lg font-semibold lg:text-lg">
                Fast Delivery
              </h5>
              <p className="text-sm text-gray-600">Get your products quickly</p>
            </div>
            <div className="hidden h-12 w-px bg-gray-300 lg:block"></div>
            <div className="my-2 flex flex-col items-center lg:my-0">
              <FaDollarSign className="text-2lg lg:text-3lg mb-2 text-red-500" />
              <h5 className="text-lg font-semibold lg:text-lg">
                Money Guarantee
              </h5>
              <p className="text-sm text-gray-600">30 Days Money Back</p>
            </div>
            <div className="hidden h-12 w-px bg-gray-300 lg:block"></div>
            <div className="my-2 flex flex-col items-center lg:my-0">
              <FaUndoAlt className="text-2lg lg:text-3lg mb-2 text-red-500" />
              <h5 className="text-lg font-semibold lg:text-lg">
                65 Days for Return
              </h5>
              <p className="text-sm text-gray-600">Free Returns Policy</p>
            </div>
            <div className="hidden h-12 w-px bg-gray-300 lg:block"></div>
            <div className="my-2 flex flex-col items-center lg:my-0">
              <FaLock className="text-2lg lg:text-3lg mb-2 text-red-500" />
              <h5 className="text-lg font-semibold lg:text-lg">
                Payment Secure
              </h5>
              <p className="text-sm text-gray-600">Safe and Secure Payment</p>
            </div>
          </div>
        </div>

        <h1 className="lg:text-2lg text-lg font-semibold text-gray-800">
          Deals of the day
        </h1>

        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
