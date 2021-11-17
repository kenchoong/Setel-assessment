import React from "react";
import { Flex, Button, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/order");
  };

  return (
    <Flex align="center" width="50%" justify="space-between">
      <Heading>Settle</Heading>

      <Flex>
        <Button colorScheme="green" onClick={handleClick}>
          My Order
        </Button>
      </Flex>
    </Flex>
  );
};

export default NavBar;
