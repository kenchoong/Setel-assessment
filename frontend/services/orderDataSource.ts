import API from "./api";
import { ProductContextInterface } from "../components/hooks/ProductContext";

export const createOrder = async (product: ProductContextInterface) => {
  const path = "/orders";

  const body = {
    userId: "1234",
    productId: product.productId,
    productName: product.productName,
    productPrice: product.productPrice,
    productDesc: product.productDesc,
    orderStatus: "Order created",
  };

  return API.post(path, body);
};

export const checkOrderStatus = async (userId: string, orderId: string) => {
  const path = "/orders/status/" + orderId + "/" + userId;

  return API.get(path);
};

export const getAllOrderByUserId = async (userId: string) => {
  const path = "/orders/" + userId;

  return API.get(path);
};

export const getOrderByOrderId = async (userId: string, orderId: string) => {
  const path = "/orders/" + userId + "/" + orderId;
  return API.get(path);
};

export const updateOrderStatus = async (
  orderId: string,
  userId: string,
  status: string
) => {
  const path = "/orders/" + orderId;

  const body = {
    userId: userId,
    orderStatus: status,
  };

  return API.put(path, body);
};
