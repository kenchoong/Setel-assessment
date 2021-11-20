import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Flex, Box, Text, Heading, Button, Spinner } from "@chakra-ui/react";
import {
  getOrderByOrderId,
  updateOrderStatus,
} from "../../services/orderDataSource";
import Layout from "../../components/layout/Layout";

export interface OrderDetailsPageProps {}

export interface CellProps {
  orderId: string;
  userId: string;
  productId: string;
  productName: string;
  productPrice: string;
  orderStatus: string;
  createdAt: string;
  productDesc: string;
}

const OrderDetailsPage: React.FC<OrderDetailsPageProps> = ({}) => {
  const router = useRouter();
  const { orderId } = router.query;
  const [order, setOrder] = useState<CellProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const [orderStatus, setOrderStatus] = useState("created");

  const arr = [
    "Confirmed",
    "Declined",
    "cancelled",
    "confirmed",
    "declined",
    "Delivered",
    "delivered",
  ];

  const handleClick = () => {
    updateOrderStatus(orderId as string, "1234", "cancelled")
      .then((res) => {
        setIsUpdating(false);

        const data = res.data;

        if (data.ok) {
          setOrderStatus(data.updated.attributes.orderStatus);
        }
      })
      .catch((error) => {
        setIsUpdating(false);
        console.log(error);
      });
  };

  useEffect(() => {
    if (orderId) {
      getOrderByOrderId("1234", orderId as string)
        .then((res) => {
          setIsLoading(false);
          setOrder(res.data);
          setOrderStatus(res.data.orderStatus);
        })
        .catch((error) => {
          setIsLoading(false);
          setError("Having error when get order details");
        });
    }
  }, [orderId]);

  if (isLoading)
    return (
      <Layout>
        <Spinner />
      </Layout>
    );

  return (
    <Layout>
      <Box>
        <Heading>Details for a single order</Heading>
      </Box>

      {order ? (
        <Flex
          direction="column"
          width="50%"
          mt={8}
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="lg"
          p={8}
        >
          <Flex align="center" justify="space-between">
            <Text>OrderId: {order.orderId}</Text>
            <Text
              fontWeight="bold"
              fontSize="lg"
              color={order.orderStatus === "cancelled" ? "red" : "green"}
            >
              {orderStatus}
            </Text>
          </Flex>

          <Flex align="center" justify="space-between" mt={4}>
            <Flex direction="column">
              <Heading size="lg">{order.productName}</Heading>

              <Text mt={2}>ProductId: {order.productId}</Text>
            </Flex>

            {!arr.includes(orderStatus) && (
              <Button
                colorScheme={orderStatus === "cancelled" ? "red" : "green"}
                isLoading={isUpdating}
                onClick={() => {
                  setIsUpdating(true);
                  handleClick();
                }}
              >
                Cancel Order
              </Button>
            )}
          </Flex>

          <Flex direction="column" mt={4}>
            <Flex>
              <Text fontSize="lg">Grant total:</Text>
              <Text ml={4} fontSize="lg">
                {order.productPrice}
              </Text>
            </Flex>

            <Text mt={4}>Created at: {order.createdAt}</Text>
          </Flex>
        </Flex>
      ) : (
        <Text mt={8} fontWeight="bold">
          Order not found..
        </Text>
      )}
    </Layout>
  );
};

export default OrderDetailsPage;
