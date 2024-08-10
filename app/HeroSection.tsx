'use client';

import { useCart } from '@/context/CartContext'; // Ensure the path is correct
import products from '@/data/product';
import Image from 'next/image';
import { FaShoppingCart } from 'react-icons/fa';

interface Product {
  id: string; // Changed from number to string
  name: string;
  photo: string;
  price: number;
  description: string;
}

const HeroSection = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <section className='py-12'>
      <div className='container mx-auto px-4'>
        <h1 className='text-3xl font-bold text-center mb-8'>Our Products</h1>
        <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {products.map((product) => (
            <div
              key={product.id}
              className='bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300'
            >
              <div className='w-full h-48 relative'>
                <Image
                  src={product.photo}
                  alt={product.name}
                  layout='fill'
                  objectFit='cover'
                />
              </div>
              <div className='p-4 text-center'>
                <h2 className='text-lg font-semibold text-gray-800 mb-2'>
                  {product.name}
                </h2>
                <p className='text-gray-600 mb-2'>
                  ${product.price.toFixed(2)}
                </p>
                <p className='text-gray-500 text-sm mb-4'>
                  {product.description}
                </p>

                <button
                  className='flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300'
                  onClick={() => handleAddToCart(product)}
                >
                  <FaShoppingCart className='mr-2' /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
