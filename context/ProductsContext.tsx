"use client";

import { Product } from "@/lib/productType";
import React, { createContext, useContext, useEffect, useState } from "react";

type ProductsContextProps = {
  products: Product[];
  fetchProducts: () => Promise<void>;
  loading: boolean;
};

const ProductsContext = createContext<ProductsContextProps | undefined>(
  undefined,
);

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("usProductsContext must be used within ProductProvider");
  }
  return context;
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("api/product", { method: "GET" });
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.log("Failed to fetch products: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, fetchProducts, loading }}>
      {children}
    </ProductsContext.Provider>
  );
};
