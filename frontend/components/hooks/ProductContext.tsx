import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  Dispatch,
} from "react";

export interface ProductContextInterface {
  productId: string;
  productName: string;
  productDesc: string;
  productPrice: string;
}

const defaultValue = {};

interface ProductContextProps {
  children: React.ReactNode;
}

interface ProductResultInterface {
  interestedProduct: ProductContextInterface | null;
  setInterestedProduct: Dispatch<ProductContextInterface>;
}

const useProduct = () => {
  return useContext(ProductContext);
};

export const ProductContext = createContext<ProductResultInterface>(
  defaultValue as ProductResultInterface
);

const ProductContextProvider = (props: ProductContextProps) => {
  const storeValue = useProductData();

  return (
    <ProductContext.Provider value={storeValue}>
      {props.children}
    </ProductContext.Provider>
  );
};

const useProductData = () => {
  const [interestedProduct, setInterestedProduct] =
    useState<ProductContextInterface | null>(null);

  return {
    interestedProduct,
    setInterestedProduct,
  };
};

export { ProductContextProvider, useProduct };
