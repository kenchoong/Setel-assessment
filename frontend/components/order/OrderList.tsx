import React, { useState, useEffect } from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { getAllOrderByUserId } from "../../services/orderDataSource";
import OrderCell from "./OrderCell";

interface OrderListProps {}

const OrderList: React.FC<OrderListProps> = ({}) => {
  const [orders, setOrders] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllOrderByUserId("1234")
      .then((res) => {
        //console.log(res.data);
        setOrders(res.data);
      })
      .catch((error) => {
        //console.log(error.message);
        setError("Here have some error");
      });
  }, []);

  if (orders === null) {
    return <Text>Your order later will display here</Text>;
  }

  return (
    <Flex direction="column" width="50%">
      <Heading size="lg" mt={8} mb={8}>
        Orders
      </Heading>

      {orders &&
        orders.map((order) => {
          return (
            <OrderCell
              key={order.orderId}
              orderId={order.orderId}
              userId={order.userId}
              productName={order.productName}
              productId={order.productId}
              orderStatus={order.orderStatus}
              totalOrderAmount={order.totalOrderAmout}
              productDesc={order.productDesc}
              createdAt={order.createdAt}
            />
          );
        })}
    </Flex>
  );
};

export default OrderList;
