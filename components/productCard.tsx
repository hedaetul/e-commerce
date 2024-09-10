'use client'

import { Button } from "@/components/ui/button";
import { Product } from "@/lib/productType";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const route = useRouter();

  const handleProductClick = () => {
    route.push(`/product_details?id=${product.id}`);
  };

  return (
    <div
      onClick={handleProductClick}
      className="transform cursor-pointer rounded-lg border border-gray-200 bg-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:border-gray-500"
    >
      <div className="cover h-fit w-full rounded-t-lg">
        <Image
          src={product.photo}
          alt={product.name}
          objectFit="cover"
          className="h-auto w-full object-cover"
          width={400}
          height={400}
        />
      </div>
      <div className="p-4 text-center md:p-6">
        <h2 className="mb-2 overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold text-gray-800 md:text-xl">
          {product.name}
        </h2>
        <p className="text-md mb-2 font-semibold text-red-500 md:text-lg">
          ${product.price.toFixed(2)}
        </p>
        <p className="mb-4 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-600">
          {product.description}
        </p>

        <Button
          variant="outline"
          className="w-full rounded-md px-4 py-2 transition-colors duration-300 ease-in-out hover:border-gray-500 md:px-6"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
        >
          <FaShoppingCart className="mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
