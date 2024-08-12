'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import products from '@/data/product';
import Image from 'next/image';
import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

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
    <section className='py-12'>
      <div className='container mx-auto px-4'>
        <h1 className='text-4xl font-bold text-center text-gray-900 mb-8'>
          Discover Our Products
        </h1>
        <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {products.map((product) => (
            <div
              key={product.id}
              className='bg-white border border-gray-200 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out'
            >
              <div className='w-full h-48 relative overflow-hidden rounded-t-lg'>
                <Image
                  src={product.photo}
                  alt={product.name}
                  layout='fill'
                  objectFit='cover'
                  className='object-center'
                />
              </div>
              <div className='p-6 text-center'>
                <h2 className='text-xl font-semibold text-gray-800 mb-2'>
                  {product.name}
                </h2>
                <p className='text-red-500 text-lg font-semibold mb-2'>
                  ${product.price.toFixed(2)}
                </p>
                <p className='text-gray-600 text-sm mb-4 whitespace-nowrap overflow-hidden text-ellipsis'>
                  {product.description}
                </p>
                <Button 
                  className='flex items-center justify-center py-2 px-6 rounded-lg shadow-md  transition-colors duration-300 ease-in-out'
                  onClick={() => handleAddToCart(product)}
                >
                  <FaShoppingCart className='mr-2' />
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
