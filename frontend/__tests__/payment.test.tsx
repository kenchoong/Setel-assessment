import React from "react";
import PaymentPage from "../pages/payment";
import {
  render,
  fireEvent,
  screen,
  cleanup,
  waitFor,
} from "../test-utils/test-utils";
import { server, rest, API_URL } from "../test-utils/server";

const mockedNavigate = jest.fn();
jest.mock("next/router", () => {
  return {
    ...jest.requireActual("next/router"),
    useRouter: () => ({
      push: mockedNavigate,
    }),
  };
});

describe("Payment Page", () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    cleanup;
  });
  afterAll(() => server.close());

  /*
  it("If the payment declined", async () => {
    render(<PaymentPage />);
    const { queryByText, getByRole } = screen;

    await waitFor(() => {
      expect(queryByText("Declined")).not.toBeNull();
      expect(queryByText("Back to home page")).not.toBeNull();
    });

    fireEvent.click(getByRole("button"));

    expect(mockedNavigate).toBeCalledWith("/");
  });*/

  /*
  it("If the payment Confirmed", async () => {
    server.use(
      rest.get(API_URL + "/orders/status/:orderId/:userId", (req, res, ctx) => {
        const { orderId, userId } = req.params;
        return res(
          ctx.json({
            ok: true,
            orderStatus: "Declined",
          })
        );
      })
    );

    render(<PaymentPage />);
    const { queryByText, getByRole } = screen;

    await waitFor(() => {
      expect(queryByText("Confirmed")).not.toBeNull();
      expect(queryByText("will delivered in")).not.toBeNull();
    });
  });

  */
});
