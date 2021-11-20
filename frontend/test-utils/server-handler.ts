import { rest } from "msw";
import getEnvVars from "../environment";

const env = getEnvVars();
const API_URL = "http://localhost";

const handlers = [
  // create order
  rest.post(API_URL + "/orders", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        ok: true,
        created: {
          id: "88e9efea-e4ca-44c3-a44d-a21f6126eb3a",
        },
        payment: "processing",
      })
    );
  }),

  // get order status
  rest.get(API_URL + "/orders/status/:orderId/:userId", (req, res, ctx) => {
    const { orderId, userId } = req.params;
    return res(
      ctx.json({
        ok: true,
        orderStatus: "Declined",
      })
    );
  }),

  // get all orders
  rest.get(API_URL + "/orders/1234", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          orderId: "50983488-3f2d-44c6-901c-33b66a53c1bf",
          userId: "12345",
          orderStatus: "Confirmed",
          productDesc: "This is number one",
          productId: "abc123",
          productName: "Scenario 1",
          productPrice: "RM 79",
        },
        {
          orderId: "88e9efea-e4ca-44c3-a44d-a21f6126eb3a",
          userId: "12345",
          orderStatus: "Declined",
          productDesc: "This is number two",
          productId: "abc123",
          productName: "Scenario 1",
          productPrice: "RM 79",
        },
      ])
    );
  }),

  // getOrderByOrderId
  rest.get(API_URL + "/orders/:userId/:orderId", (req, res, ctx) => {
    const { userId, orderId } = req.params;
    return res(
      ctx.json({
        orderId: orderId,
        userId: userId,
        orderStatus: "Declined",
        productDesc: "This is number one",
        productId: "abc123",
        productName: "Scenario 1",
        productPrice: "RM 79",
      })
    );
  }),

  // update order
  rest.put(API_URL + "/orders/:orderId", (req, res, ctx) => {
    return res(
      ctx.json({
        ok: true,
        updated: {
          orderId: "88e9efea-e4ca-44c3-a44d-a21f6126eb3a",
          attributes: {
            orderStatus: "Cancelled",
          },
        },
      })
    );
  }),
];

export { handlers, API_URL };
