import React from "react";
import {
  render,
  fireEvent,
  screen,
  cleanup,
  waitFor,
} from "../test-utils/test-utils";
import { server, rest, API_URL } from "../test-utils/server";
import Create from "../pages/order/create";
import {
  ProductContext,
  ProductContextInterface,
  ProductResultInterface,
} from "../components/hooks/ProductContext";

import {
  PaymentContext,
  PaymentResultInterface,
} from "../components/hooks/PaymentContext";

const mockedNavigate = jest.fn();
jest.mock("next/router", () => {
  return {
    ...jest.requireActual("next/router"),
    useRouter: () => ({
      push: mockedNavigate,
    }),
  };
});

const product: ProductContextInterface = {
  productId: 1,
  productName: "1234",
  productDesc: "2345",
  productPrice: "RM99",
};

const productResult: ProductResultInterface = {
  interestedProduct: product,
  setInterestedProduct: jest.fn(),
};

const mockSetOrder = jest.fn();
const paymentResult: PaymentResultInterface = {
  orderData: null,
  setOrderData: () => mockSetOrder,
};

describe("Create Order Page", () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    cleanup;
  });
  afterAll(() => server.close());

  it("It should render Product info", () => {
    render(
      <ProductContext.Provider value={productResult}>
        <Create />
      </ProductContext.Provider>
    );

    const productName = screen.getByText("1234");
    const productDesc = screen.getByText("2345");
    const productPrice = screen.getByText("RM99");
    const createButton = screen.getByText("Create an order");

    expect(productName).not.toBeNull();
    expect(productPrice).not.toBeNull();
    expect(createButton).not.toBeNull();
    expect(productDesc).not.toBeNull();
  });

  it("It should display error if return data is not ok", async () => {
    server.use(
      rest.post(API_URL + "/orders", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            ok: false,
          })
        );
      })
    );
    render(
      <ProductContext.Provider value={productResult}>
        <PaymentContext.Provider value={paymentResult}>
          <Create />
        </PaymentContext.Provider>
      </ProductContext.Provider>
    );
    const createButton = screen.getByRole("button");

    fireEvent.click(createButton);

    expect(
      await screen.findByText("Having problem trigger payment")
    ).not.toBeNull();
  });

  it("It should display error message if create order problem", async () => {
    server.use(
      rest.post(API_URL + "/orders", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(
      <ProductContext.Provider value={productResult}>
        <Create />
      </ProductContext.Provider>
    );
    const createButton = screen.getByRole("button");

    fireEvent.click(createButton);

    expect(
      await screen.findByText("Having problem to create your order")
    ).not.toBeNull();
  });

  it("It should go to payment if done create order", async () => {
    //const router = createMockRouter({});

    render(
      <ProductContext.Provider value={productResult}>
        <PaymentContext.Provider value={paymentResult}>
          <Create />
        </PaymentContext.Provider>
      </ProductContext.Provider>
    );

    const createButton = screen.getByRole("button");
    fireEvent.click(createButton);

    await waitFor(() => {
      //expect(mockSetOrder).toBeCalledTimes(1);
      expect(mockedNavigate).toBeCalledWith("/payment");
    });
  });
});
