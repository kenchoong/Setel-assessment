import React, { useState } from "react";
import { Flex, Box, Text, Heading, Button } from "@chakra-ui/react";
import Layout from "../../components/layout/Layout";
import { useProduct } from "../../components/hooks/ProductContext";
import { createOrder } from "../../services/orderDataSource";
import { useRouter } from "next/router";
import { usePayment } from "../../components/hooks/PaymentContext";

interface createProps {}

const CreateOrderPage: React.FC<createProps> = ({}) => {
  const { interestedProduct } = useProduct();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { setOrderData } = usePayment();

  const handleClick = () => {
    if (interestedProduct) {
      // Here need RXjs

      // here go to payment page
      createOrder(interestedProduct)
        .then((res) => {
          //console.log(res.data);
          const data = res.data;
          if (data.ok) {
            setOrderData(data);
            router.push("/payment");
          } else {
            setErrorMsg("Having problem trigger payment");
          }
        })
        .catch((error) => {
          setErrorMsg("Having problem to create your order");
        });
    }
  };

  return (
    <Layout>
      <Text></Text>

      {interestedProduct && (
        <Flex direction="column" width="50%">
          <Heading size="xl">{interestedProduct.productName}</Heading>
          <Text mt={4} fontSize="lg">
            {interestedProduct.productDesc}
          </Text>
          <Text mt={4} fontSize="lg">
            {interestedProduct.productPrice}
          </Text>

          <Box width="100%">
            <Button float="right" colorScheme="green" onClick={handleClick}>
              Create an order
            </Button>
          </Box>

          {errorMsg && <Text>{errorMsg}</Text>}
        </Flex>
      )}
    </Layout>
  );
};

export default CreateOrderPage;
