import React from "react";
import { Flex, Text, Button, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

export interface OrderCellProps {
  orderId: string;
  userId: string;
  productId: string;
  productName: string;
  totalOrderAmount: string;
  orderStatus: string;
  createdAt: string;
  productDesc: string;
}

const OrderCell: React.FC<OrderCellProps> = ({
  orderId,
  userId,
  productId,
  productName,
  totalOrderAmount,
  orderStatus,
}: OrderCellProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/order/${orderId}`);
  };

  return (
    <Flex
      direction={["column", "column", "row", "row"]}
      width="100%"
      justify="space-between"
      borderWidth="3px"
      borderColor="gray.500"
      borderRadius="lg"
      p={8}
      mt={4}
      mb={4}
    >
      <Flex direction="column">
        <Text>OrderId: {orderId}</Text>
        <Flex direction="column" witdh="50%">
          <Link passHref href={`/order/${encodeURIComponent(orderId)}`}>
            <a>
              <Heading size="lg">{productName}</Heading>
            </a>
          </Link>
          <Text mt={4} fontSize="lg">
            Total: {totalOrderAmount}
          </Text>
        </Flex>
      </Flex>

      <Flex direction="column">
        <Flex>
          <Text fontWeight="bold">Order status: </Text>
          <Text
            color={orderStatus === "cancelled" ? "red" : "green"}
            fontWeight="bold"
            ml={4}
          >
            {orderStatus}
          </Text>
        </Flex>

        <Button colorScheme="blue" mt={4} onClick={handleClick}>
          Order Details
        </Button>
      </Flex>
    </Flex>
  );
};

export default OrderCell;
