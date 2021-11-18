import React, { ReactNode } from "react";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import customTheme from "../../utils/theme";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ChakraProvider theme={customTheme}>
      <Flex
        direction="column"
        width="100%"
        height="100%"
        pb={3}
        m={[2, 2, 8, 8]}
        justify="center"
        align="center"
      >
        {children}
      </Flex>
    </ChakraProvider>
  );
};

export default Layout;
