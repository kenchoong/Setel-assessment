import React from "react";
import { Text } from "@chakra-ui/react";
import OrderList from "../components/order/OrderList";
import Layout from "../components/layout/Layout";

interface orderProps {}

const OrderPage: React.FC<orderProps> = ({}) => {
  return (
    <Layout>
      <OrderList />
    </Layout>
  );
};

export default OrderPage;
