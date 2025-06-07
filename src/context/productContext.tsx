"use client";
import React, { createContext } from "react";
import useLocalStorageState from "use-local-storage-state";

interface ProductsContextValue {
  setSelectedProducts: (products: any) => void;
  selectedProducts: any;
}

export const ProductsContext = createContext<ProductsContextValue>({
  setSelectedProducts: () => {},
  selectedProducts: [],
});

export function ProductsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedProducts, setSelectedProducts] = useLocalStorageState("cart", {
    defaultValue: [],
  });
  return (
    <ProductsContext.Provider value={{ selectedProducts, setSelectedProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}
