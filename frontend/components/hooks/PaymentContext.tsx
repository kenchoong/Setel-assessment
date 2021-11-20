import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  Dispatch,
} from "react";

const usePayment = () => {
  return useContext(PaymentContext);
};

interface CreatedInterface {
  id: string;
}

export interface PaymentContextInterface {
  created: CreatedInterface;
}

interface PaymentContextProps {
  children: React.ReactNode;
}

const defaultValue = {};

export interface PaymentResultInterface {
  orderData: PaymentContextInterface | null;
  setOrderData: Dispatch<PaymentContextInterface>;
}

export const PaymentContext = createContext<PaymentResultInterface>(
  defaultValue as PaymentResultInterface
);

const PaymentContextProvider = (props: PaymentContextProps) => {
  const storeValue = usePaymentData();

  return (
    <PaymentContext.Provider value={storeValue}>
      {props.children}
    </PaymentContext.Provider>
  );
};

const usePaymentData = () => {
  const [orderData, setOrderData] = useState<PaymentContextInterface | null>(
    null
  );

  return {
    orderData,
    setOrderData,
  };
};

export { PaymentContextProvider, usePayment };
