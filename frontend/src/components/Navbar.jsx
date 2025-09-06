import {
  Flex,
  Heading,
  HStack,
  Icon,
  Spacer,
  Button,
  Avatar,
  Menu,
  Portal,
  Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { AiFillProduct } from "react-icons/ai";
import { HiOutlineLogin } from "react-icons/hi";
import { HiOutlineLogout } from "react-icons/hi";
import { FiUserPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ColorModeButton } from "./ui/color-mode";
import { AuthContext } from "./AuthContext";
import { USER, COMPANY_NAME } from "@/constants";
import { FaRegUser } from "react-icons/fa";
import Sidebar from "./Sidebar";

export default function Navbar({ cartLength }) {
  const { isAuthenticated } = useContext(AuthContext);
  const user = localStorage.getItem(USER);
  const company = localStorage.getItem(COMPANY_NAME);

  return (
    <>
      <Flex as="nav" bg="blue.500" px={8} py={4} align="center" boxShadow="md">
        {/* Logo */}
        <Heading
          as={Link}
          to="/"
          color="white"
          fontSize="2xl"
          fontWeight="bold"
        >
          <Icon as={AiFillProduct} mr={3} color="yellow.300" />
          Product Orderring
        </Heading>

        <HStack color="white" gap={4} marginLeft={10}>
          {isAuthenticated ? (
            <>
              {company ? (
                <Link to="/company">{company}</Link>
              ) : (
                <Link to="/company">Company</Link>
              )}

              <Sidebar name="Categories" />

              <Link to="/orders">My Orders</Link>
            </>
          ) : (
            <Sidebar name="Categories" />
          )}
        </HStack>

        <Spacer />

        {/* Navigation Buttons */}
        <HStack spacing={4} color={"white"} gap={4}>
          {isAuthenticated ? (
            <>
              <Button
                as={Link}
                to="/cart"
                color={"white"}
                variant={"outline"}
                _hover={{ color: "black" }}
              >
                Cart:{" "}
                <Text
                  border="1px"
                  borderRadius={"full"}
                  px={1}
                  bg={"black"}
                  color={"white"}
                >
                  {cartLength}
                </Text>
              </Button>

              <Menu.Root>
                <Menu.Trigger>
                  <Avatar.Root colorPalette="teal" cursor="pointer">
                    <Avatar.Fallback name={user} />
                  </Avatar.Root>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content>
                      <Menu.Item
                        value="1"
                        as={Link}
                        to="/logout"
                        cursor="pointer"
                      >
                        <Icon as={HiOutlineLogout} size="md" /> Logout
                      </Menu.Item>
                      <Menu.Item value="2" cursor="pointer">
                        <Icon as={FaRegUser} size="md" />
                        Profile
                      </Menu.Item>
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            </>
          ) : (
            <>
              <Button
                as={Link}
                to="/login"
                variant="ghost"
                color="white"
                _hover={{ bg: "blue.600" }}
              >
                <Icon as={HiOutlineLogin} />
                Login
              </Button>

              <Button
                as={Link}
                to="/signup"
                variant="solid"
                bg="white"
                color="blue.500"
                _hover={{ bg: "gray.100" }}
              >
                <Icon as={FiUserPlus} />
                Signup
              </Button>
            </>
          )}

          <ColorModeButton />
        </HStack>
      </Flex>
    </>
  );
}
