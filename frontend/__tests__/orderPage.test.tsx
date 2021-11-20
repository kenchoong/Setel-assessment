import React from "react";
import {
  render,
  fireEvent,
  screen,
  cleanup,
  waitFor,
} from "../test-utils/test-utils";
import OrderPage from "../pages/order";
import { server, rest, API_URL } from "../test-utils/server";

describe("Order Page", () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => server.close());

  it("successfully get the orders list ", async () => {
    render(<OrderPage />);
    const { getByText, queryByText, queryAllByText } = screen;
    expect(getByText("Your order later will display here")).not.toBeNull();

    await waitFor(() => {
      expect(
        queryByText("OrderId: 50983488-3f2d-44c6-901c-33b66a53c1bf")
      ).not.toBeNull();
      expect(queryAllByText("Scenario 1")).toHaveLength(2);
      expect(queryAllByText("Total: RM 79")).toHaveLength(2);
      expect(queryByText("Confirmed")).not.toBeNull();
      expect(queryByText("Declined")).not.toBeNull();
    });
  });

  /*
  it("No data on screen", async () => {
    server.use(
      rest.post(API_URL + "/orders/1234", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const { getByText, queryByText } = screen;
    await waitFor(() => {
      expect(queryByText("Here have some error")).not.toBeNull();
    });
  });
  */
});
