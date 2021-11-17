import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ProductContextProvider } from "../components/hooks/ProductContext";
import { PaymentContextProvider } from "../components/hooks/PaymentContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProductContextProvider>
      <PaymentContextProvider>
        <Component {...pageProps} />;
      </PaymentContextProvider>
    </ProductContextProvider>
  );
}

export default MyApp;
