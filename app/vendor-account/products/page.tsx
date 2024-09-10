"use client";

import Spinner from "@/components/custom/spinner";
import { useProducts } from "@/context/ProductsContext";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { FaBox } from "react-icons/fa";
import VendorWrapper from "../components/VendorWrapper";

const VendorProducts = () => {
  const { loading, products } = useProducts();

  return (
    <VendorWrapper>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto p-4">
          {/* Header */}
          <h1 className="mb-4 flex items-center gap-2 text-2xl font-bold">
            <FaBox className="text-rose-500" />
            Products
          </h1>

          {/* Product Table */}
          <div className="rounded-lg bg-white p-4 shadow-lg">
            <div className="grid grid-cols-4 gap-4 border-b border-gray-200 p-2 font-semibold">
              <span className="text-left">Product Id</span>
              <span className="text-left">Name</span>
              <span className="text-right">Price</span>
              <span></span> {/* Empty for arrow column */}
            </div>

            {/* Product Rows */}
            {products.map((product) => (
              <div
                key={product.id}
                className="grid grid-cols-4 items-center gap-4 border-b border-gray-200 p-2 hover:bg-gray-50"
              >
                {/* Product Name and Image */}
                <div className="text-gray-600">{product.id}</div>
                <div className="flex items-center space-x-3">
                  <Image
                    src={product.photo}
                    alt={product.name}
                    width={100}
                    height={100}
                    className="h-10 w-10 rounded object-cover"
                  />
                  <span className="text-left">{product.name}</span>
                </div>

                {/* Price */}
                <div className="text-right">${product.price.toFixed(2)}</div>

                {/* Arrow Icon */}
                <div className="flex justify-end">
                  <ArrowRightIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </VendorWrapper>
  );
};

export default VendorProducts;
