import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import customTheme from "../utils/theme";

const AllTheProviders: FC = ({ children }) => {
  return <ChakraProvider theme={customTheme}>{children}</ChakraProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
