import React from "react";
import {
  render,
  fireEvent,
  screen,
  cleanup,
  waitFor,
} from "../test-utils/test-utils";

import { server, rest, API_URL } from "../test-utils/server";
import SingleOrderPage from "../pages/order/[orderId]";

const mockedNavigate = jest.fn();
jest.mock("next/router", () => {
  return {
    ...jest.requireActual("next/router"),
    useRouter: () => ({
      push: mockedNavigate,
      query: {
        orderId: "88e9efea-e4ca-44c3-a44d-a21f6126eb3a",
      },
    }),
  };
});

afterEach(() => {
  cleanup;
});

describe("Single Order Page", () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    cleanup;
  });
  afterAll(() => server.close());

  it("render the singler order successfully", async () => {
    render(<SingleOrderPage />);
    const { queryByText } = screen;

    await waitFor(() => {
      expect(
        queryByText("OrderId: 88e9efea-e4ca-44c3-a44d-a21f6126eb3a")
      ).not.toBeNull();

      expect(queryByText("Declined")).not.toBeNull();

      expect(queryByText("Scenario 1")).not.toBeNull();
      expect(queryByText("ProductId: abc123")).not.toBeNull();
      expect(queryByText("RM 79")).not.toBeNull();
    });
  });

  it("Failed to fetch order", async () => {
    server.use(
      rest.get(API_URL + "/orders/:userId/:orderId", (req, res, ctx) => {
        const { userId, orderId } = req.params;
        return res(ctx.status(500));
      })
    );
    render(<SingleOrderPage />);
    const { queryByText } = screen;

    await waitFor(() => {
      expect(queryByText("Order not found..")).not.toBeNull();
    });
  });

  it("Update successfully", async () => {
    server.use(
      rest.get(API_URL + "/orders/:userId/:orderId", (req, res, ctx) => {
        const { userId, orderId } = req.params;
        return res(
          ctx.json({
            orderId: orderId,
            userId: userId,
            orderStatus: "Processing",
            productDesc: "This is number one",
            productId: "abc123",
            productName: "Scenario 1",
            productPrice: "RM 79",
          })
        );
      })
    );
    render(<SingleOrderPage />);
    const { queryByText, getByText, getByRole, findByText } = screen;

    await waitFor(async () => {
      const cancelButton = queryByText("Cancel Order");
      expect(cancelButton).not.toBeNull();
    });

    fireEvent.click(getByRole("button"));

    await waitFor(async () => {
      expect(await findByText("Cancelled")).not.toBeNull();
    });
  });
});
