import { Box, Heading, Text, Flex, Button } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import { useProduct, ProductContextInterface } from "../hooks/ProductContext";

interface ProductListProps {}

const products = [
  {
    productId: 1,
    productName: "Scenario 1",
    productDesc: "Create order with this product will Confirmed",
    productPrice: "RM89",
  },

  {
    productId: 2,
    productName: "Scenario 2",
    productDesc: "Creat order with this product will declined",
    productPrice: "RM79",
  },
];

const ProductList: React.FC<ProductListProps> = ({}) => {
  const router = useRouter();
  const { setInterestedProduct } = useProduct();

  const handleClick = (product: ProductContextInterface) => {
    setInterestedProduct(product);

    router.push("/order/create");
  };
  return (
    <Flex direction="row" width="50%" mt={8}>
      {products &&
        products.map((product) => {
          return (
            <Flex
              width={["100%", "100%", "50%", "30%"]}
              direction={["row", "row", "column", "column"]}
              key={product.productId}
              m={5}
              p={4}
              border="1px"
              borderWidth="3px"
              borderColor="black"
              borderRadius="lg"
            >
              <Heading size="sm">{product.productName}</Heading>
              <Text mt={2}>{product.productDesc}</Text>
              <Text mt={2} fontWeight="bold">
                {product.productPrice}
              </Text>

              <Button
                mt={2}
                colorScheme="red"
                onClick={() => handleClick(product)}
              >
                Create Order
              </Button>
            </Flex>
          );
        })}
    </Flex>
  );
};

export default ProductList;
